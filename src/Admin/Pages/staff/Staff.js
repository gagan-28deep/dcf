import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment";
import "../../admin.css";
import { BsThreeDotsVertical, BsSliders } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdDelete, MdMode, MdToggleOn } from "react-icons/md";
import DateSelect from "../../../Components/Datepicker/Dateselect";
import { IoReload } from "react-icons/io5";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import Nodata from "../../../Components/nodata/Nodata";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import ModalCustom from "../../../Components/notify/Modal";

const Contant = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [active] = useState("Active");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [model, setModel] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    id: "",
  });
  const [query, setQuery] = useState("");
  let tablehead = [
    "S/N",
    "Name",
    "Employee ID",
    "Email",
    "Created On",
    "Status",
    "Action",
  ];
  //fetch data function
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`master/staff`)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPost = posts
    .filter(
      (el) =>
        el.user_name.toLowerCase().includes(query.toLowerCase()) ||
        el.email.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //handle Delete function
  const handledelete = async (value) => {
    let api = {
      path: "master/staffDeleteById",
      method: "POST",
      body: { id: value.id },
    };
    await apiAdminConfig
      .post(`${api.path}`, api.body)
      .then((response) => {
        if (response.data.status === 200) {
          snackbar({
            message: "Staff Removed Successfully.",
            severity: "success",
          });
          setModel({
            open: false,
          });
          fetchdata();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // Handle Status
  const handleStatus = async (value) => {
    let api = {
      path: `master/staff/${value._id}`,
      method: "PUT",
      body: { is_active: value.is_active === true ? false : true },
    };
    await apiAdminConfig
      .put(`${api.path}`, api.body)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          fetchdata();
        }
      })
      .catch((err) => console.log("error", err));
  };

  //handle Active/Inactive function
  const handleActiveInactive = async (e) => {
    if (e.target.value === "active") {
      let api = {
        path: "master/staffactive",
        method: "GET",
      };
      await apiAdminConfig
        .get(`${api.path}`)
        .then((response) => {
          if (response.data.status === 200) {
            let apidata = response.data.data;
            setPosts(apidata);
            setLoader(false);
          }
        })
        .catch((err) => console.log("error", err));
    } else {
      let api = {
        path: "master/staffinactive",
        method: "GET",
      };
      await apiAdminConfig
        .get(`${api.path}`)
        .then((response) => {
          if (response.data.status === 200) {
            let apidata = response.data.data;
            setPosts(apidata);
            setLoader(false);
          }
        })
        .catch((err) => console.log("error", err));
    }
  };

  // handle Filter function
  const handleFilter = async () => {
    await apiAdminConfig
      .post("master/stafffilterby", {
        startd: startTime,
        endd: endTime,
      })
      .then((response) => {
        if (response.data.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<ModalCustom value={model} handelDelete={handledelete} />}

          <Row className="mt-4">
            <Col md={4} sm={4} xs={12} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Staff ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={8} sm={8} xs={12}>
              <Stack direction="horizontal" gap={3} className="content-header">
                <Box>
                  <InputGroup className="mb-3">
                    <Form.Control
                      className="rounded"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Search"
                      onChange={(e) => {
                        setCurrentPage(1);
                        setQuery(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#76B757",
                      display: "flex",
                      width: "max-content",
                    }}
                    startIcon={<AddIcon style={{ color: "#fff" }} />}
                    onClick={() => {
                      navigate(`/master/staff/add-staff`);
                    }}
                  >
                    Add Staff
                  </Button>
                </Box>
              </Stack>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "white" }}>
                <Row style={{ minHeight: "50px" }}>
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop: 5, marginBottom: 5 }}
                    className={"adminContent-1"}
                  >
                    <Form.Select
                      aria-label={active}
                      onChange={handleActiveInactive}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Form.Select>
                  </Col>
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop: 5, marginBottom: 5 }}
                    className={"adminContent-1"}
                  >
                    <DateSelect
                      place="Start Date"
                      select={(value) => {
                        setStartTime(moment(value).format("YYYY-MM-DD"));
                      }}
                    />
                  </Col>
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop: 5, marginBottom: 5 }}
                    className={"adminContent-1"}
                  >
                    <DateSelect
                      place="End Date"
                      select={(value) => {
                        setEndTime(moment(value).format("YYYY-MM-DD"));
                      }}
                    />
                  </Col>
                  <Col
                    lg={3}
                    md={6}
                    sm={6}
                    xs={12}
                    style={{ marginTop: 5, marginBottom: 5 }}
                    className={"adminContent-1"}
                  >
                    <div>
                      <Button
                        variant="outlined"
                        style={{ color: "#76B757", borderColor: "#76B757" }}
                        startIcon={<BsSliders style={{ color: "#76B757" }} />}
                        onClick={handleFilter}
                      >
                        Filter
                      </Button>{" "}
                      <Button
                        variant="outlined"
                        style={{ color: "#F37A20", borderColor: "#F37A20" }}
                        startIcon={<IoReload style={{ color: "#F37A20" }} />}
                        onClick={fetchdata}
                      >
                        Reset
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="mt-4" style={{ minHeight: "300px" }}>
                {currentPost && currentPost.length !== 0 ? (
                  <Table size="md" responsive>
                    <thead
                      style={{
                        backgroundColor: "#F0F1F2",
                        textAlign: "left",
                      }}
                    >
                      <tr>
                        {tablehead.map((el, id) => {
                          return (
                            <th
                              style={
                                id === 0
                                  ? { width: "100%" }
                                  : el === "Action"
                                    ? { minWidth: "15vh", textAlign: "center" }
                                    : { minWidth: "25vh" }
                              }
                              key={id}
                            >
                              {el}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "left" }}>
                      {currentPost.map((el, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{el.user_name}</td>
                            <td>{el.employee_id}</td>
                            <td>{el.email}</td>
                            <td style={{ width: "20vh" }}>
                              {moment(el.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el.is_active === true
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      borderColor: "#76B757",
                                      width: "15vh",
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#EEC048",
                                      borderColor: "#EEC048",
                                      width: "15vh",
                                    }
                                }
                              >
                                {el.is_active === true ? "Active" : "Inactive"}
                              </Button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/staff/view-staff/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/staff/edit-staff/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdMode size={18} /> Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => handleStatus(el)}
                                        >
                                          <MdToggleOn size={18} /> Change Status
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setModel({
                                              open: true,
                                              type: "delete",
                                              title: "Remove Staff",
                                              message:
                                                "Are you sure? you won't be able to revert this!",
                                              id: el?._id,
                                            });
                                          }}
                                        >
                                          <MdDelete size={18} /> Delete
                                        </Dropdown.Item>
                                      </Stack>
                                    </Popover.Body>
                                  </Popover>
                                }>
                                  <Dropdown.Toggle
                                    variant="light"
                                    id="dropdown-basic"
                                  >
                                    <BsThreeDotsVertical />
                                  </Dropdown.Toggle>
                                </OverlayTrigger>
                              </Dropdown>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <Nodata />
                  </div>
                )}
              </Card.Body>
              <Card.Footer>
                <div className="justify-content-between flex-wrap d-flex align-items-center">
                  <Card.Text className="footer-text">
                    Showing {indexOfFirstPost + 1}-{indexOfLastPost} out of{" "}
                    {posts.length}
                  </Card.Text>
                  <TablePagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                  />
                </div>
              </Card.Footer>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
    };
  }
  render() {
    return (
      <div>
        {this.state.windowWidth >= 600 ? (
          <Sidebar>
            <Contant />
          </Sidebar>
        ) : (
          <div style={{ width: "95%", margin: "80px auto" }}>
            {" "}
            <Contant />
          </div>
        )}
      </div>
    );
  }
}

export default Staff;

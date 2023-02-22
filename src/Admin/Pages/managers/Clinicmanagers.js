import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import { apiAdminConfig } from "../../../utils/api";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdDelete, MdMode, MdToggleOn } from "react-icons/md";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import ModalCustom from "../../../Components/notify/Modal";
import Nodata from "../../../Components/nodata/Nodata";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

const Contant = () => {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [model, setModel] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    id: "",
  });

  let tablehead = [
    "S/N",
    "Name",
    "Email",
    "Clinic Name",
    "Status",
    "Created On",
    "Action",
  ];
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`clinicManager`)
      .then((res) => {
        if (res.data.status === 200) {
          let apidata = res.data.data;
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
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
        el.clinic_manager_name.toLowerCase().includes(query.toLowerCase()) ||
        el.email.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //handle Delete function
  const handledelete = async (value) => {
    await apiAdminConfig
      .delete(`clinicManager/${value.id}`)
      .then((response) => {
        if (response.data.status === 200) {
          setsnackdata((prevState) => ({
            ...prevState,
            open: true,
            message: response.data.message,
            status: "success",
          }));
          setModel({
            open: false,
          });
          fetchdata();
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  };

  // Handle Status
  const handleStatus = async (value) => {
    setLoader(true);
    let api = {
      path: `clinicManager/${value._id}`,
      body: { status: value.is_active === true ? false : true },
    };
    await apiAdminConfig
      .put(`${api.path}`, api.body)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          setsnackdata((prevState) => ({
            ...prevState,
            open: true,
            message: response.data.message,
            status: "success",
          }));
          fetchdata();
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (snackData.open && snackData.status == 'error') {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "error",
        });
      }, 3000);
    } else if (snackData.open && snackData.status == 'success') {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "success",
        });
      }, 1000);
    }
  }, [snackData.open])

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<CustomSnackbar value={snackData} />}
          {<ModalCustom value={model} handelDelete={handledelete} />}
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Clinic Manager ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={4}>
              <InputGroup className="mb-3">
                <InputGroup.Text className="search-bar">
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  className="search-input"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Search"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setQuery(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#76B757" }}
                onClick={() =>
                  navigate(`/master/receptionist/add`, { replace: true })
                }
              >
                Add Manager
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Body className="mt-2" style={{ minHeight: "300px" }}>
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
                            <td>{el?.clinic_manager_name}</td>
                            <td>{el?.email}</td>
                            <td>{el?.clinicId?.clinicName}</td>
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
                            <td>{moment(el.createdAt).format("DD/MM/YYYY")}</td>
                            <td style={{ textAlign: "center" }}>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/receptionist/view/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/receptionist/edit/${el._id}`
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
                                            setsnackdata({ open: false });
                                            setModel({
                                              open: true,
                                              type: "delete",
                                              title: "Remove Clinic Manager",
                                              message:
                                                "Sure you want to delete this clinic manager?",
                                              id: el._id,
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

class ClinicManagers extends Component {
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

export default ClinicManagers;

import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { apiAdminConfig } from "../../../utils/api";
import { IoReload } from "react-icons/io5";
import Nodata from "../../../Components/nodata/Nodata";
import Dropdown from "react-bootstrap/Dropdown";
import {
  MdRemoveRedEye,
  MdDownloadDone,
  MdOutlineCancel,
} from "react-icons/md";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useNavigate } from "react-router-dom";
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
  let tablehead = [
    "S/N",
    "Name",
    "Email",
    "Type",
    "Contact Id",
    "Created On",
    "Status",
    "Action",
  ];

  // ============== Get Data =================
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`ContactUsall`)
      .then((response) => {
        if (response.data.status === 200) {
          let apidata = response.data.data;
          console.log(apidata[0]);
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  // ================ Get Current Posts ===============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPost = posts
    .filter(
      (el) =>
        el?.name?.toLowerCase().includes(query.toLowerCase()) ||
        el?.from?.toLowerCase().includes(query.toLowerCase()) ||
        el?.subject?.toLowerCase().includes(query.toLowerCase()) ||
        el?.contact_id?.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  // ================ Change Page ===================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  // ============== Handle Filter ===================
  const handleFilter = async (event) => {
    console.log("value", event.target.value);
    await apiAdminConfig
      .post("getContactByType", { type: event.target.value })
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
        }
      })
      .catch((error) => {
        console.log("error---->", error);
      });
  };

  // ============= Handle Status ==================
  const handleStatus = async (value, status) => {
    console.log(value, status);
    await apiAdminConfig
      .post(`updateContactById`, {
        id: value,
        status: status,
      })
      .then((response) => {
        console.log(response);
        fetchdata();
        setsnackdata({
          open: true,
          message: "Data Updated Successfully.",
          status: "success",
        });
        setTimeout(() => {
          setsnackdata({
            open: false,
          });
        }, 2000);
      })
      .catch((err) => console.log("err", err));
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
          <Row className="mt-4">
            <Col md={8} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Contact Us list ({posts.length})
              </h3>
            </Col>
            <Col md={4}>
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
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "white" }}>
                <Row style={{ minHeight: "50px" }}>
                  <Col className={"adminContent-1"}>
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleFilter}
                      name="state"
                    >
                      <option value="0">Filter By Type</option>
                      <option value="ClinicManager">Clinic Manager</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Patient">Patient</option>
                    </Form.Select>
                  </Col>
                  <Col className={"adminContent-1"}>
                    <div>
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
                          return <th key={id}>{el}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "left" }}>
                      {currentPost.map((el, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{el.name ? el.name : ""}</td>
                            <td>{el?.from}</td>
                            <td>{el?.type?.toUpperCase()}</td>
                            <td>{el?.contact_id}</td>
                            <td>{moment(el.createdAt).format("DD/MM/YYYY")}</td>
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el.status === "Resolved"
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      borderColor: "#76B757",
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#EEC048",
                                      borderColor: "#EEC048",
                                    }
                                }
                              >
                                {el.status === "Resolved"
                                  ? "Resolved"
                                  : el.status}
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
                                              `/master/contactlist/view/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() =>
                                            handleStatus(el._id, "Resolved")
                                          }
                                        >
                                          <MdDownloadDone size={18} /> Resolved
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            handleStatus(el._id, "Cancelled");
                                          }}
                                        >
                                          <MdOutlineCancel size={18} /> Cancel
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
              </Card.Body>{" "}
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

class AdminContact extends Component {
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

export default AdminContact;

import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Box } from "@mui/material";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { apiAdminConfig } from "../../../utils/api";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Nodata from "../../../Components/nodata/Nodata";
import {
  MdRemoveRedEye,
  MdDelete,
  MdMode,
  MdToggleOn,
  MdOutlineFileCopy,
} from "react-icons/md";
import CustomSnackbar from "../../../Components/notify/Snackbar";

const Contant = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    "Patient Name",
    "Email",
    "Contact No.",
    "Status",
    "Created At",
    "Action",
  ];
  const fetchdata = async () => {
    setLoading(true);
    await apiAdminConfig
      .get("patient")
      .then((response) => {
        if (response.data.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts
    .filter(
      (el) =>
        el.patient_name.toLowerCase().includes(query.toLowerCase()) ||
        el.email.toLowerCase().includes(query.toLowerCase()) ||
        el.contact_number.toString().includes(query.toString())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setsnackdata({ open: false });
    setCurrentPage(pagenumber);
  };

  //Handle status
  const handleStatus = async (value) => {
    let body = {
      is_active: value.is_active === true ? false : true,
    };
    await apiAdminConfig
      .put(`patient/${value._id}`, body)
      .then((response) => {
        if (response.status === 200) {
          fetchdata();
          setsnackdata({
            open: true,
            message: response.data.message,
            status: "success",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  //Handle Delete
  const handledelete = async (value) => {
    console.log("value", value);
    let data = {
      mobilenumber: value.contact_number,
      patientid: value.patient_id,
      description: "",
    };
    await apiAdminConfig
      .put(`patient/deleteAccount/${value._id}`, data)
      .then((response) => {
        if (response.status === 200) {
          fetchdata();
          setsnackdata({
            open: true,
            message: "Account Deactivated Successfully",
            status: "success",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomSnackbar value={snackData} />{" "}
          <Row className="mt-4">
            <Col md={4} sm={4} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Patients ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={8} sm={8}>
              <Stack direction="horizontal" gap={3} className="content-header">
                <Box>
                  <InputGroup className="mb-3">
                    <Form.Control
                      className="rounded me-auto"
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
                      navigate(`/master/patients/add`, { replace: true });
                    }}
                  >
                    Add Patient
                  </Button>
                </Box>
              </Stack>
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
                            <td>{el.patient_name}</td>
                            <td>{el.email}</td>
                            <td>{el.contact_number}</td>
                            <td>
                              <Button
                                disabled
                                size="small"
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
                                              `/master/patients/view/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          style={{
                                            display: `${el.is_active === true ? "block" : "none"
                                              }`,
                                          }}
                                          onClick={() => {
                                            navigate(
                                              `/master/patients/bookappointment/${el._id}`,
                                              { state: { data: el } }
                                            );
                                          }}
                                        >
                                          <MdOutlineFileCopy size={18} /> Book
                                          Appointment
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/patients/edit/${el._id}`
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
                                            handledelete(el);
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

class Patients extends Component {
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
            <Contant />
          </div>
        )}
      </div>
    );
  }
}

export default Patients;

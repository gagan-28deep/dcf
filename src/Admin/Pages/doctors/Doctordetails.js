import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Image from "react-bootstrap/Image";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { apiAdminConfig } from "../../../utils/api";
import { Stack } from "react-bootstrap";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Nodata from "../../../Components/nodata/Nodata";
import Table from "react-bootstrap/Table";
// import TablePagination from "../../../Components/Pagination/Pagination";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [user, setUser] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [doc, setDoc] = useState({});
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  let tablehead = [
    "S/N",
    "Appointement Id",
    "Patiend Id",
    "Department",
    "Date",
    "Time",
    "Type",
    "Status",
    "Payment Stauts",
    "Cancelled By",
  ];

  // ============= Get Doctor Data ==============
  const fetchdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`doctor/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setUser((prevState) => ({
            ...prevState,
            ...response.data.data[0],
          }));
        }
      })
      .catch((error) => {
        console.log("error=====>", error);
      });
    setLoader(false);
  };

  // ================= Get Appointments =============
  const fetchAppointments = async (value) => {
    const api = {
      path: `appointment/getDoctorAppointement`,
    };
    await apiAdminConfig
      .post(`${api.path}`, { id: value })
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // ================= Get Cancel Appointments =============
  const fetchCancelAppointments = async (value) => {
    const api = {
      path: `appointment/getCancelledAppointmentCount`,
    };
    await apiAdminConfig
      .post(`${api.path}`, { id: value })
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data", response.data);
          setDoc((prevState) => ({
            ...prevState,
            ...response.data,
          }));
        }
      })
      .catch((error) => console.log("error", error));
  };

  // ============== Promote Doctor ================
  const markpromote = async () => {
    setLoader(true);
    await apiAdminConfig
      .post(`doctorpromote`, {
        id: user._id,
        promoted: user.promoted === true ? false : true,
      })
      .then((resp) => {
        if (resp.status === 200) {
          fetchdata(id);
          setLoader(false);
          setsnackdata({
            open: true,
            message: resp.data.message,
            status: "success",
          });
          setTimeout(() => {
            setsnackdata({ open: false });
          }, 2000);
        }
      })
      .catch((err) => console.log("err", err));
  };

  // ============== Reject Doctor ================
  const handleapprove = async () => {
    setLoader(true);
    await apiAdminConfig
      .post(`getDoctorApproval`, {
        id: user._id,
        is_approved: user.is_approved === true ? false : true,
      })
      .then((resp) => {
        fetchdata(id);
        setLoader(false);
        if (resp.status === 200) {
          snackbar({
            message: resp.data.message,
            severity: "success",
          });
        }
        if (resp.status === 400) {
          snackbar({
            message: resp.data.message,
            severity: "error",
          });
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // =================== Get current Posts ===============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // ============== Change Page ===================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  useEffect(() => {
    fetchdata(id);
    fetchAppointments(id);
    fetchCancelAppointments(id);
  }, []);

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
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Doctors Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/doctors`);
                }}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
                <Row>
                  <Col sm={12} md={12}>
                    <div className="staffdetails-card">
                      <Row>
                        <Col md={4}>
                          <Card
                            border="none"
                            style={{ border: "none", marginBottom: 5 }}
                          >
                            <Image
                              width="150"
                              height="150"
                              roundedCircle
                              src={
                                user.profile_picture
                                  ? user.profile_picture
                                  : `https://test.doctorsplaza.in/assets/doctors.png`
                              }
                              alt="staffimage.png"
                            />
                          </Card>
                          <Card border="light" style={{ textAlign: "left" }}>
                            <Card.Body>
                              <Stack gap={2}>
                                <Card.Title style={{ fontSize: "30px" }}>
                                  {user.doctorName}
                                </Card.Title>
                                <Stack direction="horizontal" gap={1}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Doctor's Id :
                                  </Card.Title>
                                  <Card.Text>{user?.doctor_id}</Card.Text>
                                </Stack>
                              </Stack>
                              <Button
                                size="sm"
                                variant="success"
                                style={
                                  user?.promoted === true
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      border: "1px solid #76B757",
                                      marginTop: 8,
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#EEC048",
                                      border: "1px solid #EEC048",
                                      marginTop: 8,
                                    }
                                }
                                onClick={markpromote}
                              >
                                {user?.promoted === true
                                  ? "Promoted"
                                  : "Mark Promoted"}
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="success"
                                onClick={handleapprove}
                                style={
                                  user?.is_approved === false
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      border: "1px solid #76B757",
                                      marginTop: 8,
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#C02231",
                                      border: "1px solid #C02231",
                                      marginTop: 8,
                                    }
                                }
                              >
                                {user?.is_approved === false
                                  ? "Mark Approve"
                                  : "Reject"}
                              </Button>{" "}
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={8}>
                          <Stack gap={2}>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Email :
                              </Card.Title>
                              <Card.Text>{user?.email}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                License No. :
                              </Card.Title>
                              <Card.Text>{user?.licenseNo}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Specilization :
                              </Card.Title>
                              <Card.Text>{user?.specialization}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Qualifications :
                              </Card.Title>
                              <Card.Text>{user?.qualification}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Contact No. :
                              </Card.Title>
                              <Card.Text>{user?.contactNumber}</Card.Text>
                            </Stack>{" "}
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Average Rating :
                              </Card.Title>
                              <Card.Text>{ }</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Cancelled Appointments :
                              </Card.Title>
                              <Card.Text>{doc.data}</Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Created on :
                              </Card.Title>
                              <Card.Text>
                                {moment(user.createdAt).format(
                                  "MMM DD,YYYY, hh:mm A"
                                )}
                              </Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Updated on :
                              </Card.Title>
                              <Card.Text>
                                {moment(user.updatedAt).format(
                                  "MMM DD,YYYY, hh:mm A"
                                )}
                              </Card.Text>
                            </Stack>
                            <Stack direction="horizontal" gap={2}>
                              <Card.Title
                                style={{
                                  fontSize: "18px",
                                  marginBottom: "0px",
                                }}
                              >
                                Status :
                              </Card.Title>
                              <Card.Text>
                                {" "}
                                <Button
                                  disabled
                                  size="sm"
                                  variant="success"
                                  style={
                                    user?.is_active === true
                                      ? {
                                        backgroundColor: "#E4F1DD",
                                        color: "#76B757",
                                        borderColor: "#76B757",
                                        marginTop: 8,
                                      }
                                      : {
                                        backgroundColor: "#FDF8EA",
                                        color: "#EEC048",
                                        borderColor: "#EEC048",
                                        marginTop: 8,
                                      }
                                  }
                                >
                                  {user?.is_active === true
                                    ? "Active"
                                    : "Inactive"}
                                </Button>
                              </Card.Text>
                            </Stack>
                          </Stack>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
          <div className="adminContant">
            <Card style={{ marginTop: "1%" }}>
              <Card.Body style={{ minHeight: "300px" }}>
                <Tabs
                  defaultActiveKey="1"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="1" title="Appointments">
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
                                        ? {
                                          minWidth: "15vh",
                                          textAlign: "center",
                                        }
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
                                <td>{el?._id}</td>
                                <td>{el?.user_id?.patient_id}</td>
                                <td>{el?.departmentname}</td>
                                <td>{moment(el?.date).format("DD/MM/YYYY")}</td>
                                <td>{el?.room_time_slot_id?.start_time}</td>
                                <td>{el?.appointment_type}</td>
                                <td>
                                  <Button
                                    disabled
                                    size="small"
                                    variant="success"
                                    style={
                                      el.status === "done"
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
                                    {el.status === "done" ? "DONE" : el.status}
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    disabled
                                    size="small"
                                    variant="success"
                                    style={
                                      el.payment_status === true
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
                                    {el.payment_status === true
                                      ? "Paid"
                                      : "Pending"}
                                  </Button>
                                </td>
                                <td>{el?.cancelledBy?.toUpperCase()}</td>
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
                  </Tab>
                  <Tab eventKey="2" title="Dashboard">
                    <Card border="light" style={{ textAlign: "left" }}>
                      <Card.Title>Cancelled Appointment Details</Card.Title>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={4}>
                                    <h2>{doc.admin}</h2>
                                    <h6>By Admin</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{doc.patient}</h2>
                                    <h6>By Patient</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{doc.data}</h2>
                                    <h6>Total</h6>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="3" title="Rating"></Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class Doctordetails extends Component {
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

export default Doctordetails;

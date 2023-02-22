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
import Table from "react-bootstrap/Table";
import TablePagination from "../../../Components/Pagination/Pagination";
import Nodata from "../../../Components/nodata/Nodata";
const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [userdata, setuserData] = useState({});
  let tablehead = [
    "S/N",
    "Patient Name",
    "Doctor Name",
    "Specialization",
    "Date",
    "Time",
    "Status",
    "Payment Stauts",
  ];

  // ================= Get data ================
  const fetchdata = async (value) => {
    setLoader(true);
    const api = {
      path: `patient/${value}`,
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data.data", response.data.data);
          setuserData((prevState) => ({
            ...prevState,
            ...response.data.data,
          }));
        }
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };

  // ================= Get Appointments =============
  const fetchAppointments = async (value) => {
    const api = {
      path: `appointment/AppointmentsOfPatient/${value}`,
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data.data", response.data.data[0]);
          let apidata = response.data.data;
          setPosts(apidata);
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchdata(id);
    fetchAppointments(id);
  }, []);

  // =================== Get current Posts ===============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  // ============== Change Page ===================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Patient Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/patients")}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "200px" }}>
                <Row>
                  <Col sm={12} md={6}>
                    <div className="staffdetails-card">
                      <Row>
                        <Col md={4}>
                          <Card border="light">
                            <Image
                              width="150"
                              height="150"
                              roundedCircle
                              src={
                                userdata.profile_picture
                                  ? userdata.profile_picture
                                  : `https://test.doctorsplaza.in/assets/doctors.png`
                              }
                              alt="staffimage.png"
                            />
                          </Card>
                        </Col>
                        <Col md={8}>
                          <Card border="light" style={{ textAlign: "left" }}>
                            <Card.Body>
                              <Card.Title style={{ height: "25px" }}>
                                {userdata.patient_name}
                              </Card.Title>
                              <Card.Text>
                                Patient ID: {""} {userdata._id}
                              </Card.Text>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  userdata.is_active === true
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
                                {userdata.is_active === true
                                  ? "Active"
                                  : "Inactive"}
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col sm={12} md={6}>
                    <div className="staffdetails-card">
                      <Card border="light">
                        <Card.Body style={{ textAlign: "left" }}>
                          <Row>
                            <Col md={3}>Email</Col>
                            <Col md={9}>{userdata.email}</Col>
                            <Col md={3}>Contact No.</Col>
                            <Col md={9}>{userdata.contact_number}</Col>
                            <Col md={3}>Created on</Col>
                            <Col md={9}>
                              {moment(userdata.createdAt).format(
                                "MMM DD,YYYY, HH:mm:ss A"
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
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
                            <td>{el?.patientname}</td>
                            <td>{el?.doctorname}</td>
                            <td>{el?.departmentname}</td>
                            <td>{moment(el?.date).format("DD/MM/YYYY")}</td>
                            <td>
                              {el?.room_time_slot_id?.timeSlotData?.start_time}
                            </td>
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

class PatientDetails extends Component {
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

export default PatientDetails;

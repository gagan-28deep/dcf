import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Form from "react-bootstrap/Form";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { apiAdminConfig } from "../../../utils/api";
import { Stack } from "react-bootstrap";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
  const snackbar = useSnackbar();
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});


  const fetchdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`appointment/getAppointmentById/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setPost((prevState) => ({
            ...prevState,
            ...response.data.data,
          }));
        }
      })
      .catch((error) => {
        console.log("error=====>", error);
      });
    setLoader(false);
  };

  useEffect(() => {
    fetchdata(id);
  }, []);

  const handleUpdate = async (data) => {
    let body = {
      doctor_id: post?.doctor_id?._id,
      appointment_id: post?._id,
    }
    if (data.status != null) {
      body.status = data.status
    } if (data.payment_status != null) {
      body.payment_status = data.payment_status === true ? false : true;
    }
    await apiAdminConfig.post(`changestatusbydoctor`, body).then((response) => {
      if (response.status === 200) {
        snackbar({
          message: "Appointment Status Updated Successfully",
          severity: "success",
        });
        fetchdata(id)
      }
    }).catch((error) => {
      snackbar({
        message: "Something went wrong",
        severity: "error",
      });
    })
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Appointment Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/appointments`);
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
                        <Col md={6}>
                          <Card
                            border="none"
                            style={{
                              border: "none",
                              marginBottom: 5,
                              textAlign: "left",
                            }}
                          >
                            <Card.Title style={{ color: "#76B757" }}>
                              Appointment Information
                            </Card.Title>
                            <Card.Body>
                              <Stack gap={2}>
                                <Card.Title style={{ fontSize: "30px" }}>
                                  {post?.clinic_manager_name}
                                </Card.Title>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Appointment ID :
                                  </Card.Title>
                                  <Card.Text>{post?._id}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Appointment Type :
                                  </Card.Title>
                                  <Card.Text>
                                    {post?.appointment_type}
                                  </Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Consultation Fees :
                                  </Card.Title>
                                  <Card.Text>
                                    {post?.doctor_id?.consultationfee}/-
                                  </Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Discounted Price :
                                  </Card.Title>
                                  <Card.Text>
                                    {post?.doctor_id?.consultationfee -
                                      post?.consultation_fee}
                                    /-
                                  </Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Total Amount :
                                  </Card.Title>
                                  <Card.Text>
                                    {post?.consultation_fee}/-
                                  </Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Mode Of Payment :
                                  </Card.Title>
                                  <Card.Text>{post?.mode_of_payment}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Created At :
                                  </Card.Title>
                                  <Card.Text>
                                    {moment(post?.createdAt).format(
                                      "MMM DD,YYYY, HH:mm:ss A"
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
                                    Appointment Status:
                                  </Card.Title>
                                  <Form>
                                    <Form.Group
                                      style={{ textAlign: "left" }}
                                      controlId="mode_of_payment"
                                    >
                                      <Form.Select
                                        aria-label="Select.."
                                        onChange={(e) => {
                                          setPost({ ...post, status: e.target.value })
                                          handleUpdate({ status: e.target.value })
                                        }}
                                        value={post?.status}
                                      >
                                        <option value="0">Choose an Option</option>
                                        <option value="pending">PENDING</option>
                                        <option value="done">DONE </option>
                                        <option value="cancelled">CANCELLED</option>
                                      </Form.Select>
                                    </Form.Group>
                                  </Form>
                                  {/* <Card.Text>
                                    <Button
                                      size="sm"
                                      variant="success"
                                      style={
                                        post?.status === "done"
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
                                      onClick={() => {
                                        let data = {
                                          status: post.status
                                        }
                                        handleUpdate(data)
                                      }}
                                    >
                                      {post?.status === "done"
                                        ? "Done"
                                        : post.status}
                                    </Button>
                                  </Card.Text> */}
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Payment Status:
                                  </Card.Title>
                                  <Card.Text>
                                    <Button
                                      size="sm"
                                      variant="success"
                                      style={
                                        post.payment_status === true
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
                                      onClick={() => {
                                        let data = {
                                          payment_status: post.payment_status
                                        }
                                        handleUpdate(data)
                                      }
                                      }

                                      value={post?.status}
                                    >
                                      {post.payment_status === true
                                        ? "Paid"
                                        : "Pending"}
                                    </Button>
                                  </Card.Text>
                                </Stack>
                              </Stack>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card
                            border="light"
                            style={{
                              border: "none",
                              marginBottom: 5,
                              textAlign: "left",
                            }}
                          >
                            <Card.Title style={{ color: "#76B757" }}>
                              Doctor's Information
                            </Card.Title>
                            <Card.Body>
                              <Stack gap={2}>
                                <Card.Title style={{ fontSize: "30px" }}>
                                  {post?.clinic_manager_name}
                                </Card.Title>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Doctor :
                                  </Card.Title>
                                  <Card.Text>
                                    {post?.doctor_id?.doctorName}
                                  </Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Doctor's Id :
                                  </Card.Title>
                                  <Card.Text>{post?.doctor_id?._id}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Email :
                                  </Card.Title>
                                  <Card.Text>
                                    {post?.doctor_id?.email}
                                  </Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Specialization :
                                  </Card.Title>
                                  <Card.Text>{post?.departmentname}</Card.Text>
                                </Stack>
                              </Stack>
                            </Card.Body>
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card
                            border="light"
                            style={{
                              border: "none",
                              marginBottom: 5,
                              textAlign: "left",
                            }}
                          >
                            <Card.Title style={{ color: "#76B757" }}>
                              Patient's Information
                            </Card.Title>
                            <Card.Body>
                              <Stack gap={2}>
                                <Card.Title style={{ fontSize: "30px" }}>
                                  {post?.clinic_manager_name}
                                </Card.Title>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Patient :
                                  </Card.Title>
                                  <Card.Text>{post?.patientname}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Patient's Id :
                                  </Card.Title>
                                  <Card.Text>{post?.patient_id}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Age :
                                  </Card.Title>
                                  <Card.Text>{post?.age} Years</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Gender :
                                  </Card.Title>
                                  <Card.Text>{post?.gender}</Card.Text>
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
                                  <Card.Text>
                                    {post?.user_id
                                      ? post?.user_id?.contact_number
                                      : ""}
                                  </Card.Text>
                                </Stack>
                              </Stack>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </>
      )
      }
    </>
  );
};

class AppointmentDetails extends Component {
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

export default AppointmentDetails;

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
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});

  const fetchdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`clinicManager/${value}`)
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
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Clinic Manager</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/receptionist`);
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
                        <Col md={3}>
                          <Card
                            border="none"
                            style={{ border: "none", marginBottom: 5 }}
                          >
                            <Image
                              width="150"
                              height="150"
                              roundedCircle
                              src={
                                post.image
                                  ? post.image
                                  : `https://test.doctorsplaza.in/assets/doctors.png`
                              }
                              alt="staffimage.png"
                            />
                          </Card>
                        </Col>
                        <Col md={6}>
                          <Card border="light" style={{ textAlign: "left" }}>
                            <Card.Body>
                              <Stack gap={2}>
                                <Card.Title style={{ fontSize: "30px" }}>
                                  {post.clinic_manager_name}
                                </Card.Title>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Clinic manager's ID :
                                  </Card.Title>
                                  <Card.Text>{post._id}</Card.Text>
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
                                  <Card.Text>{post.email}</Card.Text>
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
                                    {moment(post.createdAt).format(
                                      "MMM DD,YYYY, HH:mm:ss A"
                                    )}
                                  </Card.Text>
                                </Stack>
                              </Stack>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  post.is_active === true
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
                                {post.is_active === true
                                  ? "Active"
                                  : "Inactive"}
                              </Button>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card style={{ marginTop: "1%" }}>
              <Card.Body style={{ minHeight: "300px" }}>
                <Tabs
                  defaultActiveKey="clinic"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="clinic" title="Clinic Details">
                    <Card border="light" style={{ textAlign: "left" }}>
                      <Card.Body>
                        <Stack gap={2}>
                          <Stack direction="horizontal" gap={2}>
                            <Card.Title
                              style={{
                                fontSize: "18px",
                                marginBottom: "0px",
                              }}
                            >
                              Clinic Name :
                            </Card.Title>
                            <Card.Text>
                              {post.clinicId ? post.clinicId.clinicName : ""}
                            </Card.Text>
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
                              {post.clinicId
                                ? post.clinicId.clinicContactNumber
                                : ""}
                            </Card.Text>
                          </Stack>
                          <Stack direction="horizontal" gap={2}>
                            <Card.Title
                              style={{
                                fontSize: "18px",
                                marginBottom: "0px",
                              }}
                            >
                              Address :
                            </Card.Title>
                            <Card.Text>
                              {post.clinicId ? post.clinicId.location : ""}
                            </Card.Text>
                          </Stack>
                          <Stack direction="horizontal" gap={2}>
                            <Card.Title
                              style={{
                                fontSize: "18px",
                                marginBottom: "0px",
                              }}
                            >
                              Floor :
                            </Card.Title>
                            <Card.Text>
                              {post.clinicId ? post.clinicId.floorCount : "0"}
                            </Card.Text>
                          </Stack>
                        </Stack>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="room" title="Room Details">
                    Not Available
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class ManagerDetails extends Component {
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

export default ManagerDetails;

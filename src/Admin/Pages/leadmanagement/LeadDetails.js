import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { Stack } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { apiAdminConfig } from "../../../utils/api";

const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});
  const fetchdata = async (value) => {
    setLoader(true);
    const api = {
      path: `leadmanagement/${value}`,
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("response.data.data;", response.data.data);
          setPost((prevState) => ({
            ...prevState,
            ...response.data.data,
          }));
        }
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
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
              <h3 style={{ height: "40px" }}>Lead Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/leadmanagement")}
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
                      <Card border="light">
                        <Card.Body style={{ textAlign: "left" }}>
                          <Row>
                            <Stack gap={2}>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Patient Name :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.user_name}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Contact Number :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.user_number}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Specialization :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.specialization}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Attendee Clinic :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.clinic?.clinicName}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Lead Type :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.lead_type}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Created on :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{moment(post.createdAt).format(
                                    "MMM DD,YYYY, HH:mm:ss A"
                                  )}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Address :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.address}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Reamark :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.remarks}</Card.Text>
                                </Col>
                              </Stack>

                              <Stack direction="horizontal" gap={2}>
                                <Col md={3}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Description :
                                  </Card.Title></Col>
                                <Col md={9}>
                                  <Card.Text>{post?.discription}</Card.Text>
                                </Col>
                              </Stack>
                              
                            </Stack>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class LeadDetails extends Component {
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

export default LeadDetails;

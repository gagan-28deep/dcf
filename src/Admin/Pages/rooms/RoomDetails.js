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

const Contant = () => {
  let navigate = useNavigate();
  let { clinicId, id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});
  const fetchdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`rooms/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setPost((prevState) => ({
            ...prevState,
            ...response.data.data[0],
          }));
        }
        setLoader(false);
      })
      .catch((error) => console.log(error));
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
              <h3 style={{ height: "40px" }}>Room Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/clinics/rooms`, {
                    state: { data: clinicId },
                  });
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
                  <Col sm={12} md={4}>
                    <div className="staffdetails-card">
                      <Card border="light">
                        <Image
                          width="300"
                          thumbnail
                          height="200"
                          src={
                            post.image
                              ? post.image
                              : `https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`
                          }
                          alt="staffimage.png"
                        />
                      </Card>
                    </div>
                  </Col>
                  <Col sm={12} md={6}>
                    <div className="staffdetails-card">
                      <Card border="light" style={{ textAlign: "left" }}>
                        <Card.Title
                          style={{ fontSize: "20px", minHeight: "25px" }}
                        >
                          Room Details
                        </Card.Title>
                        <Card.Body>
                          <Row>
                            <Col style={{ minHeight: "30px" }} md={5}>
                              Clinic Name :
                            </Col>
                            <Col md={7} style={{ minHeight: "30px" }}>
                              {post.clinicData
                                ? post.clinicData.clinicName
                                : ""}
                            </Col>
                            <Col md={5}>Clinic Id :</Col>
                            <Col md={7}>
                              {post.clinicData ? post.clinicData._id : ""}
                            </Col>
                            <Col md={5}>Contact No.:</Col>
                            <Col md={7}>
                              {post.clinicData
                                ? post.clinicData.clinicContactNumber
                                : ""}
                            </Col>
                            <Col md={5}>Room No :</Col>
                            <Col md={7}>{post.roomNumber}</Col>

                            <Col md={5}>Room Name :</Col>
                            <Col md={7}>{post.roomName}</Col>

                            <Col md={5}>Created on :</Col>
                            <Col md={7}>
                              {moment(post.createdAt).format(
                                "MMM DD,YYYY, HH:mm:ss A"
                              )}
                            </Col>

                            <Col md={5}>Specialization :</Col>
                            <Col md={7}>{post.specialization}</Col>

                            <Col md={5}>Rent :</Col>
                            <Col md={7}>{post.rentPerMonth}</Col>

                            <Col md={5}>Paid Status :</Col>
                            <Col md={7}>
                              {" "}
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  post.paidStatus === true
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
                                {post.paidStatus === true ? "Paid" : "Due"}
                              </Button>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col>

                  {/* <Col sm={12} md={4}>
                    <div className="staffdetails-card">
                      <Card.Title
                        style={{ fontSize: "20px", minHeight: "25px" }}
                      >
                        Clinic Manager Details
                      </Card.Title>
                      <Card border="light">
                        <Card.Body style={{ textAlign: "left" }}>
                          <Row>
                            <Col style={{ minHeight: "30px" }} md={5}>
                              Manager
                            </Col>
                            <Col md={7} style={{ minHeight: "30px" }}>
                              {post.manager}
                            </Col>
                            <Col md={5}>email :</Col>
                            <Col md={7}>{post.manager_email}</Col>

                            <Col md={5}>status :</Col>
                            <Col md={7}>
                              {post.manager_active === true ? (
                                <span style={{ color: "#76B757" }}>Active</span>
                              ) : (
                                <span style={{ color: "#C42B1C" }}>
                                  Inactive
                                </span>
                              )}
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </div>
                  </Col> */}
                </Row>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class RoomDetails extends Component {
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

export default RoomDetails;

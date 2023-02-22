import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
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
      path: `master/staff/${value}`,
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
  console.log("post.roles", post.roles);
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
              <h3 style={{ height: "40px" }}>Staff Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/staff")}
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
                  <Col sm={12} md={6}>
                    <div className="staffdetails-card">
                      <Row>
                        {/* <Col md={4}>
                          <Card border="light">
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
                        </Col> */}
                        <Col md={12}>
                          <Card border="light" style={{ textAlign: "left" }}>
                            <Card.Body>
                              <Card.Title style={{ height: "25px" }}>
                                {post.user_name}
                              </Card.Title>
                              <Card.Text
                                style={{
                                  fontSize: "12px",
                                  color: "#858F94",
                                }}
                              >
                                Roles: {""}
                                {post?.roles?.map((el) => {
                                  return `${el}, `;
                                })}
                              </Card.Text>
                              <Card.Text>
                                Employee ID: {""} {post.employee_id}
                              </Card.Text>
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
                                      }
                                    : {
                                        backgroundColor: "#FDF8EA",
                                        color: "#EEC048",
                                        borderColor: "#EEC048",
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
                  <Col sm={12} md={6}>
                    <div className="staffdetails-card">
                      <Card border="light">
                        <Card.Body style={{ textAlign: "left" }}>
                          <Row>
                            <Col md={3}>Email</Col>
                            <Col md={9}>{post.email}</Col>

                            <Col md={3}>Created on</Col>
                            <Col md={9}>
                              {moment(post.createdAt).format(
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
        </>
      )}
    </>
  );
};

class Staffdetails extends Component {
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

export default Staffdetails;

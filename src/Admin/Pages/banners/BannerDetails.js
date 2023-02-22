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
      .get(`banner/${value}`)
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
              <h3 style={{ height: "40px" }}>Banner Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/banner`);
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
                                    ID :
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
                                    Banner Title :
                                  </Card.Title>
                                  <Card.Text>{post.banner_title}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Banner Category :
                                  </Card.Title>
                                  <Card.Text>{post.banner_category}</Card.Text>
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
                                  </Card.Text>
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
                <Image
                  src={post.banner_image ? post.banner_image : ""}
                  alt="bannerimage"
                />
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class BannerDetails extends Component {
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

export default BannerDetails;

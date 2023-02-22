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
import { Stack } from "react-bootstrap";

const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});
  const fetchdata = async (value) => {
    setLoader(true);
    const api = {
      path: `ContactUs/${value}`,
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
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
              <h3 style={{ height: "40px" }}>Contact Management</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/contactlist")}
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
                        <Col md={12}>
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
                                    Email :
                                  </Card.Title>
                                  <Card.Text>{post?.from}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Contact ID :
                                  </Card.Title>
                                  <Card.Text>{post?.contact_id}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Type :
                                  </Card.Title>
                                  <Card.Text>{post?.type}</Card.Text>
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
                                  <Card.Text>{post?.status}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Created On :
                                  </Card.Title>
                                  <Card.Text>
                                    {moment(post?.createdAt).format(
                                      "DD-MM-yyyy, hh:mm a"
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
                                    Updated On :
                                  </Card.Title>
                                  <Card.Text>
                                    {moment(post?.updatedAt).format(
                                      "DD-MM-yyyy, hh:mm a"
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
                  <Col sm={12} md={12}>
                    <div className="staffdetails-card">
                      <Card style={{ textAlign: "left" }}>
                        <Card.Body>
                          <Stack gap={2}>
                            <Card.Title
                              style={{
                                fontSize: "18px",
                                marginBottom: "0px",
                              }}
                            >
                              Query :
                            </Card.Title>
                            <Card.Text>{post?.message}</Card.Text>
                          </Stack>
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

class ContactUsDetails extends Component {
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

export default ContactUsDetails;

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
import CustomSnackbar from "../../../Components/notify/Snackbar";
const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const fetchdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .post(`review/getReviewById/`, { id: value })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.data);
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

  const handlestatus = async (value) => {
    console.log("value---->", value);
    let body = {
      id: value._id,
      active: value.is_active === true ? false : true,
    };
    await apiAdminConfig
      .post(`review/editActiveReview/`, body)
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response.data);
          setsnackdata({
            open: true,
            message: response.data.message,
            status: "success",
          });
          setTimeout(() => {
            navigate(`/master/review-rating`, { replace: true });
          }, 1000);
        }
      })
      .catch((error) => {
        console.log("error=====>", error);
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
      {loader ? (
        <Loader />
      ) : (
        <>
          {<CustomSnackbar value={snackData} />}
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Review Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/review-rating`);
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
                                    Rating :
                                  </Card.Title>
                                  <Card.Text>{post.rating}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Review :
                                  </Card.Title>
                                  <Card.Text>{post.review}</Card.Text>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                  <Card.Title
                                    style={{
                                      fontSize: "18px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    Rated By :
                                  </Card.Title>
                                  <Card.Text>
                                    {post.userId
                                      ? post.userId.patient_name
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
                                    Clinic Name :
                                  </Card.Title>
                                  <Card.Text>
                                    {post.clinicId
                                      ? post.clinicId.clinicName
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
                                    Created On :
                                  </Card.Title>
                                  <Card.Text>
                                    {moment(post.createdAt).format(
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
                                    Approve Status :
                                  </Card.Title>
                                  <Button
                                    disabled
                                    size="sm"
                                    variant="success"
                                    style={
                                      post.is_active === true
                                        ? {
                                          backgroundColor: "#E4F1DD",
                                          color: "#76B757",
                                          border: "#76B757",
                                          marginTop: 8,
                                        }
                                        : {
                                          backgroundColor: "#FDF8EA",
                                          color: "#EEC048",
                                          border: "#EEC048",
                                          marginTop: 8,
                                        }
                                    }
                                  >
                                    {post.is_active === true
                                      ? "Active"
                                      : "Inactive"}
                                  </Button>
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
              <Card.Footer>
                <Button
                  size="sm"
                  variant="outline"
                  style={
                    post.is_active === true
                      ? {
                        backgroundColor: "#FDF8EA",
                        color: "#EEC048",
                        border: "1px solid #EEC048",
                        marginTop: 8,
                      }
                      : {
                        backgroundColor: "#E4F1DD",
                        color: "#76B757",
                        borderColor: "1px solid #76B757",
                        marginTop: 8,
                      }
                  }
                  onClick={() => handlestatus(post)}
                >
                  {post.is_active === true ? "Deny" : "Approve"}
                </Button>
              </Card.Footer>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class ReviewDetails extends Component {
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

export default ReviewDetails;

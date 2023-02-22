import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Table from "react-bootstrap/Table";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline, MdDelete } from "react-icons/md";
import moment from "moment";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import Timeselect from "../../../Components/Datepicker/Timeselect";
const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [roomlist, setroomlist] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const week = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let tablehead = [
    "S/N",
    "Clinic",
    "Room",
    "Session Type",
    "Day",
    "Start Time",
    "End Time",
    "Slot",
    "Action",
  ];
  const formik = useFormik({
    initialValues: {
      clinic: "",
      end_time: "",
      room: "",
      slot_time: "",
      start_time: "",
      type: "",
      day: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.clinic) {
        errors.clinic = "Clinic is required";
      }
      if (!values.end_time) {
        errors.end_time = "End time is required";
      }
      if (!values.start_time) {
        errors.start_time = "Start time is required";
      }
      if (!values.room) {
        errors.room = "Room is required";
      }
      if (!values.type) {
        errors.type = "Seesion Type is required";
      }
      if (!values.slot_time) {
        errors.slot_time = "Slot time is required";
      }
      if (!values.day) {
        errors.day = "Day is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      setLoader(true);
      let body = {
        day: values.day,
        doctor_id: id,
        slots: [{ ...values }],
      };
      await apiAdminConfig
        .post("create_doctor_session", body)
        .then((response) => {
          setLoader(false);
          if (response.status === 200) {
            setsnackdata({
              open: true,
              message: "Doctor Seesion Created Successfully",
              status: "success",
            });
            formik.resetForm();
            fetchSessions(id);
          }
          if (response.status === 400) {
            setsnackdata({
              open: true,
              message: response.data.message,
              status: "error",
            });
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response?.status === 406) {
            for (const [key, value] of Object.entries(values)) {
              if ((response.data.type = "phone")) {
                setErrors({ phoneNo: response.data.message });
              }
              if ((response.data.type = "email")) {
                setErrors({ email: response.data.message });
              }
            }
          }
        });
    },
  });

  // get Clinic
  const fetchClinic = async () => {
    await apiAdminConfig
      .get(`asset`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item._id, label: item.clinicName });
          }
          setOptions(arr);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchroom = async (value) => {
    await apiAdminConfig
      .get(`getAllRoomByClinicId/${value}`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({
              value: item._id,
              label: `${item.roomNumber} - ${item.specialization}`,
            });
          }
          setroomlist(arr);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const fetchSessions = async (id) => {
    await apiAdminConfig
      .get(`getsessionbydoctorid/${id}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response.data.data);
          let apidata = response.data.data;
          setPosts(apidata);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchClinic();
    fetchSessions(id);
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  const handleremovesession = async (value) => {
    await apiAdminConfig
      .delete(`remove_session/${value}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response);
          setsnackdata({
            open: true,
            message: response.data.message,
            status: "success",
          });
          fetchSessions(id);
        }
      })
      .catch((error) => {
        console.log("error", error);
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
          <CustomSnackbar value={snackData} />
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Doctor Session</h3>
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
            <Card style={{ marginBottom: "1rem" }}>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="type"
                      >
                        <Form.Label>Session Type</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.type}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("type", e.target.value);
                            }
                          }}
                          isInvalid={formik.touched.type && formik.errors.type}
                        >
                          <option value="0">Select Type</option>
                          <option value="online">Online</option>
                          <option value="offline">Offline</option>
                        </Form.Select>
                        {formik.errors.type && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.type}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="day">
                        <Form.Label>Select Day</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.day}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("day", e.target.value);
                            }
                          }}
                          isInvalid={formik.touched.day && formik.errors.day}
                        >
                          <option value="0">Select day</option>
                          {week.map((el, id) => {
                            return (
                              <option key={id} value={el.toLowerCase()}>
                                {el}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.day && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.day}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="clinic"
                      >
                        <Form.Label>Clinic</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.clinic}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("clinic", e.target.value);
                              fetchroom(e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.clinic && formik.errors.clinic
                          }
                        >
                          <option value="0">Select Clinic</option>
                          {options.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.clinic && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.clinic}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="room"
                      >
                        <Form.Label>Room</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.room}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("room", e.target.value);
                            }
                          }}
                          isInvalid={formik.touched.room && formik.errors.room}
                        >
                          <option value="0">Select Room</option>
                          {roomlist.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.room && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.room}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="addDoctorAnnotation"
                      >
                        <Form.Label>Slot Time</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.slot_time}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("slot_time", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.slot_time && formik.errors.slot_time
                          }
                        >
                          <option value="0">Select Slot</option>
                          <option value="15">15 Minutes</option>
                          <option value="30">30 Minutes (Half Hour)</option>
                          <option value="60">60 Minuts (One Hour)</option>
                        </Form.Select>
                        {formik.errors.slot_time && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.slot_time}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="start_time"
                      >
                        <Form.Label>Start Time</Form.Label>
                        <Timeselect
                          place="Start Time"
                          changetime={(val) => {
                            formik.setFieldValue(
                              "start_time",
                              moment(val).format("H:mm")
                            );
                          }}
                          value={formik.values.start_time}
                          type={
                            formik.touched.start_time &&
                              formik.errors.start_time
                              ? "error"
                              : "success"
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="end_time"
                      >
                        <Form.Label>End time</Form.Label>
                        <Timeselect
                          place="End Time"
                          changetime={(val) => {
                            formik.setFieldValue(
                              "end_time",
                              moment(val).format("H:mm")
                            );
                          }}
                          value={formik.values.end_time}
                          type={
                            formik.touched.end_time && formik.errors.end_time
                              ? "error"
                              : "success"
                          }
                        />
                        {formik.errors.end_time && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.end_time}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                  </Row>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ background: "#76B757" }}
                      variant="contained"
                      className="rounded"
                      type="submit"
                    >
                      Submit
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: "#76B757",
                        color: "#76B757",
                      }}
                      variant="outlined"
                      className="rounded"
                      onClick={() => formik.resetForm()}
                    // onClick={datanull}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "100%",
                display: `${currentPost.length > 0 ? "block" : "none"}`,
              }}
            >
              <Card.Body className="mt-2" style={{ minHeight: "300px" }}>
                <Table size="lg" responsive>
                  <thead
                    style={{
                      backgroundColor: "#F0F1F2",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    <tr style={{ width: "100%" }}>
                      {tablehead.map((el, id) => {
                        return (
                          <th
                            key={id}
                            style={
                              id === 0
                                ? { width: "100%" }
                                : el === "Action"
                                  ? { minWidth: "15vh", textAlign: "center" }
                                  : { minWidth: "25vh" }
                            }
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
                          <td>{el?.clinicData?.clinicName}</td>
                          <td>{el?.roomData?.roomNumber}</td>
                          <td>{el?.session_type}</td>
                          <td>{el?.day}</td>
                          <td>{el?.start_time}</td>
                          <td>{el?.end_time}</td>
                          <td>{`${el?.slot_time} Minutes`}</td>
                          <td>
                            <Button
                              onClick={() => handleremovesession(el._id)}
                              color="error"
                            >
                              <MdDeleteOutline size={20} />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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

class Doctorssession extends Component {
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

export default Doctorssession;

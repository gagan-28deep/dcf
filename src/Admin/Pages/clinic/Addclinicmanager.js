import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { apiAdminConfig } from "../../../utils/api";
import { useFormik } from "formik";
import { Stack } from "react-bootstrap";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [post, setPost] = useState({});

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Manager is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      values.clinicId = id;
      await apiAdminConfig
        .post("/assignClinicManager", values)
        .then((response) => {
          if (response?.status === 200) {
            setLoader(false);
            setsnackdata({
              open: true,
              message: "Clinic manager assigned successfully",
              status: "success",
            });
            setTimeout(() => {
              setsnackdata({
                open: false,
              });
            }, 2000);
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response?.data?.status === 406) {
            if (response.data.message.toLowerCase().split(" ")[0] === "phone") {
              setErrors({ phoneNo: response.data.message });
            }
            if (response.data.message.toLowerCase().split(" ")[0] === "email") {
              setErrors({ email: response.data.message });
            }
          }
        });
    },
  });

  // get email data
  const fetchallemails = async () => {
    setLoader(true);
    const api = {
      path: "getAllNotAssignClinicManagerData",
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item, label: item });
          }
          setOptions(arr);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const fecthmanager = async (id) => {
    await apiAdminConfig
      .get(`asset/${id}`)
      .then((response) => {
        console.log("response", response.data.data);
        setPost((prevState) => ({
          ...prevState,
          ...response.data.data,
        }));
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchallemails();
    fecthmanager(id);
  }, []);
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
              <h3 style={{ height: "40px" }}>Clinic Manager </h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/clinics")}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body>
                {" "}
                <Stack gap={2}>
                  <Card.Title style={{ fontSize: "30px", textAlign: "left" }}>
                    {post?.clinicManagerId?.clinic_manager_name}
                  </Card.Title>
                  <Stack direction="horizontal" gap={2}>
                    <Card.Title
                      style={{
                        fontSize: "18px",
                        marginBottom: "0px",
                      }}
                    >
                      email :
                    </Card.Title>
                    <Card.Text>{post?.clinicManagerId?.email}</Card.Text>
                  </Stack>
                  <Stack direction="horizontal" gap={2}>
                    <Card.Title
                      style={{
                        fontSize: "18px",
                        marginBottom: "0px",
                      }}
                    >
                      Clinic Contact No. :
                    </Card.Title>
                    <Card.Text>{post?.clinicContactNumber}</Card.Text>
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
                      {post?.clinicManagerId?.is_active === true
                        ? "ACTIVE"
                        : "INACTIVE"}
                    </Card.Text>
                  </Stack>
                </Stack>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body style={{ minHeight: "200px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="email"
                      >
                        <Form.Label>Assign a new manager</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.email}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("email", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.email && formik.errors.email
                          }
                        >
                          <option value="0">Select Manager</option>
                          {options.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.email && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
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
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class AddclinicManager extends Component {
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

export default AddclinicManager;

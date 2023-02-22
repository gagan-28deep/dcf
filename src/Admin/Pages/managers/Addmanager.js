import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";

const Contant = () => {
  let navigate = useNavigate();
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      clinicId: "",
      email: "",
      receptionistName: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.clinicId) {
        errors.phoneNo = "Clinic is required";
      }
      if (!values.receptionistName) {
        errors.receptionistName = "Name is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      await apiAdminConfig
        .post("/addClinicManager", values)
        .then((response) => {
          if (response && response?.status === 200) {
            setLoader(false);
            setsnackdata({
              open: true,
              message: response.data.message,
              status: "success",
            });
            formik.resetForm();
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

  // get DeptName
  const fetchDeptName = async () => {
    await apiAdminConfig
      .get("asset")
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
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchDeptName();
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
              <h3 style={{ height: "40px" }}>Add Clinic Manager</h3>
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
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="receptionistName"
                      >
                        <Form.Label>Clinic Manager Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.receptionistName}
                          name="receptionistName"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          className="mb-0"
                          isInvalid={
                            formik.touched.receptionistName &&
                            formik.errors.receptionistName
                          }
                        />
                        {formik.errors.receptionistName && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.receptionistName}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="email"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          value={formik.values.email}
                          name="email"
                          onChange={formik.handleChange}
                          placeholder="Enter Email"
                          className="mb-0"
                          isInvalid={
                            formik.touched.email && formik.errors.email
                          }
                        />
                        {formik.errors.email && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="clinicId"
                      >
                        <Form.Label>Select Clinic</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.clinicId}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("clinicId", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.clinicId && formik.errors.clinicId
                          }
                        >
                          <option value="0">Select</option>
                          {options.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.mode_of_payment && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.mode_of_payment}
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

class AddManager extends Component {
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

export default AddManager;

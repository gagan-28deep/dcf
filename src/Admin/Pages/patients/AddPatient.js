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
import DateSelect from "../../../Components/Datepicker/Dateselect";
import { MultiSelectBox } from "../../../Components/form";

const Contant = () => {
  let navigate = useNavigate();
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [loader, setLoader] = useState(false);
  const [clinics, setClinics] = React.useState([]);

  const getClinics = async () => {
    await apiAdminConfig.get('asset').then((response) => {
      if (response.status) {
        let clinicsData = []
        response?.data && response?.data?.data.forEach((element) => {
          clinicsData.push({
            clinicName: element?.clinicName,
            _id: element?._id,
          })
        })
        setClinics(clinicsData)
      }
    })
  }

  React.useEffect(() => {
    getClinics();
  }, [])

  const formik = useFormik({
    initialValues: {
      patient_name: "",
      email: "",
      gender: "",
      contactNumber: "",
      assigned_clinic: [],
      dob: "",
      address: "",
      is_admin: true,
    },
    validate: (values) => {
      const errors = {};
      if (!values.patient_name) {
        errors.patient_name = "Name is required";
      }
      // if (!values.email) {
      //   errors.email = "Email is required";
      // } else if (
      //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      // ) {
      //   errors.email = "Invalid email address";
      // }
      if (!values.dob) {
        errors.dob = "Birth Date is required";
      }
      if (!values.contactNumber) {
        errors.contactNumber = "Phone is required";
      } else if (!/^\d+$/.test(values.contactNumber)) {
        errors.contactNumber = "Please enter valid number";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      console.log("values", values);
      await apiAdminConfig
        .post("/addPatient", values)
        .then((response) => {
          console.log("response", response);
          if (response.status === 200) {
            setLoader(false);
            setsnackdata({
              open: true,
              message: response.data.message,
              status: "success",
            });
            formik.resetForm();
          }
          if (response.status === 400) {
            if (response?.data?.message) {
              setsnackdata({
                open: true,
                message: response.data.message,
                status: "error",
              });
            }
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response?.data?.status === 406) {
            console.log("response", response);
            if (response.data.message.toLowerCase().split(" ")[0] === "phone") {
              setErrors({ contactNumber: response.data.message });
            }
            if (response.data.message.toLowerCase().split(" ")[0] === "email") {
              setErrors({ email: response.data.message });
            }
          }
        });
    },
  });
  console.log("forniik.clnics", formik.values.assigned_clinic)
  const success = (pos) => {
    const crd = pos.coords;
    console.log("Your current position is:", crd);
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  };

  const error = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  useEffect(() => {
    console.log(
      "getCurrentPosition()",
      navigator.geolocation.getCurrentPosition(success, error)
    );
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
              <h3 style={{ height: "40px" }}>Add Patient</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/patients`);
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
                        controlId="patient_name"
                      >
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.patient_name}
                          name="patient_name"
                          onChange={(e) => {
                            setsnackdata({ open: false });
                            formik.handleChange(e);
                          }}
                          placeholder="  Name"
                          className="mb-0"
                          isInvalid={
                            formik.touched.patient_name &&
                            formik.errors.patient_name
                          }
                        />
                        {formik.errors.patient_name && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.patient_name}
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
                        controlId="contactNumber"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="tel"
                          maxLength="10"
                          value={formik.values.contactNumber}
                          name="contactNumber"
                          onChange={formik.handleChange}
                          placeholder="Enter Number"
                          className="mb-0"
                          isInvalid={
                            formik.touched.contactNumber &&
                            formik.errors.contactNumber
                          }
                        />
                        {formik.errors.contactNumber && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.contactNumber}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="gender"
                      >
                        <Form.Label>Gender</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.gender}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("gender", e.target.value);
                            }
                          }}
                        >
                          <option value="0">Select</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="address"
                      >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.address}
                          name="address"
                          onChange={formik.handleChange}
                          placeholder="Enter Address"
                          className="mb-0"
                          isInvalid={
                            formik.touched.address && formik.errors.address
                          }
                        />
                        {formik.errors.address && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.address}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="dob">
                        <Form.Label>Date Of Birth</Form.Label>
                        <DateSelect
                          maxDate={true}
                          minDate={true}
                          place="Select Date"
                          select={(value) => {
                            formik.setFieldValue("dob", value);
                          }}
                          type={
                            formik.touched.dob &&
                              formik.errors.dob
                              ? "error"
                              : "success"
                          }
                          value={formik.values.dob}
                        />
                        {formik.errors.dob && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.dob}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <MultiSelectBox
                        label="Assigned Clinics"
                        placeholder="Select Clinics"
                        fullWidth
                        classNames="text-justify w-100"
                        isMulti={true}
                        value={formik.values.assigned_clinic}
                        name="assigned_clinic"
                        onChange={(e) => {
                          formik.setFieldValue("assigned_clinic", e)
                        }}
                        getOptionLabel={option => option.clinicName}
                        getOptionValue={option => option._id}
                        options={clinics}
                        className="mb-0"
                        isInvalid={
                          formik.touched.assigned_clinic && formik.errors.assigned_clinic
                        }
                      />
                    </Col>
                    <Col xs={12} md={6} lg={4}></Col>
                    <Col xs={12} md={6} lg={4}></Col>
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
                      onClick={() => {
                        formik.resetForm();
                      }}
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

class AddPatient extends Component {
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

export default AddPatient;

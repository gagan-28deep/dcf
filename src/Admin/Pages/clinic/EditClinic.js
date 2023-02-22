import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import { Link } from "react-router-dom";
import Sidebar from "../../SideNav/sideBar";
import Image from "react-bootstrap/Image";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import Timeselect from "../../../Components/Datepicker/Timeselect";
import LocationSearchInput from "../../../Components/locationsearch/LocationSearch";
import moment from "moment";
import { apiAdminConfig } from "../../../utils/api";
import { useFormik } from "formik";
import { useSnackbar } from "../../../provider/snackbar";
const Contant = () => {
  let { id } = useParams();
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const formik = useFormik({
    initialValues: {
      clinicName: "",
      city: "",
      comment: "",
      end_time: "",
      floorCount: 0,
      latitude: 0,
      location: "",
      longitude: 0,
      phone: "",
      pincode: "",
      start_time: "",
      state: "",
      status: "",
      vicinity: "",
      image: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.phone) {
        errors.phone = "Phone is required";
      } else if (!/^[0-9]{10}$/.test(values.phone)) {
        errors.phone = "Please enter valid number";
      }
      if (!values.pincode) {
        errors.pincode = "Pincode is required";
      } else if (!/^[0-9]{6}$/.test(values.pincode)) {
        errors.pincode = "Please enter valid pincode";
      }
      if (!values.clinicName) {
        errors.clinicName = "Name is required";
      }
      if (!values.city) {
        errors.city = "City is required";
      }
      if (!values.state) {
        errors.state = "State is required";
      }
      if (!values.floorCount) {
        errors.floorCount = "Floor Count is required";
      }
      if (!values.start_time) {
        errors.start_time = "Start Time is required";
      }
      if (!values.end_time) {
        errors.end_time = "End Time is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      values.status = true;
      setLoader(true);
      await apiAdminConfig
        .put(`asset/${id}`, values)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setLoader(false);
            snackbar({
              message: "Clinic Updated Successfully.",
              severity: "success",
            });
            setTimeout(() => {
              navigate("../master/clinics", { replace: true });
            }, 1000);
          }
        })
        .catch((error) => console.log("error", error));
    },
  });

  // Get lat long
  const getCord = (value) => {
    formik.setFieldValue("latitude", value?.lat);
    formik.setFieldValue("longitude", value?.lng);
    formik.setFieldValue("location", value?.location);
  };

  //Get Location
  const getlocation = (value) => {
    if (value.postalCode) {
      formik.setFieldValue("pincode", value?.postalCode);
    }
    if (value.city) {
      formik.setFieldValue("city", value?.city);
    }
    if (value.state) {
      formik.setFieldValue("state", value?.state);
    }
  };

  const getClinicDetails = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`asset/${value}`)
      .then((response) => {
        console.log(response.data.data);
        for (const [key, value] of Object.entries(response.data.data)) {
          if (key === "clinicContactNumber") {
            formik.setFieldValue(`phone`, value);
          } else {
            formik.setFieldValue(`${key}`, value);
          }
        }
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    getClinicDetails(id);
  }, []);

  const fileUpload = async (event) => {
    let body = { files: event.target.files[0] };
    await apiAdminConfig
      .post(
        "getFileUrl",
        { ...body },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          formik.setFieldValue(`${event.target.name}`, response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Edit Clinic</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Link to={`/master/clinics`} style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="success">
                  Back
                </Button>
              </Link>
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
                        controlId="clinicName"
                      >
                        <Form.Label>Clinic Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.clinicName}
                          name="clinicName"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          isInvalid={
                            formik.touched.clinicName &&
                            formik.errors.clinicName
                          }
                        />
                        {formik.errors.clinicName && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.clinicName}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="floorCount"
                      >
                        <Form.Label>Number of Floors</Form.Label>
                        <Form.Control
                          type="number"
                          value={formik.values.floorCount}
                          name="floorCount"
                          onChange={formik.handleChange}
                          placeholder="Floors"
                          isInvalid={
                            formik.touched.floorCount &&
                            formik.errors.floorCount
                          }
                        />
                        {formik.errors.floorCount && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.floorCount}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="location"
                      >
                        <Form.Label>Location</Form.Label>
                        {/* <LocationSearchBox
                          getCord={getCord}
                          getlocation={getlocation}
                        /> */}
                        <LocationSearchInput
                          getCord={getCord}
                          getlocation={getlocation}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="city"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          value={formik.values.city}
                          name="city"
                          onChange={formik.handleChange}
                          placeholder="Enter City"
                          isInvalid={formik.touched.city && formik.errors.city}
                        />
                        {formik.errors.city && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.city}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="state"
                      >
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          value={formik.values.state}
                          name="state"
                          onChange={formik.handleChange}
                          placeholder="Enter State"
                          isInvalid={
                            formik.touched.state && formik.errors.state
                          }
                        />
                        {formik.errors.state && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.state}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="pincode"
                      >
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          value={formik.values.pincode}
                          maxLength={6}
                          name="pincode"
                          onChange={formik.handleChange}
                          placeholder="Enter Pincode"
                          isInvalid={
                            formik.touched.pincode && formik.errors.pincode
                          }
                        />
                        {formik.errors.pincode && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.pincode}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="comment"
                      >
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.comment}
                          name="comment"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          isInvalid={
                            formik.touched.comment && formik.errors.comment
                          }
                        />
                        {formik.errors.comment && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.comment}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="phone"
                      >
                        <Form.Label>Contact No.</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.phone}
                          name="phone"
                          maxLength={10}
                          onChange={formik.handleChange}
                          placeholder="Enter Contact No."
                          isInvalid={
                            formik.touched.phone && formik.errors.phone
                          }
                        />
                        {formik.errors.phone && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.phone}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={2}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="start_time"
                      >
                        <Form.Label>Start Time</Form.Label>
                        <Timeselect
                          place="Start Time"
                          changetime={(val) =>
                            formik.setFieldValue(
                              "start_time",
                              moment(val).format("H:mm")
                            )
                          }
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
                    <Col xs={12} md={6} lg={2}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="end_time"
                      >
                        <Form.Label>End time</Form.Label>
                        <Timeselect
                          place="End Time"
                          changetime={(val) =>
                            formik.setFieldValue(
                              "end_time",
                              moment(val).format("H:mm")
                            )
                          }
                          value={formik.values.end_time}
                          type={
                            formik.touched.end_time && formik.errors.end_time
                              ? "error"
                              : "success"
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="image"
                      >
                        <Form.Label>Clinic Image</Form.Label>
                        <Form.Control
                          name="image"
                          type="file"
                          className="mb-0"
                          onChange={(e) => {
                            fileUpload(e);
                          }}
                        />
                      </Form.Group>
                      <Image
                        style={{
                          margin: "10px",
                          display: `${formik.values.image ? "block" : "none"}`,
                        }}
                        src={formik.values.image}
                        alt={formik.values.image}
                        width="150"
                        height="150"
                        thumbnail
                      />
                    </Col>
                  </Row>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ background: "#76B757" }}
                      variant="contained"
                      className="rounded"
                      type="submit"
                    >
                      Update
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: "#76B757",
                        color: "#76B757",
                      }}
                      variant="outlined"
                      className="rounded"
                      onClick={() => getClinicDetails(id)}
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

class Editclinic extends Component {
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

export default Editclinic;

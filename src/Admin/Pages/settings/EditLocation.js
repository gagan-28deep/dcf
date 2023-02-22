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
import { apiAdminConfig } from "../../../utils/api";
import { useFormik } from "formik";
import { useSnackbar } from "../../../provider/snackbar";
import LocationSearchInput from "../../../Components/locationsearch/LocationSearch";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      city: "",
      full_location: "",
      latitude: 0,
      location: "",
      longitude: 0,
      pincode: "",
      state: "",
      status: "true",
    },
    validate: (values) => {
      const errors = {};
      if (!values.state) {
        errors.state = "State is required";
      }
      if (!values.city) {
        errors.city = "City is required";
      }
      if (!values.pincode) {
        errors.pincode = "Pincode is required";
      } else if (!/^[0-9]{6}$/.test(values.pincode)) {
        errors.pincode = "Please enter valid pincode";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      setLoader(true);
      if (values.full_location) {
        await apiAdminConfig
          .put(`location/${id}`, values)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              setLoader(false);
              snackbar({
                message: "Location has been Updated successfully.",
                severity: "success",
              });
              setTimeout(() => {
                navigate(`/master/settings/location`, { replace: true });
              }, 1000);
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        snackbar({
          message: "Location is required.",
          severity: "error",
        });
      }
    },
  });

  // Get lat long
  const getCord = (value) => {
    formik.setFieldValue("latitude", value?.lat);
    formik.setFieldValue("longitude", value?.lng);
    formik.setFieldValue("full_location", value?.location);
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
    if (value.route) {
      formik.setFieldValue("location", value?.route);
    }
  };

  const fetchdata = async (value) => {
    await apiAdminConfig
      .get(`location/${value}`)
      .then((response) => {
        if (response.status === 200) {
          for (const [key, value] of Object.entries(response.data.data)) {
            formik.setFieldValue(`${key}`, value);
          }
        }
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
              <h3 style={{ height: "40px" }}>Edit Location</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/settings/location")}
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
                    <Col xs={12} md={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="user_name"
                      >
                        <Form.Label>Location</Form.Label>
                        <LocationSearchInput
                          getCord={getCord}
                          getlocation={getlocation}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="location"
                      >
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.location}
                          name="location"
                          onChange={formik.handleChange}
                          placeholder="Enter Address"
                          isInvalid={
                            formik.touched.location && formik.errors.location
                          }
                        />
                        {formik.errors.location && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.location}
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
                          type="text"
                          value={formik.values.state}
                          name="state"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
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
                        controlId="city"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.city}
                          name="city"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
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
                        controlId="pincode"
                      >
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.pincode}
                          name="pincode"
                          maxLength={6}
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
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
                        controlId="status"
                      >
                        <Form.Label>Status</Form.Label>
                        <Form.Check
                          checked={formik.values.status === true ? true : false}
                          type="switch"
                          id="custom-switch"
                          name="status"
                          feedback="Hello"
                          onClick={() => {
                            formik.setFieldValue(
                              "status",
                              formik.values.status === true ? false : true
                            );
                          }}
                          label={
                            formik.values.status === true
                              ? "Location is Active"
                              : "Location is Inactive"
                          }
                          isInvalid={
                            formik.touched.status && formik.errors.status
                          }
                        />
                        {formik.errors.status && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.status}
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
                      Update
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: "#76B757",
                        color: "#76B757",
                      }}
                      variant="outlined"
                      className="rounded"
                      onClick={() => fetchdata(id)}
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

class EditLocation extends Component {
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

export default EditLocation;

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
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import QuillComponent from "../../../Components/reactquill/QuillComponent";
import { MultiSelectBox } from "../../../Components/form";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [statelist, setStatelist] = useState([]);
  const [citylist, setCitylist] = useState([]);
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
      doctorName: "",
      email: "",
      departmentName: "",
      phoneNo: "",
      state: "",
      assigned_clinic: [],
      city: "",
      pincode: "",
      address: "",
      about: "",
      qualification: "",
      consultationfee: "",
      image: "",
      signature: "",
      addDoctorAnnotation: false,
      is_admin: true,
      experience: 0,
      licenseNo: "",
      metaTitle: "",
      metaDescription: ""
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
      if (!values.phoneNo) {
        errors.phoneNo = "Phone is required";
      } else if (!/^[0-9]{10}$/.test(values.phoneNo)) {
        errors.phoneNo = "Please enter valid number";
      }
      if (!values.experience) {
        errors.experience = "Experience is required";
      } else if (!/^[0-9]*$/.test(values.experience)) {
        errors.experience = "Please enter valid number";
      }
      if (!values.pincode) {
        errors.pincode = "Pincode is required";
      } else if (!/^[0-9]{6}$/.test(values.pincode)) {
        errors.pincode = "Please enter valid pincode";
      }
      if (!values.consultationfee) {
        errors.consultationfee = "consultationfee is required";
      } else if (!/^[0-9]*$/.test(values.consultationfee)) {
        errors.consultationfee = "Please enter a valid amount";
      }
      if (!values.licenseNo) {
        errors.licenseNo = "License Number is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      await apiAdminConfig
        .post("/addDoctor", values)
        .then((response) => {
          if (response?.data?.success) {
            setLoader(false);
            snackbar({
              message: response.data.message,
              severity: "success",
            });
            formik.resetForm();
          } else {
            snackbar({
              message: response.data.message,
              severity: "error",
            });
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

  // get DeptName
  const fetchDeptName = async () => {
    await apiAdminConfig
      .post(`getDeptName`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item, label: item });
          }
          setOptions(arr);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // get state list
  const fetchState = async () => {
    await apiAdminConfig
      .post("getState")
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item, label: item });
          }
          setStatelist(arr);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const fetchCity = async (value) => {
    await apiAdminConfig
      .post("getCity", { state: value })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item, label: item });
          }
          setCitylist(arr);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchDeptName();
    fetchState();
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
              <h3 style={{ height: "40px" }}>Add Doctor</h3>
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
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="doctorName"
                      >
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.doctorName}
                          name="doctorName"
                          onChange={formik.handleChange}
                          placeholder="Enter Doctor Name"
                          className="mb-0"
                          isInvalid={
                            formik.touched.doctorName &&
                            formik.errors.doctorName
                          }
                        />
                        {formik.errors.doctorName && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.doctorName}
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
                        controlId="departmentName"
                      >
                        <Form.Label>Specialization</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.departmentName}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue(
                                "departmentName",
                                e.target.value
                              );
                            }
                          }}
                          isInvalid={
                            formik.touched.departmentName &&
                            formik.errors.departmentName
                          }
                        >
                          <option value="0">Select Specialization</option>
                          {options.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="phoneNo"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          type="tel"
                          maxLength="10"
                          value={formik.values.phoneNo}
                          name="phoneNo"
                          onChange={formik.handleChange}
                          placeholder="Enter Number"
                          className="mb-0"
                          isInvalid={
                            formik.touched.phoneNo && formik.errors.phoneNo
                          }
                        />
                        {formik.errors.phoneNo && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.phoneNo}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="licenseNo"
                      >
                        <Form.Label>License Number</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.licenseNo}
                          name="licenseNo"
                          onChange={formik.handleChange}
                          placeholder="Enter License Number"
                          className="mb-0"
                          isInvalid={
                            formik.touched.licenseNo && formik.errors.licenseNo
                          }
                        />
                        {formik.errors.licenseNo && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.licenseNo}
                          </Form.Control.Feedback>
                        )}
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
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="state"
                      >
                        <Form.Label>State</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.state}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("state", e.target.value);
                              fetchCity(e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.state && formik.errors.state
                          }
                        >
                          <option value="0">Select State</option>
                          {statelist.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="city"
                      >
                        <Form.Label>City</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.city}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("city", e.target.value);
                            }
                          }}
                          isInvalid={formik.touched.city && formik.errors.city}
                        >
                          <option value="0">Select City</option>
                          {citylist.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
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
                          placeholder="Enter Pincode"
                          className="mb-0"
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
                    {/* <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="about"
                      >
                        <Form.Label>About Doctor</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.about}
                          name="about"
                          onChange={formik.handleChange}
                          placeholder="About Doctor"
                          className="mb-0"
                          isInvalid={
                            formik.touched.about && formik.errors.about
                          }
                        />
                        {formik.errors.about && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.about}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col> */}
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="experience"
                      >
                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                          type="text"
                          maxLength={2}
                          value={formik.values.experience}
                          name="experience"
                          onChange={formik.handleChange}
                          placeholder="experience"
                          className="mb-0"
                          isInvalid={
                            formik.touched.experience &&
                            formik.errors.experience
                          }
                        />
                        {formik.errors.experience && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.experience}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="qualification"
                      >
                        <Form.Label>Doctor's Qualifications</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.qualification}
                          name="qualification"
                          onChange={formik.handleChange}
                          placeholder="Qualification"
                          className="mb-0"
                          isInvalid={
                            formik.touched.qualification &&
                            formik.errors.qualification
                          }
                        />
                        {formik.errors.qualification && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.qualification}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="consultationfee"
                      >
                        <Form.Label>Consultation Fee(₹)</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.consultationfee}
                          name="consultationfee"
                          maxLength={5}
                          onChange={formik.handleChange}
                          placeholder="Enter Fee"
                          className="mb-0"
                          isInvalid={
                            formik.touched.consultationfee &&
                            formik.errors.consultationfee
                          }
                        />
                        {formik.errors.consultationfee && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.consultationfee}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="addDoctorAnnotation"
                      >
                        <Form.Label>Add "Dr." Annotation</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.addDoctorAnnotation}
                          onChange={(e) => {
                            formik.setFieldValue(
                              "addDoctorAnnotation",
                              e.target.value === "true" ? true : false
                            );
                          }}
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="image"
                      >
                        <Form.Label>Profile Picture</Form.Label>
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
                    <Col xs={12} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="signature"
                      >
                        <Form.Label>Doctor's Signature</Form.Label>
                        <Form.Control
                          name="signature"
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
                          display: `${formik.values.signature ? "block" : "none"}`,
                        }}
                        src={formik.values.signature}
                        alt={formik.values.signature}
                        width="150"
                        height="150"
                        thumbnail
                      />
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="about"
                      >
                        <Form.Label>About Doctor</Form.Label>
                        <QuillComponent
                          change={(val) => {
                            formik.setFieldValue("about", val);
                          }
                          }
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="metaTitle"
                      >
                        <Form.Label>Meta Title</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={1}
                          value={formik.values.metaTitle}
                          name="metaTitle"
                          onChange={formik.handleChange}
                          placeholder="Enter"
                          className="mb-0"
                          isInvalid={
                            formik.touched.metaTitle &&
                            formik.errors.metaTitle
                          }
                        />
                        {formik.errors.metaTitle && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.metaTitle}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="metaDescription"
                      >
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={2}
                          value={formik.values.metaDescription}
                          name="metaDescription"
                          onChange={formik.handleChange}
                          placeholder="Enter"
                          className="mb-0"
                          isInvalid={
                            formik.touched.metaDescription &&
                            formik.errors.metaDescription
                          }
                        />
                        {formik.errors.metaDescription && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.metaDescription}
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

class Adddoctor extends Component {
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

export default Adddoctor;

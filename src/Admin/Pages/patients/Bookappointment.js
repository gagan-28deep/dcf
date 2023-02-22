import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import DateSelect from "../../../Components/Datepicker/Dateselect";
import moment from "moment";
import { useSnackbar } from "../../../provider/snackbar";
import InputGroup from "react-bootstrap/InputGroup";
import { MdOutlineCancel } from "react-icons/md";
const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [clinic, setClinic] = useState([]);
  const [dept, setDept] = useState([]);
  const [doctor, setDoctor] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [couponCode, setCouponCode] = useState("");
  const [postsPerPage] = useState(10);
  const [posts, setPosts] = useState([]);
  const [couponStyle, setcouponStyle] = useState("none")
  const [fixedprice, setfixedprice] = useState("none");
  const [fixedDiscount, setFixedDiscount] = useState(0);

  let tablehead = [
    "Select Time",
    "Days",
    "Date",
    "Start Time	",
    "End Time",
    "Floor",
    "Room Number",
  ];
  const formik = useFormik({
    initialValues: {
      age: 0,
      appointment_type: "",
      booked_as: "",
      clinicId: "",
      clinicname: "",
      consultation_fee: "",
      date: "",
      departmentname: "",
      doctor_id: "",
      doctorname: "",
      gender: "",
      mobile: "",
      mode_of_payment: "",
      patient_id: "",
      patientname: "",
      payment_id: "",
      payment_status: false,
      problem: "",
      slotIdArray: "",
      status: "pending",
      user_id: "",
      final_price: 0,
      original_price: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.mode_of_payment) {
        errors.mode_of_payment = "Mode of Payment is required";
      }
      if (!values.clinicId) {
        errors.clinicId = "Clinic is required";
      }
      if (!values.departmentname) {
        errors.departmentname = "Specialization is required";
      }
      if (!values.doctor_id) {
        errors.doctor_id = "Doctor is required";
      }
      if (!values.appointment_type) {
        errors.appointment_type = "Appointment Type is required";
      }
      if (!values.date) {
        errors.date = "Date is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      if (!values.slotIdArray) {
        snackbar({
          message: "Time slot is required.",
          severity: "error",
        });
      } else {
        if (values.mode_of_payment.toUpperCase() === "CASH") {
          values.payment_id = values.slotIdArray;
        }
        // console.log('values------->', values);
        await apiAdminConfig
          .post(`/appointment/bookAppointment`, values)
          .then((response) => {
            if (response.status === 200) {
              setLoader(false);
              snackbar({
                message: "Appointment booked successfully",
                severity: "success",
              });
              // formik.resetForm();
              // navigate("/master/patients", { replace: true })
            }
          })
          .catch((error) => {
            const { response } = error;
            if (response?.status === 406) {
              if ((response.data.type = "phone")) {
                setErrors({ phoneNo: response.data.message });
              }
              if ((response.data.type = "email")) {
                setErrors({ email: response.data.message });
              }
            }
          });
      }
    },
  });

  // ================ Patient data ===============
  const fetchpatientdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`patient/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          let resp = response.data.data;
          for (const [key, value] of Object.entries(resp)) {
            switch (key) {
              case "patient_id":
                formik.setFieldValue("patient_id", value);
                break;
              case "contact_number":
                formik.setFieldValue("mobile", value);
                break;
              case "dob":
                var years = Math.round(
                  moment
                    .duration(moment(new Date()).diff(moment(value)))
                    .asMonths()
                );

                formik.setFieldValue(
                  `age`,
                  years < 12 ? 0 : Math.round(years / 12)
                );
                break;
              case "patient_name":
                formik.setFieldValue("patientname", value);
                break;
              case "_id":
                formik.setFieldValue("user_id", value);
                break;
              case "gender":
                formik.setFieldValue("gender", value);
                break;
              default:
                break;
            }
          }
        }
      })
      .catch((error) => {
        console.log("error---->", error);
      });
  };
  // ================ Clinic data ===============
  const fetchClinic = async () => {
    await apiAdminConfig
      .post(`appointment/getAllAssignDrClinic`)
      .then((response) => {
        setClinic(response.data.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // ================ Department data ===============
  const getDeprtNames = async (val) => {
    await apiAdminConfig
      .post(`appointment/getDepartmentNamesByClinicId`, { clinicId: val })
      .then((res) => {
        if (res.status === 200) {
          setDept(res.data);
        }
      })
      .catch((err) => console.log("err", err));
  };
  // ================ Doctor by department ===============
  const getDoctorsbydept = async (val) => {
    await apiAdminConfig
      .post(`doctorsOfClinicByDept`, {
        dept: val,
        clinicId: formik.values.clinicId,
      })
      .then((resp) => {
        if (resp.status === 200) {
          setDoctor(resp.data.data);
        }
      })
      .catch((err) => console.log("error--->", err));
  };

  // ================ Time slots ===============
  const gettimeslotdata = async (date) => {
    if (!formik.values.clinicId) {
      snackbar({
        message: "Please Select a Clinic",
        severity: "error",
      });
    } else if (!formik.values.doctor_id) {
      snackbar({
        message: "Please Select a Doctor",
        severity: "error",
      });
    } else {
      formik.setFieldValue("date", date);
      let value = {
        clinicId: formik.values.clinicId,
        doctorId: formik.values.doctor_id,
        date: date,
      };
      await apiAdminConfig
        .post(
          `getRoomSlotDetailsByDrAndClinicId?type=${formik.values.appointment_type}`,
          value
        )
        .then((resp) => {
          setPosts(resp.data.data);
        })
        .catch((err) => console.log("err", err));
    }
  };

  // =============== Apply Coupon ==============
  const applycoupon = async () => {
    if (formik.values.doctor_id) {
      if (couponCode.length === 0) {
        snackbar({
          message: "Please enter a valid code.",
          severity: "error",
        });
      } else {
        let values = {
          code: couponCode,
          patientId: formik.values.user_id,
          doctorId: formik.values.doctor_id,
        };
        await apiAdminConfig
          .post(`applycoupon`, values)
          .then((response) => {
            if (response.status === 200) {
              formik.setFieldValue(
                "consultation_fee",
                response.data.data.final_price
              );
              formik.setFieldValue(
                "final_price",
                response.data.data.final_price
              );
              formik.setFieldValue(
                "original_price",
                response.data.data.original_price
              );
              snackbar({
                message: "Coupon applied successfully",
                severity: "success",
              });
            }
          })
          .catch((err) => {
            console.log("err", err);
          });
      }
    } else {
      snackbar({
        message: "Please select a doctor.",
        severity: "error",
      });
    }
  };

  // =============== Apply Fixed discount ==============
  const applyFixedDiscount = async () => {
    let discountprice = parseInt(fixedDiscount);
    let fee = formik.values.consultation_fee;
    if (discountprice) {
      if (discountprice > fee) {
        snackbar({
          message: "Discount can not be greater than consulting fee.",
          severity: "error",
        });
      } else {
        formik.setFieldValue(
          "consultation_fee",
          fee - discountprice
        );
        formik.setFieldValue(
          "final_price",
          fee - discountprice
        );
        formik.setFieldValue(
          "original_price",
          fee
        );
        snackbar({
          message: "Discount has been applied successfully",
          severity: "success",
        });
      }
    }
  }

  // ============== Remove Coupon ==============
  const removeCoupon = async () => {
    setCouponCode("");
    setFixedDiscount(0);
    formik.setFieldValue("final_price", 0);
    formik.setFieldValue("consultation_fee", formik.values.original_price);
  };

  // ================ Pagination ===============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  // const paginate = (pagenumber) => {
  //   setCurrentPage(pagenumber);
  // };

  useEffect(() => {
    fetchpatientdata(id);
    fetchClinic();
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Book Appointment for Patient</h3>
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
                        controlId="patient_id"
                      >
                        <Form.Label>Patient Id</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          value={formik.values.patient_id}
                          name="patient_id"
                          onChange={formik.handleChange}
                          placeholder="  Name"
                          className="mb-0"
                          isInvalid={
                            formik.touched.patient_id &&
                            formik.errors.patient_id
                          }
                        />
                        {formik.errors.patient_id && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.patient_id}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="patientname"
                      >
                        <Form.Label>Patient Name</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          value={formik.values.patientname}
                          name="patientname"
                          onChange={formik.handleChange}
                          placeholder="  Name"
                          className="mb-0"
                          isInvalid={
                            formik.touched.patientname &&
                            formik.errors.patientname
                          }
                        />
                        {formik.errors.patientname && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.patientname}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="age">
                        <Form.Label>Age</Form.Label>
                        <Form.Control
                          disabled
                          type="text"
                          value={formik.values.age}
                          name="age"
                          onChange={formik.handleChange}
                          placeholder="  Name"
                          className="mb-0"
                          isInvalid={formik.touched.age && formik.errors.age}
                        />
                        {formik.errors.age && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.age}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="mobile"
                      >
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          disabled
                          type="tel"
                          maxLength="10"
                          value={formik.values.mobile}
                          name="mobile"
                          onChange={formik.handleChange}
                          placeholder="Enter Number"
                          className="mb-0"
                          isInvalid={
                            formik.touched.mobile && formik.errors.mobile
                          }
                        />
                        {formik.errors.mobile && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.mobile}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="clinicId"
                      >
                        <Form.Label>Clinic</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.clinicId}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              let val = clinic.find(
                                (el) => el._id === e.target.value
                              );
                              formik.setFieldValue("clinicId", val._id);
                              formik.setFieldValue(
                                "clinicname",
                                val.clinicName
                              );
                              getDeprtNames(val._id);
                            }
                          }}
                          isInvalid={
                            formik.touched.clinicId && formik.errors.clinicId
                          }
                        >
                          <option value="0">Choose a clinic</option>
                          {clinic.map((el, id) => {
                            return (
                              <option key={id} value={el._id}>
                                {el.clinicName}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.clinicId && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.clinicId}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="departmentname"
                      >
                        <Form.Label>Specialization</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.departmentname}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue(
                                "departmentname",
                                e.target.value
                              );
                              getDoctorsbydept(e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.departmentname &&
                            formik.errors.departmentname
                          }
                        >
                          <option value="0">Choose a Specialization</option>
                          {dept.map((el, id) => {
                            return (
                              <option key={id} value={el}>
                                {el}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.departmentname && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.departmentname}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="doctor_id"
                      >
                        <Form.Label>Doctor</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.doctor_id}
                          isInvalid={
                            formik.touched.doctor_id && formik.errors.doctor_id
                          }
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              let val = doctor.find(
                                (el) => el._id === e.target.value
                              );
                              formik.setFieldValue(
                                "doctorname",
                                val.doctorName
                              );
                              formik.setFieldValue("doctor_id", val._id);
                              formik.setFieldValue(
                                "consultation_fee",
                                val.consultationfee
                              );
                            }
                          }}
                        >
                          <option value="0">Choose a Doctor</option>
                          {doctor.map((el, id) => {
                            return (
                              <option key={id} value={el._id}>
                                {el.doctorName}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.doctor_id && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.doctor_id}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="consultation_fee"
                      >
                        <Form.Label>Consultation Fee (in ₹)</Form.Label>
                        <Form.Control
                          disabled
                          type="tel"
                          maxLength="10"
                          value={formik.values.consultation_fee}
                          name="consultation_fee"
                          onChange={formik.handleChange}
                          className="mb-0"
                          isInvalid={
                            formik.touched.consultation_fee &&
                            formik.errors.consultation_fee
                          }
                        />
                        {formik.errors.consultation_fee && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.consultation_fee}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="appointment_type"
                      >
                        <Form.Label>Appointment Type</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.appointment_type}
                          isInvalid={
                            formik.touched.appointment_type &&
                            formik.errors.appointment_type
                          }
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue(
                                "slotIdArray",
                                ""
                              );
                              formik.setFieldValue(
                                "appointment_type",
                                e.target.value
                              );
                            }
                          }}
                        >
                          <option value="0">Choose Appointment Type</option>
                          <option value="Offline">In Clinic</option>
                          <option value="Online">Online</option>
                        </Form.Select>
                        {formik.errors.appointment_type && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.appointment_type}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="problem"
                      >
                        <Form.Label>Problem</Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          rows={2}
                          value={formik.values.problem}
                          name="problem"
                          onChange={formik.handleChange}
                          placeholder="Describe Your Problem"
                          className="mb-0"
                          isInvalid={
                            formik.touched.problem && formik.errors.problem
                          }
                        />
                        {formik.errors.problem && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.problem}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="dob">
                        <Form.Label>Date</Form.Label>
                        <DateSelect
                          place="Select Date"
                          select={(value) => {
                            gettimeslotdata(
                              moment(value)
                                .format("YYYY-MM-DDT00:00:00")
                                .toString()
                            );
                          }}
                          type={
                            formik.touched.date && formik.errors.date
                              ? "error"
                              : "success"
                          }
                          value={formik.values.date}
                        />
                        {formik.errors.date && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.date}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="mode_of_payment"
                      >
                        <Form.Label>Mode of Payment</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.mode_of_payment}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue(
                                "mode_of_payment",
                                e.target.value
                              );
                            }
                          }}
                          isInvalid={
                            formik.touched.mode_of_payment &&
                            formik.errors.mode_of_payment
                          }
                        >
                          <option value="0">Choose an Option</option>
                          {/* <option value="Online">Online</option> */}
                          <option value="Cash">Cash</option>
                        </Form.Select>
                        {formik.errors.mode_of_payment && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.mode_of_payment}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="mode_of_payment"
                      >
                        <Form.Label>Discount</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              if (e.target.value === "1") {
                                setcouponStyle("none");
                                setfixedprice("block");
                              } else {
                                setfixedprice("none");
                                setcouponStyle("block");
                              }
                            } else {
                              setcouponStyle("none");
                              setfixedprice("none");
                              // setFixedDiscount(0);
                              // setCouponCode("");
                              formik.setFieldValue("consultation_fee", formik.values.original_price);
                            }
                          }}
                        >
                          <option value="0">Choose an Option</option>
                          <option value="1">Fixed Price </option>
                          <option value="2">Apply Coupon</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col style={{ display: fixedprice }} xs={6} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="patientname"
                      >
                        <Form.Label>Fixed Price Discount</Form.Label>
                        <Row>
                          <Col xs={8}>
                            <InputGroup className="mb-3">
                              <Form.Control
                                type="number"
                                maxlength={4}
                                value={fixedDiscount}
                                name="patientname"
                                onChange={(e) => {
                                  e.target.value = Math.max(0, parseInt(e.target.value))
                                    .toString()
                                    .slice(0, 4);
                                  setFixedDiscount(e.target.value);
                                }}
                                placeholder="i.e.: 100, 200"
                                className="mb-0"
                              />
                            </InputGroup>
                          </Col>
                          <Col xs={4}>
                            <Button
                              style={{
                                background: formik.values.final_price
                                  ? "red"
                                  : "#76B757",
                              }}
                              variant="contained"
                              className="rounded"
                              onClick={
                                formik.values.final_price
                                  ? removeCoupon
                                  : applyFixedDiscount
                              }
                            >
                              {formik.values.final_price ? "Remove" : "Apply"}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>{" "}
                    </Col>
                    <Col style={{ display: couponStyle }} xs={6} md={6} lg={6}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="patientname"
                      >
                        <Form.Label>Apply Coupon</Form.Label>
                        <Row>
                          <Col xs={8}>
                            <InputGroup className="mb-3">
                              <Form.Control
                                type="text"
                                maxLength="6"
                                value={couponCode}
                                name="patientname"
                                onChange={(e) => {
                                  setCouponCode(e.target.value.toUpperCase());
                                }}
                                placeholder="ABC234"
                                className="mb-0"
                              />
                            </InputGroup>
                          </Col>
                          <Col xs={4}>
                            <Button
                              style={{
                                background: formik.values.final_price
                                  ? "red"
                                  : "#76B757",
                              }}
                              variant="contained"
                              className="rounded"
                              onClick={
                                formik.values.final_price
                                  ? removeCoupon
                                  : applycoupon
                              }
                            >
                              {formik.values.final_price ? "Remove" : "Apply"}
                            </Button>
                          </Col>
                        </Row>
                      </Form.Group>{" "}
                    </Col>
                    <Col
                      xs={12}
                      md={12}
                      lg={12}
                      style={{
                        display: `${currentPost.length > 0 ? "block" : "none"}`,
                      }}
                    >
                      <Card
                        style={{
                          width: "100%",
                        }}
                      >
                        <Card.Body
                          className="mt-2"
                          style={{ minHeight: "300px" }}
                        >
                          <Table size="md" responsive>
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
                                            ? {
                                              minWidth: "15vh",
                                              textAlign: "center",
                                            }
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
                                    <td>
                                      <Form.Check
                                        type="radio"
                                        active
                                        onChange={(e) => {
                                          formik.setFieldValue(
                                            "slotIdArray",
                                            e.target.value
                                          );
                                        }}
                                        checked={el._id === formik.values.slotIdArray ? true : false}
                                        id={el._id}
                                        value={el._id}
                                      />
                                    </td>
                                    <td>{el?.day}</td>
                                    <td>{el?.date}</td>
                                    <td>{el?.timeSlotData?.start_time}</td>
                                    <td>{el?.timeSlotData?.end_time}</td>
                                    <td>{el?.roomData?.floor}</td>
                                    <td>{el?.roomData?.roomNumber}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <div style={{ textAlign: "right" }}>
                    <Button
                      style={{ background: "#76B757" }}
                      variant="contained"
                      className="rounded"
                      type="submit"
                    >
                      Book Appointment
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: "#76B757",
                        color: "#76B757",
                      }}
                      variant="outlined"
                      className="rounded"
                      onClick={() => {
                        fetchpatientdata(id);
                        fetchClinic();
                        formik.resetForm();
                        setcouponStyle("none");
                        setfixedprice("none");
                        setPosts([]);
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

class BookAppointment extends Component {
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

export default BookAppointment;

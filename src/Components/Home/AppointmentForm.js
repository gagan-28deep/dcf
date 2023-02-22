import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import HTTPrequest from "../../Config/HTTP_request";
import CustomSnackbar from "../notify/Snackbar";
import { apiAdminConfig } from "../../utils/api";
import FrontOTP from "../auth/otp";
import { OTPBox } from "../form";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useSnackbar } from "../../provider/snackbar";
function AppointmentForm({ xs, sm, md, lg }) {
  const [city, setCity] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false)
  const snackbar = useSnackbar();
  const [posts, setposts] = useState({
    name: "",
    contactNumber: "",
    specialization: "",
    clinic: "",
  });
  const [snackData, setsnackdata] = useState({
    open: false,
    message: "",
    status: "",
  });

  const Appointmentformik = useFormik({
    initialValues: {
      name: "",
      contactNumber: "",
      specialization: "",
      clinic: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      if (!values.contactNumber) {
        errors.contactNumber = "Contact is required";
      }
      if (!values.specialization) {
        errors.specialization = "Specialization is required";
      }
      if (!values.clinic) {
        errors.clinic = "Clinic is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let data = await apiAdminConfig.post('creatconsultation', values);
      console.log("data---->", data);
      if (data) {
        console.log('data.data.status', data.data.status)
        if (data.data.status === 200) {
          snackbar({ title: 'Success', message: data.data.message, severity: 'success' });
          setShow(true);
          // setData((prevState) => ({
          //   ...prevState,
          //   name: "",
          //   contactNumber: "",
          //   specialization: "",
          //   clinic: "",
          // }));
        } else {
          snackbar({ title: 'Error', message: `${data?.data?.message}. Field can't be empty.`, severity: 'error' });
        }
      } else if (data && data.data.status === 401) {
        console.log("unauthorized user...");
      }
    },
    enableReinitialize: true,
  });

  const formik = useFormik({
    initialValues: {
      contactNumber: posts.contactNumber,
      otp: ""
    },
    validate: (values) => {
      const errors = {};
      if (!values.otp) {
        errors.otp = "OTP is required";
      } else if (!/^\d+$/.test(values.otp)) {
        errors.otp = "Please enter otp number";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      await apiAdminConfig.post('consultatingotpmatch', values).then((response) => {
        console.log('response?.data?.success', response)
        if (response && response?.data?.status === 200) {
          snackbar({ title: 'Success', message: response?.data?.message, severity: 'success' });
          setShow(false);
          Appointmentformik.resetForm();
          formik.resetForm();
        } else {
          snackbar({ title: 'Error', message: response?.data?.message, severity: 'error' });
        }
      }).catch((error) => {
        const { response } = error;
        if (response.status === 406) {
          // eslint-disable-next-line no-unused-vars
          for (const [key, value] of Object.entries(values)) {
            if (response.data.message[key]) {
              setErrors({ [key]: response.data.message[key][0] });
            }
          }
        }
      });
    },
    enableReinitialize: true,
  });

  const fetchcinicdata = async () => {
    let clinicapi = {
      path: "asset",
      method: "GET",
    };
    let data = await HTTPrequest(clinicapi);
    if (data && data.data.status === 200) {
      setCity(data.data.data);
    } else if (data && data.data.status === 401) {
      console.log("unauthorized user...");
    }
  };

  const fetchspecialtydata = async () => {
    const specialtyapi = {
      path: "specialization",
      method: "GET",
    };
    let data = await HTTPrequest(specialtyapi);
    if (data && data.data.status === 200) {
      setSpecialization(data.data.data);
    } else if (data && data.data.status === 401) {
      console.log("unauthorized user...");
    }
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setposts({ ...posts, [e.target.name]: e.target.value });
  };

  const fetchapi = async (value) => {
    const api = {
      path: "creatconsultation",
      method: "POST",
      body: { ...value },
    };
    console.log("value1234", value);
    let data = await apiAdminConfig.post('creatconsultation', { ...value });
    console.log("data---->", data);
    if (data) {
      console.log('data.data.status', data.data.status)
      if (data.data.status === 200) {
        snackbar({ title: 'Success', message: data.data.message, severity: 'success' });
        setShow(true);
        // setData((prevState) => ({
        //   ...prevState,
        //   name: "",
        //   contactNumber: "",
        //   specialization: "",
        //   clinic: "",
        // }));
      } else {
        snackbar({ title: 'Error', message: `${data?.data?.message}. Field can't be empty.`, severity: 'error' });
      }
    } else if (data && data.data.status === 401) {
      console.log("unauthorized user...");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    fetchapi(posts);
  };

  useEffect(() => {
    fetchcinicdata();
    fetchspecialtydata();
  }, []);

  console.log('showshow', show)

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
      {!show ? <Form onSubmit={Appointmentformik.handleSubmit}>
        <Row className="mb-3">
          <Col xs={xs} md={md} lg={lg} sm={sm}>
            <Form.Group className="mt-2" controlId="name" style={{ textAlign: "left" }}>
              <Form.Label>Patient's Name *</Form.Label>
              <Form.Control
                type="text"
                value={Appointmentformik.values.name}
                name="name"
                onChange={Appointmentformik.handleChange}
                isInvalid={Appointmentformik.touched.name && Appointmentformik.errors.name}
                placeholder="Enter Name"
              />
              {Appointmentformik.errors.name && <Form.Control.Feedback type="invalid">
                {Appointmentformik.errors.name}
              </Form.Control.Feedback>}
            </Form.Group>
          </Col>
          <Col xs={xs} md={md} lg={lg} sm={sm}>
            <Form.Group className="mt-2" style={{ textAlign: "left" }} controlId="contactNumber">
              <Form.Label>Patient's Mobile Number *</Form.Label>
              <Form.Control
                type="tel"
                name="contactNumber"
                maxLength={10}
                value={Appointmentformik.values.contactNumber}
                onChange={(e) => {
                  if (e) {
                    if (/^\d*$/.test(e.target.value)) {
                      Appointmentformik.setFieldValue("contactNumber", e.target.value)
                    }
                  } else {
                    Appointmentformik.setFieldValue("contactNumber", "")
                  }
                }}
                isInvalid={Appointmentformik.touched.contactNumber && Appointmentformik.errors.contactNumber}
                placeholder="Enter Mobile Number"
              />
              {Appointmentformik.errors.contactNumber && <Form.Control.Feedback type="invalid">
                {Appointmentformik.errors.contactNumber}
              </Form.Control.Feedback>}
            </Form.Group>
          </Col>
          <Col xs={xs} md={md} lg={lg} sm={sm}>
            <Form.Group className="mt-2" style={{ textAlign: "left" }} controlId="clinic">
              <Form.Label>Select Clinic *</Form.Label>
              <Form.Select
                name="clinic"
                value={Appointmentformik.values.clinic}
                onChange={Appointmentformik.handleChange}
                isInvalid={Appointmentformik.touched.clinic && Appointmentformik.errors.clinic}
              >
                <option value={0}>Not Selected</option>
                {city.map((el, id) => {
                  return (
                    <option key={id} value={el._id}>
                      {el.clinicName}, {el.city}
                    </option>
                  );
                })}
              </Form.Select>
              {Appointmentformik.errors.clinic && <Form.Control.Feedback type="invalid">
                {Appointmentformik.errors.clinic}
              </Form.Control.Feedback>}
            </Form.Group>
          </Col>
          <Col xs={xs} md={md} lg={lg} sm={sm}>
            <Form.Group className="mt-2"
              style={{ textAlign: "left" }}
              controlId="specialization"
            >
              <Form.Label>Select Specialization *</Form.Label>
              <Form.Select
                name="specialization"
                value={Appointmentformik.values.specialization}
                onChange={Appointmentformik.handleChange}
                isInvalid={Appointmentformik.touched.specialization && Appointmentformik.errors.specialization}
              >
                <option value={0}>Not Selected</option>
                {specialization.map((el, id) => {
                  return (
                    <option key={id} value={el._id}>
                      {el.specialization}
                    </option>
                  );
                })}
              </Form.Select>
              {Appointmentformik.errors.specialization && <Form.Control.Feedback type="invalid">
                {Appointmentformik.errors.specialization}
              </Form.Control.Feedback>}
            </Form.Group>
          </Col>
        </Row>
        <div style={{ textAlign: "left" }}>
          <Button
            style={{ background: "#76B757", color: '#fff' }}
            variant="contained"
            className="rounded-pill"
            type="submit"
          >
            BOOK CONSULTATION
          </Button>{" "}
        </div>
      </Form>
        :
        <Box
          component="form"
          noValidate
          onSubmit={formik.handleSubmit}
          sx={{ mt: 1, width: '100%' }}
        >
          <OTPBox
            value={formik.values.otp}
            onChange={(e) => {
              formik.setFieldValue('otp', e)
            }}
            numInputs={4}
            isInputNum={true}
            hasErrored={formik.touched.otp && formik.errors.otp}
            shouldAutoFocus={true}
            focusStyle='otpfocus'
            errorStyle='otperror'
            inputStyle='otpinput'
            containerStyle='containerotp'
          />
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Button
              type="submit"
              fullWidth={false}
              variant="contained"
              style={{ color: "#fff", fontSize: '18px', fontWeight: 700, backgroundColor: "#76B757", borderRadius: '8px', padding: 10 }}
              sx={{ mt: 3, mb: 2, bordeRadius: '8px', width: '350px', textTransform: 'capitalize' }}
            >
              Verify OTP
            </Button>
          </Box>
        </Box>}
      <CustomSnackbar value={snackData} />
    </>
  );
}

export default AppointmentForm;

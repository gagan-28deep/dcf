import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Slide, Typography, Tabs } from "@mui/material";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useState } from "react";
import CustomSnackbar from "../../notify/Snackbar";
import { FileBox, SelectBox, TextBox, ToggleBox } from "../../form";
import HTTPrequest from "../../../Config/HTTP_request";
import { useEffect } from "react";
import { FormTab } from "../style";
import FrontOTP from "../otp";
import DoctorSignUp from "./doctorSignUp";
import PatientSignup from "./patientSignUp";
import { useSnackbar } from "../../../provider/snackbar";

const FrontSignup = (props) => {
  const { onClick, setOtpForm } = props;
  const [value, setValue] = React.useState(1);
  const [otpData, setOtpData] = React.useState({});
  const [show, setShow] = React.useState(false);
  const snackbar = useSnackbar();

  const patientInitialValues = {
    gender: "0",
    dob: "",
    email: "",
    contactNumber: "",
    patientName: "",
    address: "",
    is_admin: false
  };

  const doctorInitialValues = {
    doctorName: "",
    email: "",
    gender: "0",
    departmentName: "0",
    phoneNo: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    about: "",
    consultationfee: "",
    adddoctorannotaion: true,
    is_admin: false,
    image: "",
    experience: "",
  };



  const formik = useFormik({
    initialValues: value === 1 ? doctorInitialValues : patientInitialValues,
    validate: (values) => {
      const errors = {};
      if (value == 1) {
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.phoneNo) {
          errors.phoneNo = "Phone is required";
        } else if (!/^\d+$/.test(values.phoneNo)) {
          errors.phoneNo = "Please enter valid number";
        }
        if (!values.pincode) {
          errors.pincode = "Pincode is required";
        } else if (!/^\d+$/.test(values.pincode)) {
          errors.pincode = "Please enter valid pincode";
        }
      } else {
        if (!values.email) {
          errors.email = "Email is required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if (!values.contactNumber) {
          errors.contactNumber = "Phone is required";
        } else if (!/^\d+$/.test(values.contactNumber)) {
          errors.contactNumber = "Please enter valid number";
        }
        if (!values.patientName) {
          errors.patientName = "Patient name is required";
        }
        if (!values.gender || values.gender == 0) {
          errors.gender = "Gender is required";
        }
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url = "";
      switch (value) {
        case 1:
          url = "addDoctor";
          break;
        case 2:
          url = "addPatient";
          break;
        default:
          url = "addDoctor";
          break;
      }
      await apiAdminConfig
        .post(url, values)
        .then((response) => {
          if (response && response?.data?.success === true) {
            setOtpData(response.data);
            setShow(true);
            snackbar({ title: 'Success', message: response?.data?.message, severity: 'success' });
          } else {
            snackbar({ title: 'Error', message: response?.data?.message, severity: 'error' });
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response.status === 406) {
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
    enableReinitialize: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setShow(true)
  };

  console.log('valuess', formik)

  const theme = createTheme({
    // direction: dir,F
    palette: {
      secondary: {
        main: "#76B757",
      },
    },
    overrides: {
      MuiFormControl: {
        root: {
          marginTop: "0.5rem",
          marginBottom: "0.5rem",
        },
      },
      MuiDialog: {
        root: {
          alignItems: "flex-end",
        },
        container: {
          margin: 0,
          maxWidth: "100%",
          width: "100%",
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {!show ? (
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="dark"
            indicatorColor="secondary"
            sx={{ mb: 2 }}
          >
            <FormTab value={1} label="Doctor Sign Up" />
            <FormTab value={2} label="Patient Sign Up" />
          </Tabs>
          {value === 1 ? (
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
              <Box>
                <DoctorSignUp
                  onClick={onClick}
                  formik={formik}
                />
              </Box>
            </Slide>
          ) : (
            <Slide direction="right" in={true} mountOnEnter unmountOnExit>
              <Box>
                <PatientSignup formik={formik} onClick={onClick} />
              </Box>
            </Slide>
          )}
        </Box>
      ) : (
        <FrontOTP
          setOtpForm={setOtpForm}
          OtpMatchurl="SignupotpMatch"
          show={show}
          type={value === 1 ? "doctor" : "patient"}
          getOtpData={otpData}
        />
      )}
    </ThemeProvider>
  );
};

export default FrontSignup;

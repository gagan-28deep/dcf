import * as React from "react";
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Slide, Tabs, TextField, Typography } from "@mui/material";
import { FormTab } from "../style";
import FrontOTP from "../otp";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import CustomSnackbar from "../../notify/Snackbar";
import { TextBox } from "../../form";
import { useSnackbar } from "../../../provider/snackbar";

const FrontSignin = (props) => {
  const { onClick, setOtpForm, TabChange } = props;
  const [value, setValue] = React.useState(TabChange ? TabChange : 1);
  const [otpData, setOtpData] = React.useState({})
  const [show, setShow] = React.useState(false);
  // const [show, setShow] = React.useState(true);
  const snackbar = useSnackbar();

  const formik = useFormik({
    initialValues: {
      mobilenumber: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.mobilenumber) {
        errors.mobilenumber = "Phone is required";
      } else if (!/^\d+$/.test(values.mobilenumber)) {
        errors.mobilenumber = "Please enter valid number";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      let url = '';
      switch (value) {
        case 1:
          url = 'signInDoctorMobile';
          break;
        case 2:
          url = 'signInPatientPhone';
          break;
        default:
          url = 'signInDoctorMobile';
          break;
      }

      await apiAdminConfig.post(url, values).then((response) => {
        if (response && response?.data?.success === true) {
          setShow(true)
          setOtpData(response.data)
          snackbar({ title: 'Success', message: response?.data?.message, severity: 'success' });
        } else {
          snackbar({ title: 'Error', message: response?.data?.message, severity: 'error' });
        }
      }).catch((error) => {
        const { response } = error;
        if (response?.status === 406) {
          console.log("response.data", response.data);
          for (const [key, value] of Object.entries(values)) {
            if ((response.data.type = "phone")) {
              setErrors({ mobilenumber: response.data.message });
            }
          }
        }
      });
    },
  });

  const theme = createTheme({
    // direction: dir,F
    palette: {
      secondary: {
        main: '#76B757'
      }
    },
    overrides: {
      MuiFormControl: {
        root: {
          marginTop: "0.5rem",
          marginBottom: "0.5rem"
        }
      },
      MuiDialog: {
        root: {
          alignItems: "flex-end"
        },
        container: {
          margin: 0,
          maxWidth: "100%",
          width: "100%"
        }
      }
    }
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setShow(true)
  };

  return (
    <ThemeProvider theme={theme}>
      {!show ?
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="dark"
            indicatorColor="secondary"
          >
            <FormTab value={1} label="Doctor Sign in" />
            <FormTab value={2} label="Patient Sign in" />
          </Tabs>
          <Slide direction="right" in={value} mountOnEnter unmountOnExit>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextBox
                margin={'normal'}
                fullWidth
                type="tel"
                label="Phone Number"
                name="mobilenumber"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.mobilenumber}
                error={formik.touched.mobilenumber && formik.errors.mobilenumber}
                helperText={formik.touched.mobilenumber && formik.errors.mobilenumber}
              />
              {/* <Typography sx={{ textAlign: 'right' }} variant="body2">
                Forgot password?
              </Typography> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ color: "#fff", fontSize: '18px', fontWeight: 700, backgroundColor: "#76B757", borderRadius: '8px', padding: 10 }}
                sx={{ mt: 0, mb: 2, bordeRadius: '8px' }}
              >
                Sign In
              </Button>
              <Typography onClick={onClick} sx={{ textAlign: 'center', color: '#858F94' }} variant="body2">
                Don’t have an account? <span style={{ color: '#131416', fontWeight: 600, cursor: 'pointer' }}>Sign up</span>
              </Typography>
            </Box>
          </Slide>
        </Box>
        :
        <FrontOTP mobilenumber={formik.values.mobilenumber} setOtpForm={setOtpForm} OtpMatchurl="SigninotpMatch" show={show} type={value == 1 ? 'doctor' : 'patient'} getOtpData={otpData} />}
    </ThemeProvider>
  );
}

export default FrontSignin;
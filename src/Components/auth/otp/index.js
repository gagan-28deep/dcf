import * as React from "react";
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Slide, Typography } from "@mui/material";
import './front.css'
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { OTPBox } from "../../form";
import { setUserCookie } from "../../../utils/cookie";
import { useSnackbar } from "../../../provider/snackbar";
import { useUserAuth } from "../../../provider/auth/UserAuthContext";


const FrontOTP = (props) => {
    const { show, getOtpData, type, OtpMatchurl, setOtpForm, mobilenumber } = props;
    const snackbar = useSnackbar();
    const { setHandleLogin } = useUserAuth();
    const PatientInitialValues = {
        patientid: getOtpData?.data?.patient_id,
        phone: getOtpData?.data?.contact_number,
        type: type,
        otp: '',
    }
    const DoctorInitialValues = {
        doctorid: getOtpData?.data?.doctor_id,
        phone: getOtpData?.data?.contactNumber,
        type: type,
        otp: '',
    }
    const formik = useFormik({
        initialValues: type == 'doctor' ? DoctorInitialValues : PatientInitialValues,
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
            await apiAdminConfig.post(OtpMatchurl, values).then((response) => {
                if (response && response?.data?.success === true) {
                    setHandleLogin(true);
                    setOtpForm(false)
                    const userData = {
                        userData: response?.data?.data,
                        token: response?.data?.data?.auth_token
                    };

                    setUserCookie(userData);

                    snackbar({ title: 'Success', message: response?.data?.message, severity: 'success' });
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

    const theme = createTheme({
        // direction: dir,
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

    let phone = mobilenumber;
    let prefixLength = 1;
    let suffixLength = 2;

    let prefix = phone.substring(0, prefixLength);
    let suffix = phone.slice(-suffixLength);
    let nbStars = phone.length - (prefixLength + suffixLength);
    let formattedPhone = prefix + "*".repeat(nbStars) + suffix;

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Typography variant="h5" sx={{ marginBottom: 1, fontWeight: 600, fontSize: '24px', color: '#131416' }} gutterBottom>
                    Enter OTP
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 2, fontWeight: 400, fontSize: '16px', color: '#858F94' }} gutterBottom>
                    We sent verification code to +91 {formattedPhone}
                </Typography>
                <Slide direction="right" in={show} mountOnEnter unmountOnExit>
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            style={{ color: "#fff", fontSize: '18px', fontWeight: 700, backgroundColor: "#76B757", borderRadius: '8px', padding: 10 }}
                            sx={{ mt: 3, mb: 2, bordeRadius: '8px' }}
                        >
                            Verify
                        </Button>
                    </Box>
                </Slide>
            </Box>
        </ThemeProvider>
    );
}

export default FrontOTP;
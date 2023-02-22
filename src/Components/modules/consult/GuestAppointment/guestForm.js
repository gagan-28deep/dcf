import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, Slide, Stack } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { Card } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useUserAuth } from '../../../../provider/auth/UserAuthContext';
import { useSnackbar } from '../../../../provider/snackbar';
import { apiAdminConfig } from '../../../../utils/api';
import { TextBox } from '../../../form';

const GuestAppointmentForm = ({
    type,
    AppointmentClinic,
    AppointmentFormik,
    AppointmentAll, setChecked }) => {
    const snackbar = useSnackbar();
    const location = useLocation();
    const { user, setSigninOpen, signinOpen, setTabChange } = useUserAuth();


    const handleOpen = () => {
        setSigninOpen(!signinOpen)
        setTabChange(2)
    }


    console.log('user?.token', user)


    const SelfInitialValue = {
        age: user?.userData?.age,
        booked_as: "user",
        consultation_fee: AppointmentAll?.consultationfee,
        clinic_id: AppointmentFormik?.clinic_Id?._id,
        departmentname: AppointmentAll?.specialization,
        doctorname: AppointmentAll?.doctorName,
        date: AppointmentFormik?.date,
        doctor_id: AppointmentAll?._id,
        slotIdArray: AppointmentClinic?.timeSlotData?._id,
        gender: user?.userData?.gender,
        mode_of_payment: "Cash",
        appointment_type: AppointmentFormik?.type,
        problem: "",
        patient_id: user?.userData?.patient_id,
        patientname: user?.userData?.patient_name,
        payment_status: false,
        payment_id: AppointmentClinic?.timeSlotData?._id,
        user_id: user?.userData?._id,
        mobile: AppointmentFormik?.clinic_Id?.clinicContactNumber,
        is_report: false
    }
    const GuestInitialValue = {
        age: "",
        booked_as: "user",
        consultation_fee: AppointmentAll?.consultationfee,
        clinic_id: AppointmentFormik?.clinic_Id?._id,
        departmentname: AppointmentAll?.specialization,
        doctorname: AppointmentAll?.doctorName,
        date: AppointmentFormik?.date,
        doctor_id: AppointmentAll?._id,
        slotIdArray: AppointmentClinic?.timeSlotData?._id,
        gender: "",
        mode_of_payment: "Cash",
        appointment_type: AppointmentFormik?.type,
        problem: "",
        patient_id: user?.userData?.patient_id,
        patientname: "",
        payment_status: false,
        payment_id: AppointmentClinic?.timeSlotData?._id,
        user_id: user?.userData?._id,
        mobile: "",
        is_report: false
    }
    const formik = useFormik({
        initialValues: type == 'self' ? SelfInitialValue : GuestInitialValue,
        validate: (values) => {
            const errors = {};

            // if (type == 'guest' && !values.mobile) {
            //     errors.mobile = "Phone is required";
            // } else if (!/^\d+$/.test(values.mobile)) {
            //     errors.mobile = "Please enter valid number";
            // }

            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            let url = "appointment/bookAppointment";
            await apiAdminConfig
                .post(url, values)
                .then((response) => {
                    if (response && response?.data?.success === true) {
                        snackbar({ title: 'Success', message: response?.data?.message, severity: 'success' });
                        setChecked({
                            open: false,
                            index: null
                        })
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

    return (
        <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
        >
            {type == 'guest' &&
                <Box>
                    <Slide direction="up" in={type == 'guest' ? true : false} mountOnEnter unmountOnExit>
                        <Grid container spacing={3}>
                            <Grid item lg={6}>
                                <TextBox
                                    fullWidth
                                    label="Patient Name"
                                    name="patientname"
                                    color="success"
                                    onChange={formik.handleChange}
                                    value={formik.values.patientname}
                                    error={formik.touched.patientname && formik.errors.patientname}
                                    helperText={
                                        formik.touched.patientname && formik.errors.patientname
                                    }
                                />
                            </Grid>
                            <Grid item lg={6}>
                                <TextBox
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    color="success"
                                    onChange={formik.handleChange}
                                    value={formik.values.age}
                                    error={formik.touched.age && formik.errors.age}
                                    helperText={
                                        formik.touched.age && formik.errors.age
                                    }
                                />
                            </Grid>

                            <Grid item lg={6}>
                                <TextBox
                                    fullWidth
                                    label="Details"
                                    name="problem"
                                    color="success"
                                    onChange={formik.handleChange}
                                    value={formik.values.problem}
                                    error={
                                        formik.touched.problem &&
                                        formik.errors.problem
                                    }
                                    helperText={
                                        formik.touched.problem &&
                                        formik.errors.problem
                                    }
                                />
                            </Grid>
                            <Grid item lg={6}>
                                <TextBox
                                    fullWidth
                                    label="Contact Number"
                                    name="mobile"
                                    disabled={false}
                                    color="success"
                                    onChange={formik.handleChange}
                                    value={formik.values.mobile}
                                    error={formik.touched.mobile && formik.errors.mobile}
                                    helperText={
                                        formik.touched.mobile && formik.errors.mobile
                                    }
                                />
                            </Grid>

                            <Grid item lg={6}>
                                <FormControl>
                                    <FormLabel
                                        color='secondary'
                                        id="demo-controlled-radio-buttons-group">Gender</FormLabel>
                                    <RadioGroup

                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controllFed-radio-buttons-group"
                                        value={formik.values.gender}
                                        onChange={(e) => {
                                            if (e) {
                                                formik.setFieldValue('gender', e.target.value)
                                            }
                                        }}
                                    >
                                        <Stack direction={'row'}>
                                            <FormControlLabel value="female" control={<Radio color='secondary' />} label="Female" />
                                            <FormControlLabel value="male" control={<Radio color='secondary' />} label="Male" />
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Slide>
                </Box>
            }
            {/* {!user && !user?.token &&
                <Card.Text style={{ color: '#d63384', fontSize: '14px' }}>
                    Please Log in first for Book Appointment
                </Card.Text>} */}
            {!user && !user?.token ? <Button
                fullWidth
                onClick={handleOpen}
                variant="contained"
                // disabled={user && user?.token ? false : true}
                style={{
                    color: "#fff",
                    fontSize: "16px",
                    fontWeight: 700,
                    backgroundColor: "#76B757",
                    borderRadius: "8px",
                    padding: 10,
                    marginTop: type == 'self' ? 4 : 0
                }}
                sx={{ mt: 0, mb: 0, bordeRadius: "8px" }}
            >
                Book Appointment
            </Button>
                :
                <Button
                    type={"submit"}
                    fullWidth
                    variant="contained"
                    // disabled={user && user?.token ? false : true}
                    style={{
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: 700,
                        backgroundColor: "#76B757",
                        borderRadius: "8px",
                        padding: 10,
                        marginTop: type == 'self' ? 4 : 0
                    }}
                    sx={{ mt: 0, mb: 0, bordeRadius: "8px" }}
                >
                    Book Appointment
                </Button>}
        </Box >
    )
}

export default GuestAppointmentForm;
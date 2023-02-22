import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { SelectBox, TextBox } from '../../form';

const PatientSignup = (props) => {
    const { formik, onClick } = props;
    const GenderData = [
        {
            value: "0",
            label: "Select Gender",
        },
        {
            value: "male",
            label: "Male",
        },
        {
            value: "female",
            label: "Female",
        },
    ];

    return (
        <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
        >
            <TextBox
                fullWidth
                label="Patient Name"
                name="patientName"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.patientName}
                error={formik.touched.patientName && formik.errors.patientName}
                helperText={formik.touched.patientName && formik.errors.patientName}
            />

            <SelectBox
                fullWidth
                label="Gender"
                value={formik.values.gender}
                onChange={(e) =>
                    formik.setFieldValue("gender", e.target.value)
                }
                options={GenderData}
                color="success"
                name="gender"
                error={formik.touched.gender && formik.errors.gender}
                helperText={formik.touched.gender && formik.errors.gender}
            />
            <TextBox
                fullWidth
                label="Date of Birth"
                name="dob"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.dob}
                error={formik.touched.dob && formik.errors.dob}
                helperText={formik.touched.dob && formik.errors.dob}
                type={"date"}
                InputLabelProps={{ shrink: true }}
            />
            <TextBox
                fullWidth
                label="Email"
                name="email"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                type={"email"}
            />
            <TextBox
                fullWidth
                label="Phone Number"
                name="contactNumber"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.contactNumber}
                error={formik.touched.contactNumber && formik.errors.contactNumber}
                helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                type={"tel"}
            />
            <TextBox
                fullWidth
                label="Address"
                name="address"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.address}
                error={formik.touched.address && formik.errors.address}
                helperText={formik.touched.address && formik.errors.address}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                    color: "#fff",
                    fontSize: "18px",
                    fontWeight: 700,
                    backgroundColor: "#76B757",
                    borderRadius: "8px",
                    padding: 10,
                }}
                sx={{ mt: 3, mb: 2, bordeRadius: "8px" }}
            >
                Submit
            </Button>
            <Typography
                onClick={onClick}
                sx={{ textAlign: "center", color: "#858F94" }}
                variant="body2"
            >
                Already a member ?{" "}
                <span
                    style={{
                        color: "#131416",
                        fontWeight: 600,
                        cursor: "pointer",
                    }}
                >
                    Sign in
                </span>
            </Typography>
        </Box>
    )
}

export default PatientSignup
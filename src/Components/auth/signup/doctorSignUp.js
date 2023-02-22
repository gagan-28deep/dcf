import { Box, Button, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import HTTPrequest from '../../../Config/HTTP_request';
import { FileBox, SelectBox, TextBox, ToggleBox } from '../../form';

const DoctorSignUp = (props) => {
    const { formik, onClick } = props;
    const [statelist, setStatelist] = useState([]);
    const [citylist, setCitylist] = useState([]);
    // get state list
    const fetchState = async () => {
        const api = {
            path: "getState",
            method: "POST",
        };
        let response = await HTTPrequest(api);
        if (response.response) {
            console.log("response.response", response.response);
        } else {
            if (response.status === 200) {
                let data = response.data.data;
                let arr = [];
                for (let item of data) {
                    arr.push({ value: item, label: item });
                }
                setStatelist(arr);
            }
        }
    };

    const fetchCity = async (value) => {
        const api = {
            path: "getCity",
            method: "POST",
            body: { state: value },
        };
        let response = await HTTPrequest(api);
        console.log("response", response);
        if (response.response) {
            console.log("response.response", response.response);
        } else {
            if (response.status === 200) {
                let data = response.data.data;
                let arr = [];
                for (let item of data) {
                    arr.push({ value: item, label: item });
                }
                setCitylist(arr);
            }
        }
    };

    useEffect(() => {
        fetchState();
    }, []);

    const SpecializationData = [
        {
            value: "0",
            label: "Select Specialization",
        },
        {
            value: "Dietitian",
            label: "Dietitian",
        },
    ];

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
                label="Doctor Name"
                name="doctorName"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.doctorName}
                error={formik.touched.doctorName && formik.errors.doctorName}
                helperText={
                    formik.touched.doctorName && formik.errors.doctorName
                }
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

            <SelectBox
                fullWidth
                label="Specialization"
                value={formik.values.departmentName}
                onChange={(e) =>
                    formik.setFieldValue("departmentName", e.target.value)
                }
                options={SpecializationData}
                color="success"
                name="departmentName"
                error={
                    formik.touched.departmentName &&
                    formik.errors.departmentName
                }
                helperText={
                    formik.touched.departmentName &&
                    formik.errors.departmentName
                }
            />

            <TextBox
                fullWidth
                label="Qualification"
                name="qualification"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.qualification}
                error={
                    formik.touched.qualification && formik.errors.qualification
                }
                helperText={
                    formik.touched.qualification && formik.errors.qualification
                }
            />
            <TextBox
                fullWidth
                label="Consultation Fee"
                name="consultationfee"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.consultationfee}
                error={
                    formik.touched.consultationfee &&
                    formik.errors.consultationfee
                }
                helperText={
                    formik.touched.consultationfee &&
                    formik.errors.consultationfee
                }
            />
            <TextBox
                fullWidth
                label="Experience"
                name="experience"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.experience}
                error={formik.touched.experience && formik.errors.experience}
                helperText={
                    formik.touched.experience && formik.errors.experience
                }
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

            <SelectBox
                fullWidth
                label="State"
                value={formik.values.state}
                onChange={(e) => {
                    formik.setFieldValue("state", e.target.value);
                    fetchCity(e.target.value);
                }}
                options={statelist}
                color="success"
                name="state"
                error={formik.touched.state && formik.errors.state}
                helperText={formik.touched.state && formik.errors.state}
            />

            <SelectBox
                fullWidth
                label="City"
                value={formik.values.city}
                onChange={(e) => formik.setFieldValue("city", e.target.value)}
                options={citylist}
                color="success"
                name="city"
                error={formik.touched.city && formik.errors.city}
                helperText={formik.touched.city && formik.errors.city}
            />

            <TextBox
                fullWidth
                label="Pincode"
                name="pincode"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.pincode}
                error={formik.touched.pincode && formik.errors.pincode}
                helperText={formik.touched.pincode && formik.errors.pincode}
                type={"tel"}
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
                type="email"
            />

            <TextBox
                fullWidth
                label="Phone Number"
                name="phoneNo"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.phoneNo}
                error={formik.touched.phoneNo && formik.errors.phoneNo}
                helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                type="tel"
            />

            <TextBox
                fullWidth
                label="About"
                name="about"
                color="success"
                onChange={formik.handleChange}
                value={formik.values.about}
                error={formik.touched.about && formik.errors.about}
                helperText={formik.touched.about && formik.errors.about}
            />

            <FileBox
                fullWidth
                label="Doctor Image"
                name="image"
                url="getFileUrl"
                accept="image/jpeg,image/png"
                icon="upload"
                disabled={false}
                value={formik.values.image || ""}
                onChange={(e) => formik.setFieldValue("image", e)}
                error={formik.touched.image && formik.errors.image}
                helperText={formik.touched.image && formik.errors.image}
            />

            <ToggleBox
                fullWidth
                label="Add Doctor Notation"
                name="adddoctorannotaion"
                variant="secondary"
                value={formik.values.adddoctorannotaion}
                onChange={(e) =>
                    formik.setFieldValue("adddoctorannotaion", e)
                }
                error={
                    formik.touched.adddoctorannotaion &&
                    formik.errors.adddoctorannotaion
                }
                helperText={
                    formik.touched.adddoctorannotaion &&
                    formik.errors.adddoctorannotaion
                }
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
                sx={{ mt: 0, mb: 2, bordeRadius: "8px" }}
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

export default DoctorSignUp
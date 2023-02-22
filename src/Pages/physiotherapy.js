import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, MenuItem, TextField, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { Col, Container, Form, Row } from 'react-bootstrap';
import Slider from "react-slick";
import styled from 'styled-components';
import Img1 from '../Assets/images/home page/corporate-2.png';
import Img2 from '../Assets/images/home page/logo.png';
import ImgS1 from '../Assets/images/home page/s-1.png';
import ImgS2 from '../Assets/images/home page/s-2.png';
import ImgS3 from '../Assets/images/home page/s-3.png';
import ImgS4 from '../Assets/images/home page/s-4.png';
import ImgS5 from '../Assets/images/home page/s-5.png';
import ImgS6 from '../Assets/images/home page/s-6.png';
import ImgS7 from '../Assets/images/home page/s-7.png';
import ImgS8 from '../Assets/images/home page/s-8.png';
import ImgW1 from '../Assets/images/home page/w-1.png';
import ImgW2 from '../Assets/images/home page/w-2.png';
import ImgW3 from '../Assets/images/home page/w-3.png';
import ImgM3 from '../Assets/images/home page/map.png';
import ImgV1 from '../Assets/images/home page/video.png';
import ImgP1 from '../Assets/images/home page/product.png';
import ImgT1 from '../Assets/images/home page/t-1.png';
import ImgArrow1 from '../Assets/images/home page/t-arrow.png';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useFormik } from 'formik';

import './Home/home.css';
import { useEffect } from 'react';
import theme from '../Components/theme';
import { CustomIframeContainer, CustomIframeResponsive } from './styled/iframe';
import { apiAdminConfig } from '../utils/api';
import { useSnackbar } from '../provider/snackbar';

const Physiotherapy = () => {
    // const StyledBox = styled(Box)(({ theme }) => ({
    //     // backgroundImage: '../Assets/images/home page/Banner-1.png',
    //     backgroundColor: 'transparent'
    // }));

    const [specialization, setSpecialization] = React.useState('0');
    const [state, setState] = React.useState('0');


    const handleSpecializationChange = (event) => {
        setSpecialization(event.target.value);
    };

    const handStateChange = (event) => {
        setState(event.target.value);
    };

    const OrganizeData = [
        {
            value: '0',
            label: 'Organize Size',
        }
    ];

    const InterestedInData = [
        {
            value: '0',
            label: 'Interested In',
        }
    ];
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const snackbar = useSnackbar();
    const [options, setOptions] = React.useState([]);
    const [clinics, setClinics] = React.useState([]);
    const contactFormik = useFormik({
        initialValues: {
            user_name: "",
            contact_number: "",
            specialization: "",
            lead_type: "WARM",
            address: "",
            discription: "",
            clinic: "",
            remarks: "PENDING",
        },
        validate: (values) => {
            const errors = {};
            if (!values.contact_number) {
                errors.contact_number = "Contact number is required";
            } else if (!/^[0-9]{10}$/.test(values.contact_number)) {
                errors.contact_number = "Please enter valid number";
            }
            if (!values.user_name) {
                errors.user_name = "Name is required";
            }
            // if (!values.lead_type) {
            //     errors.lead_type = "Lead Type is required";
            // }
            if (!values.specialization) {
                errors.specialization = "Specialization is required";
            }
            // if (!values.discription) {
            //     errors.discription = "Discription is required";
            // }
            if (!values.address) {
                errors.address = "Address is required";
            }
            if (!values.clinic) {
                errors.clinic = "Clinic is required";
            }
            if (!values.remarks) {
                errors.remarks = "Remarks is required";
            }
            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            console.log('values', values);
            await apiAdminConfig
                .post("leadmanagement/add", values)
                .then((response) => {
                    console.log('response', response);
                    if (response?.data?.status === true) {
                        snackbar({
                            message: response?.data?.message,
                            severity: "success",
                        });
                        contactFormik.resetForm();
                    } else {
                        snackbar({
                            message: response?.data?.message,
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

    // get clinic list
    const fetchClinic = async () => {
        await apiAdminConfig
            .post(`appointment/getAllAssignDrClinic`)
            .then((response) => {
                let data = response.data.data;
                let arr = [];
                for (let item of data) {
                    arr.push({ value: item._id, label: item.clinicName });
                }
                console.log(arr);
                setClinics(arr);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };


    useEffect(() => {
        fetchDeptName();
        fetchClinic();
    }, []);



    return (
        <ThemeProvider theme={theme}>
            <Box className='bannerimg'>
                <Box sx={{ paddingTop: '40px', paddingBottom: '40px' }}>
                    <Container>
                        <Grid container spacing={2}>
                            <Grid item lg={7}>
                                <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                                    <div>
                                        <Typography sx={{ color: '#fff', fontSize: { md: '40px', sm: '32px', xs: '25px' }, textAlign: 'left', lineHeight: { md: '48.41px', sm: '35px', xs: '38px' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                            Quality Care from Physiotherapists Who Care
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                            Get expert advice from one of India's most finest team of physiotherapists so you can make
                                            educated decisions about your health. Consult Delhi’s best physiotherapists, who are superspecialised in their work. Our team is determined to bring quality physiotherapy closer to you.
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item lg={5}>
                                <Box>
                                    <Card sx={{ borderRadius: '16px', padding: '38px' }}>
                                        <Typography sx={{ textAlign: 'center', fontWeight: 600, fontSize: { md: '24px', sm: '22px', xs: '22px' }, color: '#00000', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                            Book Your Appointment Now
                                        </Typography>
                                        <Container className="mt-4">
                                            <Form onSubmit={contactFormik.handleSubmit}>
                                                <Row>
                                                    <Col xs={12} md={12} lg={12}>
                                                        <Form.Group
                                                            className="mb-3"
                                                            style={{ textAlign: "left" }}
                                                            controlId="user_name"
                                                        >
                                                            <Form.Label>Name</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                value={contactFormik.values.user_name}
                                                                name="user_name"
                                                                onChange={contactFormik.handleChange}
                                                                placeholder="Enter Name"
                                                                className="mb-0"
                                                                isInvalid={
                                                                    contactFormik.touched.user_name &&
                                                                    contactFormik.errors.user_name
                                                                }
                                                            />
                                                            {contactFormik.errors.user_name && (
                                                                <Form.Control.Feedback type="invalid">
                                                                    {contactFormik.errors.user_name}
                                                                </Form.Control.Feedback>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={12} lg={12}>
                                                        <Form.Group
                                                            className="mb-3"
                                                            style={{ textAlign: "left" }}
                                                            controlId="contact_number"
                                                        >
                                                            <Form.Label>Contact Number</Form.Label>
                                                            <Form.Control
                                                                type="tel"
                                                                maxLength="10"
                                                                value={contactFormik.values.contact_number}
                                                                name="contact_number"
                                                                onChange={contactFormik.handleChange}
                                                                placeholder="Enter Number"
                                                                className="mb-0"
                                                                isInvalid={
                                                                    contactFormik.touched.contact_number && contactFormik.errors.contact_number
                                                                }
                                                            />
                                                            {contactFormik.errors.contact_number && (
                                                                <Form.Control.Feedback type="invalid">
                                                                    {contactFormik.errors.contact_number}
                                                                </Form.Control.Feedback>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={12} lg={12}>
                                                        <Form.Group
                                                            className="mb-3"
                                                            style={{ textAlign: "left" }}
                                                            controlId="specialization"
                                                        >
                                                            <Form.Label>Specialization</Form.Label>
                                                            <Form.Select
                                                                aria-label="Select.."
                                                                value={contactFormik.values.specialization}
                                                                onChange={(e) => {
                                                                    if (e.target.value !== "0") {
                                                                        contactFormik.setFieldValue(
                                                                            "specialization",
                                                                            e.target.value
                                                                        );
                                                                    }
                                                                }}
                                                                isInvalid={
                                                                    contactFormik.touched.specialization &&
                                                                    contactFormik.errors.specialization
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
                                                            {contactFormik.errors.specialization && (
                                                                <Form.Control.Feedback type="invalid">
                                                                    {contactFormik.errors.specialization}
                                                                </Form.Control.Feedback>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={12} lg={12}>
                                                        <Form.Group
                                                            className="mb-3"
                                                            style={{ textAlign: "left" }}
                                                            controlId="clinic"
                                                        >
                                                            <Form.Label>Attendee Clinic</Form.Label>
                                                            <Form.Select
                                                                aria-label="Select.."
                                                                value={contactFormik.values.clinic}
                                                                onChange={(e) => {
                                                                    if (e.target.value !== "0") {
                                                                        contactFormik.setFieldValue(
                                                                            "clinic",
                                                                            e.target.value
                                                                        );
                                                                    }
                                                                }}
                                                                isInvalid={
                                                                    contactFormik.touched.clinic &&
                                                                    contactFormik.errors.clinic
                                                                }
                                                            >
                                                                <option value="0">Select Clinics</option>
                                                                {clinics.map((el, id) => {
                                                                    return (
                                                                        <option key={id} value={el.value}>
                                                                            {el.label}
                                                                        </option>
                                                                    );
                                                                })}
                                                            </Form.Select>
                                                            {contactFormik.errors.clinic && (
                                                                <Form.Control.Feedback type="invalid">
                                                                    {contactFormik.errors.clinic}
                                                                </Form.Control.Feedback>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                    <Col xs={12} md={12} lg={12}>
                                                        <Form.Group
                                                            style={{ textAlign: "left" }}
                                                            controlId="address"
                                                        >
                                                            <Form.Label>Address</Form.Label>
                                                            <Form.Control
                                                                type="text"
                                                                as="textarea"
                                                                rows={3}
                                                                value={contactFormik.values.address}
                                                                name="address"
                                                                onChange={contactFormik.handleChange}
                                                                placeholder="Enter Address"
                                                                className="mb-0"
                                                                isInvalid={
                                                                    contactFormik.touched.address && contactFormik.errors.address
                                                                }
                                                            />
                                                            {contactFormik.errors.address && (
                                                                <Form.Control.Feedback type="invalid">
                                                                    {contactFormik.errors.address}
                                                                </Form.Control.Feedback>
                                                            )}
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                <Button
                                                    style={{ color: "#fff", fontSize: { md: '18px', sm: '14px', xs: '14px' }, fontWeight: 700, backgroundColor: "#76B757", borderRadius: '8px', padding: 10 }}
                                                    sx={{ mt: 3, mb: 2, bordeRadius: '8px' }}
                                                    variant="contained"
                                                    color='primary'
                                                    className="rounded"
                                                    type="submit"
                                                    fullWidth
                                                >
                                                    BOOK YOUR APPOINTMENT
                                                </Button>{" "}
                                            </Form>
                                        </Container>
                                    </Card>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Container>
                {/* <Box sx={{ my: 4 }}>
                    <Card sx={{ backgroundColor: 'rgba(141, 194, 116, 0.3)', borderRadius: '24px', padding: '30px' }}>
                        <Grid container spacing={2}>
                            <Grid item lg={8}>
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                            <img style={{ textAlign: 'left', display: 'flex', justifyContent: 'left', marginBottom: '10px' }} src={Img2} alt='logo' height={'48.08px'} width={'153.86px'} />
                                        </Box>
                                        <Typography sx={{ color: '#76B757', fontSize: { md: '36px', sm: '28px', xs: '28px' }, textAlign: { md: 'left', sm: 'center', xs: 'center' }, lineHeight: { md: '43.57px', sm: '38px', xs: '38px' }, fontWeight: 700, mt: 2 }} variant="h5" component="div">
                                            Health benefits
                                        </Typography>
                                        <Typography sx={{ color: '#333333', fontSize: { md: '36px', sm: '28px', xs: '28px' }, textAlign: { md: 'left', sm: 'center', xs: 'center' }, lineHeight: { md: '43.57px', sm: '38px', xs: '38px' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                            Group insurance cover
                                        </Typography>
                                    </div>
                                </Box>
                            </Grid>
                            <Grid item lg={4}>
                                <img src={Img1} alt='image-corporate' width={'222px'} height={'248px'} />
                            </Grid>
                        </Grid>
                    </Card>
                </Box> */}
                <Box sx={{ my: 4 }}>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 4 }} variant="h5" component="div">
                        Services
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', height: '100%', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS1} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Paediatric Physiotherapy
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        This area assists children with a variety of acute ailments, including acquired or congenital
                                                        conditions, delayed physical growth, and neurological diseases like cerebral palsy. Youngsters
                                                        benefit from this treatment for their overall growth.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', height: '100%', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS2} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Pertaining to women's health Physiotherapy
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Due to the numerous health difficulties that pregnancy may bring about, physiotherapy for
                                                        women focuses mostly on the female reproductive system. It addresses prenatal and postnatal
                                                        care, facilitates birthing, and aids with reproductive problems.

                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', height: '100%', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS3} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Geriatric Physiotherapy
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        As we age, our metabolisms slow down and lose their capacity to keep us in shape, which
                                                        raises a number of health-related problems. We can maintain our physical fitness with the help
                                                        of geriatric physical therapy. It supports maintaining mobility, treating persistent joint discomfort,
                                                        addressing postures and limits, treating physiological illnesses, and boosting power and
                                                        endurance.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>


                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', height: '100%', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS4} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Neurological Physiotherapy
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        This area of physiotherapy aids in the treatment of problems brought on by diseases of the
                                                        nervous system or the brain, including Cerebral Palsy, multiple sclerosis, Parkinson's disease,
                                                        aneurysms, spinal cord injury, and post-brain surgery rehabilitation. It also helps with
                                                        coordination, motor control, and balance issues, including vertigo.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', height: '100%', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', height: '100%', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS5} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Musculoskeletal Physiotherapy
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        The human musculoskeletal system, which consists of diverse muscles, joints, tendons,
                                                        ligaments, nerves, and bones, is affected by a variety of flaws and diseases. Orthopedic
                                                        physiotherapy addresses these issues. Correcting bone alignment, enhancing mobility,
                                                        minimizing discomfort, and repairing soft tissue injury are the intended outcomes.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        {/* <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS6} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Mental Wellbeing Solutions
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Specially focused Mental Wellness plans available with regular informative webinars and constant support.

                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS7} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Covid Care Packages
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Covid-19 specific online consultations, lab tests, medical equipment, SOS assistance, and home care services.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>


                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS8} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Engagement Activities & Gamification
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Webinars and other knowledge-building sessions, peer-group challenges, and other employee engagement activities

                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid> */}
                    </Grid>
                </Box>
            </Container>
            {/* <Box sx={{ backgroundColor: 'rgba(118, 183, 87, 0.2)', py: 4, mb: 4 }}>
                <Container>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 4 }} variant="h5" component="div">
                        Why Choose Us?
                    </Typography>
                    <Grid container spacing={2} justifyContent={'center'}>
                        <Grid item lg={4}>
                            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgW1} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        For Organizations
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Manage benefits, Improve Communication and Engage Employees.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={4}>
                            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgW2} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        For Organizations
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Manage benefits, Improve Communication and Engage Employees.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item lg={4}>
                            <Card sx={{ backgroundColor: 'transparent', boxShadow: 'none', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgW3} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        For Organizations
                                                    </Typography>
                                                    <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Manage benefits, Improve Communication and Engage Employees.
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </Box> */}
            {/* <Container>
                <Box>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 1 }} variant="h5" component="div">
                        Doctor Plaza Ecosystem
                    </Typography>
                    <Typography sx={{ color: '#414146', fontSize: { md: '18px', sm: '14px', xs: '14px' }, textAlign: 'center', fontWeight: 500, mb: 1 }} variant="body2" component="div">
                        With a rating of 4.5+ we ensure our healthcare solutions are top quality and uniquely personalised to every employee.
                    </Typography>

                    <Box sx={{ my: 4 }}>
                        <img src={ImgM3} width={'100%'} />
                    </Box>
                </Box>
            </Container> */}

            <Box sx={{ backgroundColor: '#F0F1F2', py: 4, mb: 4 }}>
                <Container>
                    {/* <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 2 }} variant="h5" component="div">
                        Demo Video
                    </Typography> */}
                    <Box>
                        <CustomIframeContainer>
                            <CustomIframeResponsive width="100%" height="100%" src="https://www.youtube.com/embed/P1mOxYJFkJY" title="How to relief back and (Neck pain) | Neck & Back Pain treatment - Dr. Paridhi Sharma | Doctors plaza" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></CustomIframeResponsive>
                        </CustomIframeContainer>
                    </Box>
                </Container>
            </Box>

            {/* <Box sx={{ py: 4, mb: 4 }}>
                <Container>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 2 }} variant="h5" component="div">
                        Product Capabilities
                    </Typography>
                    <Box>
                        <Slider {...settings}>
                            <Box sx={{ height: { md: '556px', sm: '200px', xs: '200px' }, width: '100%' }}>
                                <img src={ImgP1} alt="video" height={'100%'} width={'100%'} />
                            </Box>
                        </Slider>
                    </Box>
                </Container>
            </Box> */}

            {/* <Box sx={{ backgroundColor: 'rgba(118, 183, 87, 0.2)', py: 4, mb: 4 }}>
                <Container>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 2 }} variant="h5" component="div">
                        Testimonials
                    </Typography>
                    <Box>
                        <Slider {...settings}>
                            <Card sx={{ borderRadius: '16px' }}>
                                <CardContent sx={{ textAlign: 'center', justifyContent: 'center' }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                        <img src={ImgArrow1} alt="arrow" width={'66px'} height={'66px'} />
                                    </Box>
                                    <Typography sx={{ color: '#000', fontSize: { md: '24px', sm: '16px', xs: '16px' }, textAlign: 'center', lineHeight: '32px', fontWeight: 300, mb: 2 }} variant="body2" component="div">
                                        DesignEvo for logos has a great selection of starting point logos. Once you choose, it's simple to change the text and colors. It's the easiest logo creator I've ever used.
                                    </Typography>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={ImgT1} alt="video" width={'121px'} height={'121px'} />
                                    </Box>
                                    <Typography sx={{ color: '#000', fontSize: { md: '24px', sm: '16px', xs: '16px' }, textAlign: 'center', lineHeight: '32px', fontWeight: 500, my: 2 }} variant="h5" component="div">
                                        Olaf Greiner
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Slider>
                    </Box>
                </Container>
            </Box> */}


            <Box sx={{ py: 4, mb: 4 }}>
                <Container>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '25px', xs: '25px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 600, mb: 2 }} variant="h5" component="div">
                        FAQs
                    </Typography>
                    <Box>
                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel1' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>What advantages do physiotherapists offer?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    When someone is impacted by an injury, sickness, or handicap, physiotherapy aids in regaining
                                    movement and function. Additionally, it may aid in lowering your future risk of disease or
                                    damage. It adopts a wholistic strategy and actively incorporates the patient in their own care.
                                    Get the top therapist in Delhi by scheduling an appointment with us!
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel2' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>How soon does physiotherapy start to work?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    A qualified physical therapist will keep track of your development and determine whether you
                                    are improving in terms of strength, function, and range of motion. A normal physiotherapy
                                    program lasts around six to eight weeks since soft tissues typically require six to eight weeks to
                                    recover. Here at India’s Largest Network of Medical Coworking Clinics, we offer the best
                                    orthopaedic surgeons as well as physiotherapists all under one roof in Delhi NCR.

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel3' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>What kind of physical treatment is ideal?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    The most popular type of physical treatment is orthopaedic physiotherapy. It covers the widest
                                    range of topics. Orthopedic treatment is used by sports physiotherapists to treat sports injuries.
                                    Nevertheless, we advise anyone recuperating from procedures involving their muscles or bones
                                    to receive this kind of care.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel4' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>What conditions may physiotherapy treat?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    Physiotherapy may help with a wide range of medical ailments, many of which are related to the
                                    bones, joints, nerves, and soft tissues. Achieve Physiotherapy specializes in helping people with
                                    a variety of ailments, including arthritis, sports injuries, prenatal and postnatal discomfort, back
                                    and neck pain, problems with the bones and joints, and problems that develop in the workplace.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Physiotherapy;
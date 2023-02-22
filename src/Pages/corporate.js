import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardContent, Grid, MenuItem, Stack, TextField, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap';
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


import './Home/home.css';
import { useEffect } from 'react';
import theme from '../Components/theme';

const Corporate = () => {
    // const StyledBox = styled(Box)(({ theme }) => ({
    //     // backgroundImage: '../Assets/images/home page/Banner-1.png',
    //     backgroundColor: 'transparent'
    // }));
    const handleSubmit = async (event) => {
        event.preventDefault();
    };
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
                                            Join us, and together we can change healthcare for everyone.
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                            Doctors Plaza is radically changing all traditional pathways by connecting India with the greatest
                                            healthcare facilities. In order to get the highest returns and growth, we are collaborating with the
                                            leading medical practitioners and laboratories across India.
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
                                        <Container>
                                            <Box
                                                component="form"
                                                noValidate
                                                onSubmit={handleSubmit}
                                                sx={{ mt: 1 }}
                                            >
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="name"
                                                    label="Name"
                                                    name="name"
                                                    autoComplete="off"
                                                    color="success"
                                                />
                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="organize_name"
                                                    label="Organize Name"
                                                    name="organize_name"
                                                    autoComplete="off"
                                                    color="success"
                                                />

                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="number"
                                                    label="Contact Number"
                                                    name="number"
                                                    autoComplete="off"
                                                    color="success"
                                                />

                                                <TextField
                                                    margin="normal"
                                                    fullWidth
                                                    id="email"
                                                    label="Email"
                                                    name="email"
                                                    autoComplete="off"
                                                    color="success"
                                                />

                                                <Button
                                                    // type="submit"
                                                    fullWidth
                                                    variant="contained"
                                                    style={{ color: "#fff", fontSize: { md: '18px', sm: '14px', xs: '14px' }, fontWeight: 700, backgroundColor: "#76B757", borderRadius: '8px', padding: 10 }}
                                                    sx={{ mt: 3, mb: 2, bordeRadius: '8px' }}
                                                >
                                                    Book Your Appointment
                                                </Button>
                                            </Box>
                                        </Container>
                                    </Card>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
            <Container>
                <Box sx={{ my: 4 }}>
                    <Card sx={{ backgroundColor: 'rgba(141, 194, 116, 0.3)', borderRadius: '24px', padding: '30px' }}>
                        <Grid container spacing={2}>
                            <Grid item lg={8}>
                                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                    <Stack spacing={1}>
                                        <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'left', xs: 'left', md: 'left' }, textAlign: { md: 'left', sm: 'left', xs: 'left' } }}>
                                            <img style={{ textAlign: 'left', display: 'flex', justifyContent: 'left', marginBottom: '10px' }} src={Img2} alt='logo' height={'48.08px'} width={'153.86px'} />
                                        </Box>
                                        <Typography sx={{ color: '#76B757', fontSize: { md: '24px', sm: '20px', xs: '20px' }, textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontWeight: 700, mt: 2 }} variant="h5" component="div">
                                            If you're a provider looking to connect with new patients, why not work with us?
                                        </Typography>
                                        <Typography sx={{ color: '#333333', fontSize: { md: '16px', sm: '14px', xs: '14px' }, textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                            Reach out to local clients looking for a new doctor.
                                        </Typography>
                                        <Typography sx={{ color: '#333333', fontSize: { md: '16px', sm: '14px', xs: '14px' }, textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                            Fill in any slack in your schedule that may arise.
                                        </Typography>
                                        <Typography sx={{ color: '#333333', fontSize: { md: '16px', sm: '14px', xs: '14px' }, textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                            Boost your online profile with dependable testimonials
                                        </Typography>
                                    </Stack>
                                </Box>
                            </Grid>
                            <Grid item lg={4}>
                                <img src={Img1} alt='image-corporate' width={'222px'} height={'248px'} />
                            </Grid>
                        </Grid>
                    </Card>
                </Box>
                <Box sx={{ mb: 4 }}>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 4 }} variant="h5" component="div">
                        Services
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item lg={6}>
                            <Card sx={{ backgroundColor: '#F0F1F2', borderRadius: '16px' }}>
                                <CardContent>
                                    <Grid container spacing={2}>
                                        <Grid item lg={4} sm={12} xs={12}>
                                            <Box sx={{ width: '100%', display: 'flex', justifyContent: { sm: 'center', xs: 'center', md: 'left' }, textAlign: { md: 'left', sm: 'center', xs: 'center' } }}>
                                                <img src={ImgS1} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Upto 25% Off on Blood Tests
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Over 25 specialities guided by best in class doctors for effective care around the clock.
                                                    </Typography> */}
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
                                                <img src={ImgS2} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Upto 20% Off on Physiotherapy
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        COVID-19 essentials and self-test kits provided, along with access to a large inventory for medicines.
                                                    </Typography> */}
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
                                                <img src={ImgS3} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8} sm={12} xs={!2}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Upto 20% Off on Dental Services
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Discounts upto 20% on NABL-accredited lab tests and at-home tests in multiple cities.
                                                    </Typography> */}
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
                                                <img src={ImgS4} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Upto 20% Off a Particular Specialty OPD
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Over 500+ day care procedures covered with a variety of payment options, for employees and family members.
                                                    </Typography> */}
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
                                                <img src={ImgS5} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        Discounted Home Care Services
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        24/7 round the clock Ambulatory services along with equipped medical staff.
                                                    </Typography> */}
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
                                                <img src={ImgS6} alt='img' width={'98px'} height={'98px'} />
                                            </Box>
                                        </Grid>
                                        <Grid item lg={8}>
                                            <Box sx={{ height: '100%', display: 'flex', alignItems: 'center' }}>
                                                <Box>
                                                    <Typography sx={{ color: '#414146', fontSize: '18px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 700, mb: 1 }} variant="h5" component="div">
                                                        360 Degree Mental Well-being Packages
                                                    </Typography>
                                                    {/* <Typography sx={{ color: '#414146', fontSize: '14px', textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontWeight: 400, mb: 0 }} variant="body2" component="div">
                                                        Specially focused Mental Wellness plans available with regular informative webinars and constant support.

                                                    </Typography> */}
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

            {/* <Box sx={{ backgroundColor: '#F0F1F2', py: 4, mb: 4 }}>
                <Container>
                    <Typography sx={{ color: '#414146', fontSize: { md: '30px', sm: '26px', xs: '26px' }, textAlign: 'center', lineHeight: { md: '36.31px', sm: '30px', xs: '30px' }, fontWeight: 500, mb: 2 }} variant="h5" component="div">
                        Demo Video
                    </Typography>
                    <Box>
                        <img src={ImgV1} alt="video" width={'100%'} />
                    </Box>
                </Container>
            </Box> */}

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
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>Are the families of employees covered by the company benefit plans?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    Yes, are plans are accessible to employees and their family members, including themselves,
                                    four other adults, and two children. After activation, the employee must add his or her
                                    dependents to the health plan. Each adult family member will have their own login and phone
                                    number.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel2' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel2a-content"
                                id="panel2a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>Are Doctors Plaza licensed to provide consultations to patients?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    Every doctor offering an online service is subject to a rigorous verification procedure at Doctors
                                    Plaza. They are highly competent doctors, and the medical council has carefully examined all of
                                    their required documentation and registration certificates. Every qualification complies with the
                                    standards set by the Medical Council of India. All doctoral degrees and medical council
                                    registration certifications are available in soft copy at Doctors Plaza.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel3' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>Can I see the doctor of my choice?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    Yes, you may pick the doctor you want. Before the consultation, we present the list of doctors
                                    scheduled for that day. You can filter doctor as per patient ratings, fees and location.

                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                            <AccordionSummary
                                expandIcon={expanded === 'panel4' ? <RemoveIcon color="secondary" /> : <AddIcon color='secondary' />}
                                aria-controls="panel3a-content"
                                id="panel3a-header"
                            >
                                <Typography sx={{ fontSize: { md: '1.0714285714285714rem', sm: '16px', xs: '16px', textAlign: 'left' }, fontWeight: 600 }}>How many different specialties are offered at the Doctors Plaza?</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: { md: '14px', sm: '14px', xs: '14px', textAlign: 'left' } }}>
                                    With Doctors Plaza, you may visit a doctor’s clinic or take a video consultation. Video
                                    consultation is another option for a clinic-like experience. Additionally, keep in mind that all
                                    online consultations are private.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                </Container>
            </Box>
        </ThemeProvider>
    )
}

export default Corporate
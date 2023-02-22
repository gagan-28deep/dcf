import { Box, Card, Grid, Stack, ThemeProvider, Toolbar } from '@mui/material';
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import Searchbar from '../../Components/Home/SearchBar';
import '../Home/home.css';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img1 from "../../Assets/images/home page/consult-doctor.png";
import img2 from "../../Assets/images/home page/online-doctor.png";
import img3 from "../../Assets/images/home page/verify.png";
import img4 from "../../Assets/images/home page/text.png";
import img5 from "../../Assets/images/home page/sms.png";

import theme from '../../Components/theme';
import SpecialityData from './specialitydata';
import { useNavigate } from 'react-router-dom';

const Speciality = () => {
    const navigate = useNavigate();
    const [toggle, settoggle] = useState(false);
    const openNav = () => {
        settoggle(!toggle);
    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="homecontainer">
                    <Box sx={{ backgroundColor: 'rgba(236, 184, 49, 0.1);' }}>
                        <Container>
                            <Box sx={{ padding: '40px 0px 10px 0px' }}>
                                <Grid container spacing={0}>
                                    <Grid item lg={9}>
                                        <Box>
                                            <Typography sx={{ fontSize: { md: '40px', sm: '32px', xs: '25px' }, textAlign: 'left', lineHeight: { md: '48.41px', sm: '35px', xs: '38px' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                                Skip the travel! <br />
                                                Take Online Doctor Consultation
                                            </Typography>
                                            <Typography sx={{ textAlign: 'left', fontSize: { md: '18px', sm: '14px', xs: '14px' }, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                Private Consultation at Your Convenience
                                                Download the Mobile App Now!
                                            </Typography>
                                            <Typography sx={{ textAlign: 'left', mt: 2 }} gutterBottom>
                                                <img src={img2} style={{ textAlign: 'left' }} width={'372px'} />
                                            </Typography>
                                            <Box sx={{ textAlign: 'left' }}>
                                                <Button onClick={() => navigate('/doctor/search')} sx={{ fontWeight: 600, fontSize: '18px', color: '#FFFFFF', textTransform: 'capitalize', borderRadius: '42px', padding: '10px 20px 10px 20px', my: 3 }} variant='contained' color='secondary'>
                                                    Consult Now
                                                </Button>
                                            </Box>
                                            <Stack direction={'row'} spacing={2}>
                                                <Typography sx={{ textAlign: 'left', fontSize: { md: '14px', sm: '12px', xs: '12px' }, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                    <img src={img3} style={{ textAlign: 'left' }} width={'14px'} height={'14px'} /> Verified Doctors
                                                </Typography>
                                                <Typography sx={{ textAlign: 'left', fontSize: { md: '14px', sm: '12px', xs: '12px' }, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                    <img src={img4} style={{ textAlign: 'left' }} width={'14px'} height={'14px'} /> Digital Prescription
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Grid>
                                    <Grid item lg={3}>
                                        <Box sx={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}>
                                            <img width={'100%'} height={'100%'} src={img1} />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Container>
                    </Box>
                    <Box>
                        <Container fluid>
                            <Card sx={{ my: 4, borderRadius: '16px' }}>
                                <CardContent>
                                    <SpecialityData openNav={openNav} toggle={toggle} />
                                </CardContent>
                            </Card>
                            <Card sx={{ mb: 4 }}>
                                <CardContent>
                                    <Stack gap={2}>
                                        <Typography
                                            sx={{ textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontSize: '14px', color: '#414146', fontStyle: 'normal' }} color="text.secondary"
                                        >
                                            Our medical conditions sometimes prevent us from traveling. This should not be a barrier to medical assistance. That is why Doctors Plaza has added a new video consultation feature where you can consult eminent specialists at your convenience. Contact Delhi’s best doctors at Doctors Plaza: India’s Largest Network of Medical Co-Working Clinics.
                                        </Typography>
                                        <Typography
                                            sx={{ textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontSize: '14px', color: '#414146', fontStyle: 'normal' }} color="text.secondary"
                                        >
                                            50+ eminent experts from Top Hospitals are now practicing privately at Doctors Plaza
                                        </Typography>
                                        <Typography
                                            sx={{ textAlign: { md: 'left', sm: 'left', xs: 'left' }, fontSize: '14px', color: '#414146', fontStyle: 'normal' }} color="text.secondary"
                                        >
                                            20+ specialties and subspecialties are available
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Container>
                    </Box>
                    <Box sx={{ backgroundColor: { md: '#76B757', sm: '#fff', xs: '#fff' }, padding: '60px 20px 60px 20px' }}>
                        <Container sx={{ textAlign: 'center' }}>
                            <Typography sx={{ color: { md: '#fff', sm: '#414146', xs: '#414146' }, fontSize: { md: '40px', sm: '25px', xs: '25px' }, textAlign: 'center', fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                The One and Only Platform with 21+ Specialties
                            </Typography>
                            <Typography sx={{ mb: 2, textAlign: 'center', fontWeight: 400, fontSize: '14px', color: { md: '#fff', sm: '#414146', xs: '#414146' }, fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                Don't allow your health to prevent you from receiving medical care! Get the best and most competent physicians to consult with you online.
                            </Typography>
                            <Searchbar variant={"secondary"} />
                            {/* <Box sx={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
                                <Toolbar style={{ minHeight: '0px' }} sx={{ gap: 5, padding: 0, height: '100%' }}>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                        Popular searches:
                                    </Typography>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                        Dermatologist
                                    </Typography>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                        Pediatrician
                                    </Typography>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                        Gynecologist/Obstetrician
                                    </Typography>
                                    <Typography sx={{ textAlign: 'center', fontWeight: 400, fontSize: '14px', color: '#fff', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                        Others
                                    </Typography>
                                </Toolbar>
                            </Box> */}
                        </Container>
                    </Box>
                </div>
            </ThemeProvider>

        </>
    )
}

export default Speciality
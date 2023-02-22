import { Box, Button, CardContent, ThemeProvider, Toolbar } from '@mui/material';
import React from 'react'
import { Card, Container } from 'react-bootstrap';
import Searchbar from '../Components/Home/SearchBar';
import './Home/home.css';
import Typography from '@mui/material/Typography';
import downloadappbanner from "../Assets/images/DownloadPlaystore.png";

import theme from '../Components/theme';
import DoctorApp from '../Components/Home/DoctorApp';
import SpecialityData from './speciality/specialitydata';

const Speciality = () => {
    const [toggle, settoggle] = React.useState(false);
    const openNav = () => {
        settoggle(!toggle);
    };
    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="homecontainer">
                    <Box sx={{ backgroundColor: { md: '#76B757', sm: '#fff', xs: '#fff' }, padding: '60px 20px 60px 20px' }}>
                        <Container sx={{ textAlign: 'center' }}>
                            <Typography sx={{ color: { md: '#fff', sm: '#414146', xs: '#414146' }, fontSize: { md: '40px', sm: '35px', xs: '35px' }, textAlign: 'center', lineHeight: { md: '48.41px', sm: '35px', xs: '35px' }, fontWeight: 700, mb: 2 }} variant="h5" component="div">
                                Your search for specialists end here!
                            </Typography>
                            <Typography sx={{ mb: 2, textAlign: 'center', fontWeight: 400, fontSize: '14px', color: { md: '#fff', sm: '#414146', xs: '#414146' }, fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                Book an appointment with highly qualified doctors in just a few steps. Skip waiting in long lines to meet specialists. Meet Independent Practitioners at their private clinics managed by Doctors Plaza. Hassle-Free Experience for you and your loved ones.
                            </Typography>
                            <Searchbar variant="secondary" />
                            {/* <Box sx={{ textAlign: 'center', justifyContent: 'center', display: 'flex' }}>
                                <Toolbar style={{ minHeight: '0px' }} sx={{ gap: 5 }}>
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
                    <Box sx={{ my: 2 }}>
                        <Container fluid>
                            <Card sx={{ my: 4, borderRadius: '16px' }}>
                                <CardContent>
                                    <SpecialityData openNav={openNav} toggle={toggle} />
                                </CardContent>
                            </Card>
                        </Container>
                    </Box>
                    <Box>
                        <DoctorApp />
                    </Box>
                </div>
            </ThemeProvider>

        </>
    )
}

export default Speciality
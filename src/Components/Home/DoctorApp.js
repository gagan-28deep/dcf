import { Box, Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import Img1 from '../../Assets/images/home page/app-mobile.png';
import Img2 from '../../Assets/images/home page/googleplay.png';
import Img3 from '../../Assets/images/home page/appstore.png';
import './home.css';

const DoctorApp = () => {
    return (
        <Box sx={{ backgroundColor: 'rgba(118, 183, 87, 0.05)', padding: '30px', paddingBottom: '0px', paddingTop: '10px' }}>
            <Box className="doctorapp">
                <Grid container spacing={2}>
                    <Grid item lg={6} sm={12} xs={12}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                            <img src={Img1} alt="mobile" />
                        </Box>
                    </Grid>
                    <Grid item lg={6} sm={12} xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                            <Box>
                                <Typography sx={{ fontSize: { md: '36.956px', sm: '22px', xs: '22px' }, fontWeight: 600, textAlign: 'left', mb: 2 }} variant='h2' component={"h2"}>
                                    Download the Doctors
                                    Plaza App Now
                                </Typography>
                                <Typography sx={{ fontWeight: 400, fontSize: '14px', color: '#131416', textAlign: 'left' }} variant='body2' component={"h2"}>
                                    Book Appointment with the best doctors. Connect online or offline at your
                                    convenience. Skip the long lines to meet specialist doctors.
                                    Doctors Plaza is India’s Largest Network of Medical Co-Working Clinics
                                    which empowers medical practitioners
                                    to start their private practice.
                                </Typography>
                                <Stack sx={{ my: 4 }} direction={'row'} spacing={2}>
                                    <a href='https://play.google.com/store/apps/details?id=com.doctorsplaza.app' target={"_blank"} rel="noreferrer">
                                        <img className="doctorapp-image" src={Img2} style={{ cursor: 'pointer' }} alt="mobile" width={'100%'} height={"100%"} />
                                    </a>
                                    <a href='https://apps.apple.com/ie/app/doctors-plaza/id1589016864' target={"_blank"} rel="noreferrer">
                                        <img className="doctorapp-image" src={Img3} style={{ cursor: 'pointer' }} alt="mobile" width={'100%'} height={"100%"} />
                                    </a>
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default DoctorApp
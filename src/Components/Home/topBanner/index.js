import { Box, Button, createTheme, Divider, Grid, Stack, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { Container } from 'react-bootstrap';
import '../home.css';
import img1 from "../../../Assets/images/home page/Banner.png";
import imga from "../../../Assets/images/home page/Free.png";
import imgb from "../../../Assets/images/home page/customer.png";
import imgc from "../../../Assets/images/home page/medical.png";
import banner from "../../../Assets/images/home page/top-banner.png";

import theme from '../../theme';
import { CustomImg } from './style';
import { useNavigate } from 'react-router-dom';
const TopBanner = () => {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Container fluid className='containerSpace'>
        <Grid container spacing={4}>
          <Grid item lg={7} md={7} sm={12} xs={12}>
            <Stack spacing={7}>
              <Typography variant='h6' sx={{
                fontSize: { md: '42px', sm: '22px', xs: '22px' },
                fontWeight: 700,
                color: '#76B757',
                lineHeight: { md: '54.97px', sm: '18px' },
                textAlign: 'left'
              }}>
                Simplifying OPD Experience for you and your loved ones
              </Typography>
              <Stack direction={'row'} spacing={4}>
                <Typography sx={{
                  fontSize: { md: '24px' },
                  fontWeight: 600,
                  color: '#131416'
                }} variant='text.secondary'>
                  50 +<br />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '16.1px',
                    color: '#858F94'
                  }}>
                    DOCTORS
                  </span>
                </Typography>
                <Divider sx={{
                  borderColor: '#858F94'
                }} orientation="vertical" flexItem />
                <Typography sx={{
                  fontSize: { md: '24px' },
                  fontWeight: 600,
                  color: '#131416'
                }} variant='text.secondary'>
                  21 +<br />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '16.1px',
                    color: '#858F94'
                  }}>
                    SPECIALISTS
                  </span>
                </Typography>
                <Divider sx={{
                  borderColor: '#858F94'
                }} orientation="vertical" flexItem />
                <Typography sx={{
                  fontSize: { md: '24px' },
                  fontWeight: 600,
                  color: '#131416'
                }} variant='text.secondary'>
                  5 +<br />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '16.1px',
                    color: '#858F94'
                  }}>
                    CENTERS
                  </span>
                </Typography>
              </Stack>
              <Stack direction={'row'} spacing={3}>
                <a style={{ textDecoration: 'none' }} href='tel:+918929280230'>
                  <Button sx={{
                    borderRadius: '28px',
                    fontSize: { md: '16px', sm: '12px', xs: '12px' },
                    color: '#fff',
                    fontWeight: 500,
                    textDecoration: 'none'
                  }} variant='contained' color='secondary'>
                    +91 8929280230
                  </Button>
                </a>
                <a href='#bookappointment' style={{ textDecoration: 'none' }}>
                  <Button sx={{
                    borderRadius: '28px',
                    fontSize: { md: '16px', sm: '12px', xs: '12px' },
                    fontWeight: 500,
                  }} variant='outlined' color="secondary">
                    BOOK CONSULTATION
                  </Button>
                </a>
              </Stack>
              <Stack spacing={2}>
                <Typography
                  sx={{
                    fontSize: { md: '20px', sm: '18px', xs: '16px' },
                    fontWeight: 600,
                    color: '#414146',
                    lineHeight: '24.2px',
                    textAlign: 'left'
                  }}
                  variant='text.secondary'>
                  Book an Appointment with Doctors Plaza, Your OneStop Solution
                </Typography>
                <Stack spacing={2}>
                  <Stack direction={'row'} spacing={2}>
                    <Box sx={{ width: { md: '40px', sm: '55px', xs: '55px' } }}>
                      <img width="100%" src={'/homepage/logo.png'} />
                    </Box>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: { md: '16px', sm: '14px', xs: '14px' },
                        fontWeight: 500,
                        color: '#858F94',
                        lineHeight: '18.32px',
                        textAlign: 'left'
                      }}
                    >
                      Get online and offline consultations from highly qualified Independent Practitioners
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Box sx={{ width: { md: '40px', sm: '40px', xs: '40px' } }}>
                      <img width="100%" src={'/homepage/multi_specialists.png'} />
                    </Box>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: { md: '16px', sm: '14px', xs: '14px' },
                        fontWeight: 500,
                        color: '#858F94',
                        lineHeight: '18.32px',
                        textAlign: 'left'
                      }}
                    >
                      Get Multiple Specialists Under one Roof at Doctors Plaza Clinics
                    </Typography>
                  </Stack>
                  <Stack direction={'row'} spacing={2}>
                    <Box sx={{ width: { md: '60px', sm: '80px', xs: '80px' } }}>
                      <img width="100%" src={'/homepage/online_and_offline_consultations.png'} />
                    </Box>
                    <Typography
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: { md: '16px', sm: '14px', xs: '14px' },
                        fontWeight: 500,
                        color: '#858F94',
                        lineHeight: '18.32px',
                        textAlign: 'left'
                      }}
                    >
                      Why stand in line when you can make an appointment with the city's most skilled and famous
                      doctors at Doctors Plaza?
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item lg={5} md={5} sm={12} xs={12} sx={{ display: { xs: 'block', sm: 'block', md: 'block' } }}>
            <Box sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'flex-end',
            }}>
              <CustomImg src={banner} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default TopBanner
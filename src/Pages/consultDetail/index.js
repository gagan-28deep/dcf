import { Box, Button, Card, CardContent, Slide, Stack, styled, Tab, Tabs, ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Container, Table } from 'react-bootstrap';
import theme from '../../Components/theme/index';
import { apiAdminConfig } from '../../utils/api';
import img2 from "../../Assets/images/home page/doctor.png";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ClinicForm from '../../Components/modules/clinicForm';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';


const CustomButton = styled(Button)(({ theme }) => ({
    width: '208px',
    height: '55px',
    textAlign: 'center',
    display: 'block',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        height: '40px',
        textAlign: 'center',
        display: 'block',
    }
}))

const CustomTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 700,
    fontSize: '14px',
    color: theme.palette.common.white
}))

const ConsultDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    // const { id } = useParams();
    const speciality = location?.state?.name;
    const [checked, setChecked] = React.useState({
        open: false,
        index: null
    });
    const [data, setData] = useState([]);
    const [tab, setTab] = React.useState('one');

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleBookAppointment = (index, e) => {
        console.log('indexindexindex', index)
        setChecked({ open: !checked.open, index: index });
    };
    const getDetails = async (id) => {
        await apiAdminConfig.get(`doctor/${id}`).then((response) => {
            console.log('response?.data?.data', response?.data?.data);
            if (response?.data?.status === 200) {
                setData(response?.data?.data[0])
            }
        }).catch((error) => {
            console.log('getDetails', error)
        })
    };

    useEffect(() => {
        if (id) {
            getDetails(id)
        }
    }, [id]);

    // const siteMetadata = {
    //     url: 'https://google.com/about',
    //     title: `${data?.metaTitle ? data?.metaTitle : "No Title"}`,
    //     datePublished: '2019-10-06T13:56:03.123Z',
    //     description: data?.metaDescription ? data.metaDescription : "No Content",
    //     language: 'en-US',
    //     image: 'http://website.com/image.png',
    //     author: {
    //         email: 'person@gmail.com',
    //         name: 'John Smith',
    //         image: 'http://john.me/my-face.jpg',
    //     },
    //     site: {
    //         siteName: 'IMDb',
    //         searchUrl: 'https://www.google.com/search?q=',
    //     }
    // }
    React.useEffect(() => {
        console.log("metaTitle12")
        let originalDescriptionElements = document.querySelectorAll('meta[name=description]');
        originalDescriptionElements.forEach(e => {
            // @ts-ignore: ignore html.dataset being unknown
            if (!e.dataset) throw new Error("Helmet: html.dataset is not available in this browser.");
            // @ts-ignore: ignore html.dataset being unknown
            else if (!e.dataset.reactHelmet)
                e.parentNode.removeChild(e);
        });
    }, [data?.metaTitle])

    return (
        <>
            <Helmet>
                <title>{`${data?.metaTitle ? data?.metaTitle : "No Title"}`}</title>
                <meta
                    name="description"
                    content={data?.metaDescription ? data.metaDescription : "No Content"}
                    data-react-helmet="true"
                />
                <meta property="og:title" content={`${data?.metaTitle ? data?.metaTitle : "No Title"}`} />
                <meta property="og:description" content={data?.metaDescription ? data.metaDescription : "No Content"} />
            </Helmet>

            <Container fluid>
                <ThemeProvider theme={theme}>
                    <Box>
                        <Card sx={{ my: 4 }}>
                            <CardContent>
                                <Stack direction={{ md: 'row', sm: 'column' }} alignItems='flex-start' spacing={2}>
                                    <Box sx={{ width: '250px', borderRadius: '5px', overflow: 'hidden' }}>
                                        {data?.profile_picture ? <img height={'100%'} width={'100%'} src={data?.profile_picture} alt={data?.doctorName} /> : <img height={'100%'} width={'100%'} src={img2} alt={data?.doctorName} />}
                                    </Box>
                                    <Box sx={{ flexGrow: 1, height: '100%', width: '100%' }}>
                                        <Typography sx={{ fontSize: '18px', textAlign: 'left', color: '#76B757', fontWeight: '600', marginTop: 1 }} variant="h6" component="div">
                                            {data?.doctorName}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', marginTop: 1, fontSize: '16px', color: '#414146', fontStyle: 'normal', fontWeight: '600' }} color="text.secondary" gutterBottom>
                                            {data.specialization}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', marginTop: 1, fontSize: '16px', color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                            {data.qualification}
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', marginTop: 1, fontSize: '16px', color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                            {data.experience}+ years of experience
                                        </Typography>
                                        <Typography sx={{ textAlign: 'left', marginTop: 1, fontSize: '16px', color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                            License Number : {data.licenseNo}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ height: '100%', width: { sm: '100%', md: 'auto' }, display: 'flex:', alignItems: 'flex-end', justifyContent: { md: 'end', sm: 'left' } }}>
                                        <Box>
                                            <Typography sx={{ textAlign: 'left', fontSize: 16, color: '#414146', fontStyle: 'normal', fontWeight: 600 }} color="text.secondary" gutterBottom>
                                                Consultation Fee: ₹{data.consultationfee}
                                            </Typography>

                                            <CustomButton onClick={(e) => handleBookAppointment(1, e)} variant='contained' color='primary'>
                                                <CustomTitle>Book Appointment</CustomTitle>
                                            </CustomButton>
                                            <Box component="a" href="tel:+91 8929280230" sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', mt: 2, textDecoration: 'none' }}>
                                                <CustomButton disabled={data.contactNumber ? false : true} variant='outlined' color='secondary'>
                                                    Call Now
                                                </CustomButton>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Stack>
                            </CardContent>
                            <Card>
                                <CardContent>
                                    <Box>
                                        <Slide direction="up" in={checked.open} mountOnEnter unmountOnExit>
                                            <Container>
                                                <Card sx={{ my: checked.open == true && 1 == checked.index ? 4 : 0 }}>
                                                    <CardContent>
                                                        {checked.open == true && 1 == checked.index && <ClinicForm setChecked={setChecked} ClinicData={data} />}
                                                    </CardContent>
                                                </Card>
                                            </Container>
                                        </Slide>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Card>

                        <Card sx={{ mb: 4 }}>
                            <Box >
                                <Tabs
                                    value={tab}
                                    onChange={handleChange}

                                    centered
                                >
                                    <Tab
                                        value="one"
                                        label="About The Doctor"
                                        sx={{ width: { md: '100%', sm: 'auto' }, fontWeight: 600 }}
                                    />
                                    <Tab value="two" label="Locations" sx={{ width: { md: '100%', sm: 'auto' }, fontWeight: 600 }} />
                                </Tabs>
                                {tab == 'one' ?
                                    <Box>
                                        <CardContent>
                                            <Box sx={{ my: 2 }}>
                                                <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                    <div dangerouslySetInnerHTML={{ __html: data?.about }} />
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Box>
                                    :
                                    <CardContent sx={{ my: 2 }}>
                                        {data?.locations && data?.locations.map((item, index) => {
                                            return (
                                                <Table responsive>
                                                    <tbody>
                                                        <tr>
                                                            <td style={{ width: '50%' }}>
                                                                <Box sx={{ mb: 1, width: { md: '100%', sm: '100%' } }}>
                                                                    <Typography sx={{ fontSize: '18px', marginBottom: 1, textAlign: 'left', color: 'rgb(65, 65, 70)', fontWeight: '600' }} variant="h6" component="div">
                                                                        {item?.clinicData?.clinicName}
                                                                    </Typography>
                                                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                                        <LocationOnIcon /> {item?.clinicData?.location}
                                                                    </Typography>

                                                                </Box>
                                                            </td>

                                                            <td style={{ width: '30%' }}>
                                                                <Box sx={{ width: { md: '100%', sm: '100%' } }}>
                                                                    <Typography sx={{ fontSize: '18px', marginBottom: 1, textAlign: 'left', color: 'rgb(65, 65, 70)', fontWeight: '600' }} variant="h6" component="div">
                                                                        Day
                                                                    </Typography>
                                                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                                        {item?.day}
                                                                    </Typography>
                                                                </Box>
                                                            </td>

                                                            <td style={{ width: '20%' }}>
                                                                <Box sx={{ width: { md: '100%', sm: '100%' } }}>
                                                                    <Typography sx={{ fontSize: '18px', marginBottom: 1, textAlign: 'left', color: 'rgb(65, 65, 70)', fontWeight: '600' }} variant="h6" component="div">
                                                                        Timings
                                                                    </Typography>
                                                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                                                        {item?.start_time} {item?.end_time}
                                                                    </Typography>
                                                                </Box>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            )
                                        })}
                                    </CardContent>}
                            </Box>
                        </Card>
                    </Box>
                </ThemeProvider >
            </Container>
        </>
    )
}

export default ConsultDetail
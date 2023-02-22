import { Box, Card, Checkbox, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Rating, Select, Slide, Stack, styled, ThemeProvider, Toolbar, useTheme } from '@mui/material';
import React from 'react'
import { Col, Container, Form, Nav, Row } from 'react-bootstrap';
import Searchbar from '../Components/Home/SearchBar';
import './Home/home.css';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import img1 from "../Assets/images/home page/tick.png";
import img2 from "../Assets/images/home page/doctor.png";
import img3 from "../Assets/images/logo.jpeg";
import img4 from "../Assets/images/home page/like.png";
import img5 from "../Assets/images/home page/available.png";
import img6 from "../Assets/images/home page/book-button.png";


import theme from '../Components/theme';
import ConsultTabBox from '../Components/modules/consult/ConsultTabBox';
import ClinicForm from '../Components/modules/clinicForm';
import AppointmentForm from '../Components/Home/AppointmentForm';
import HTTPrequest from '../Config/HTTP_request';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { apiAdminConfig } from '../utils/api';
import { useSearchProvider } from '../provider/searchProvider';

const CustomButton = styled(Button)(({ theme }) => ({
  width: '208px',
  height: '55px',
  textAlign: 'center',
  display: 'flex',
  textDecoration: 'none',
  color: theme.palette.primary.main,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '40px',
    textAlign: 'center',
    display: 'flex',
  },
  '&:hover': {
    color: theme.palette.primary.main,

  }
}))

const CustomTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '14px',
  color: theme.palette.common.white
}))
const CustomSubTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '12px',
  color: theme.palette.common.white
}))

const Consult = (props) => {
  const { locationData } = props;
  const { formik, doctorValue, setDoctorValue } = useSearchProvider();
  const navigate = useNavigate();
  const location = useLocation();
  const nameValues = useLocation();
  const queryNameValue = new URLSearchParams(nameValues?.search);
  const getName = queryNameValue.get("specialization")
  console.log('nameValues', getName)
  // const speciality = location?.state?.name;

  // const [filter, setFilter] = React.useState(false);
  const [checked, setChecked] = React.useState({
    open: false,
    index: null
  });


  const getDoctorList = async () => {
    await apiAdminConfig.post(`searchDoctor?name=${getName ? getName.trim() : ""}&city=${formik?.values.location}&day=${formik?.values?.day ? formik?.values?.day : 'all'}&type=${formik?.values?.type ? formik?.values?.type : ''}&sortby=${formik?.values?.sortby ? formik?.values?.sortby : ""}`).then((response) => {
      if (response && response.data.code === 200) {
        // setSearch(data.data.data);
        setDoctorValue(response?.data)
      } else if (response && response.data.code === 401) {
        console.log("unauthorized user...");
      }
    }).catch((error) => {
      console.log('searchbarError', error)
    })
  };


  React.useEffect(() => {
    setTimeout(() => {
      if (!formik.values.name && !getName) {
        console.log("setTimeoutlive", formik.values.name)
        getDoctorList()
      }
    }, [3000])
  }, [formik.values.name, getName]);

  React.useEffect(() => {
    if (formik?.values?.name || formik?.values?.location || formik?.values?.day || formik?.values?.type || formik?.values?.sortby) {
      getDoctorList()
    }
  }, [formik?.values?.name, formik?.values?.location, formik?.values?.day, formik?.values?.type, formik?.values?.sortby])

  React.useEffect(() => {
    if (getName) {
      getDoctorList()
    }
  }, [getName])



  // console.log("setTimeout", formik.values.name)

  // console.log("formik?.values.name", getName)


  React.useEffect(() => {
    if (getName) {
      // console.log("getName", getName?.trim())
      formik.setFieldValue("name", getName)
    }
  }, [getName]);

  console.log('doctorValue', doctorValue)

  // const formik = useFormik({
  //   initialValues: {
  //     type: filter ? 'online' : false,
  //     day: 'all',
  //     name: '',
  //     sortby: ''
  //   },
  //   onSubmit: async (values) => {
  //     console.log('values.name', values.name)
  //     navigate(`/doctor/search${}`, {
  //       state: {
  //         name: values?.name,
  //         day: values?.day,
  //         type: values?.type,
  //         sortby: values?.sortby
  //       }
  //     })
  //   },
  //   // enableReinitialize: true
  // });

  // console.log('formik.values.day', formik.values.sortby)

  // useEffect(() => {
  //   if (formik.values.name || formik?.values.day || formik?.values?.type || formik?.values?.sortby) {
  //     formik.handleSubmit();
  //   }
  // }, [formik?.values?.name, formik?.values?.day, formik?.values?.type, formik?.values?.sortby])

  const handleChange = (index, e) => {
    setChecked({ open: !checked.open, index: index });
  };

  const handleFilter = (e) => {
    if (e.target.checked) {
      formik.setFieldValue('type', 'online')
      formik.handleSubmit();
    } else {
      console.log('e.target.checked', e.target.checked)
      formik.setFieldValue('type', 'offline')
      formik.handleSubmit();
    }
  };

  // useEffect(() => {
  //   if (filter) {
  //     formik.setFieldValue('type', 'online')
  //   } else {
  //     formik.setFieldValue('type', 'offline')
  //   }
  // }, [filter])

  const [city, setCity] = useState([]);
  const [specialization, setSpecialization] = useState([]);
  const [validated, setValidated] = useState(false);
  const [posts, setposts] = useState({
    name: "",
    contactNumber: "",
    specialization: "",
    clinic: "",
  });
  const [snackData, setsnackdata] = useState({
    open: false,
    message: "",
    status: "",
  });

  const fetchcinicdata = async () => {
    let clinicapi = {
      path: "asset",
      method: "GET",
    };
    let data = await HTTPrequest(clinicapi);
    if (data && data.data.status === 200) {
      setCity(data.data.data);
    } else if (data && data.data.status === 401) {
      console.log("unauthorized user...");
    }
  };

  const fetchspecialtydata = async () => {
    const specialtyapi = {
      path: "specialization",
      method: "GET",
    };
    let data = await HTTPrequest(specialtyapi);
    if (data && data.data.status === 200) {
      setSpecialization(data.data.data);
    } else if (data && data.data.status === 401) {
      console.log("unauthorized user...");
    }
  };

  const handleInputChange = (e) => {
    console.log(e.target.name, e.target.value);
    setposts({ ...posts, [e.target.name]: e.target.value });
  };

  const fetchapi = async (value) => {
    const api = {
      path: "creatconsultation",
      method: "POST",
      body: { ...value },
    };
    console.log("value1234", value);
    let data = await HTTPrequest(api);
    console.log("data---->", data?.data?.message);
    if (data) {
      if (data?.data?.status === 200) {
        setsnackdata((prevState) => ({
          ...prevState,
          open: true,
          message: data?.data?.message,
          status: "success",
        }));
        // setData((prevState) => ({
        //   ...prevState,
        //   name: "",
        //   contactNumber: "",
        //   specialization: "",
        //   clinic: "",
        // }));
      } else {
        setsnackdata((prevState) => ({
          ...prevState,
          open: true,
          message: `${data?.data?.message}. Field can't be empty.`,
          status: "error",
        }));
      }
    } else if (data && data?.data?.status === 401) {
      console.log("unauthorized user...");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    fetchapi(posts);
  };

  useEffect(() => {
    fetchcinicdata();
    fetchspecialtydata();
  }, []);

  const ResetForm = () => {
    formik.resetForm({
      type: false,
      day: 'today',
      name: ''
    });
    // setFilter(false);
    formik.handleSubmit();
  }

  return (
    <>
      <div>
        {/* <Container className="homedata">
          <Searchbar />
        </Container> */}
        <Container fluid>
          <ThemeProvider theme={theme}>
            <Box sx={{ backgroundColor: '#F0F1F2', padding: { md: '20px 40px 20px 40px', sm: '0px', xs: '0px' } }}>
              <Toolbar sx={{ backgroundColor: theme.palette.secondary.main, marginBottom: theme.spacing(2), boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)', borderRadius: '5px' }}>
                <Container fluid>
                  <Grid container spacing={{ xs: 0, md: 2 }} sx={{ marginBottom: { xs: 2, sm: 2, md: 0 } }}>
                    <Grid lg={4} md={4} sm={12} xs={12}>
                      <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
                        <Grid container>
                          <Grid item lg={5} md={5} sm={12} xs={12}>
                            <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
                              <FormControl fullWidth={true}>
                                <FormControlLabel
                                  sx={{ color: "#fff" }}
                                  control={
                                    <Checkbox
                                      sx={{ color: theme.palette.common.white, borderColor: theme.palette.common.white }}
                                      color='default'
                                      checked={formik.values.type == "offline" ? false : true}
                                      onChange={(e) => handleFilter(e)}
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                  } label="Video Consult" />
                              </FormControl>
                            </Box>
                          </Grid>
                          <Grid item lg={7} md={7} sm={12} xs={12}>
                            <Box sx={{ display: 'flex', height: '100%', alignItems: 'flex-end' }}>
                              <Form.Select
                                name="day"
                                value={formik.values.day}
                                defaultValue={'all'}
                                onChange={(e) => {
                                  formik.setFieldValue('day', e.target.value);
                                  formik.handleSubmit();
                                }}
                                aria-label="Default select example">
                                <option value="today">Available Today</option>
                                <option value="tomorrow">Available Tomorrow</option>
                                <option value="all">Available next 7 days</option>
                              </Form.Select>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                    <Grid item lg={2} md={2} sm={12} xs={12}>
                      <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                        <Button onClick={() => ResetForm()} sx={{ width: { xs: '100%', md: 'auto' }, my: { xs: 2, md: 0 }, borderColor: theme.palette.common.white, color: theme.palette.common.white }} variant='outlined' color={'primary'}>
                          Reset Filter
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item lg={6} md={3} sm={12} xs={12}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', height: '100%', alignItems: 'center', gap: { xs: 0, sm: 0, md: 1 }, color: "#fff" }}>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', marginBottom: '0px', marginRight: '7px' }}>Sort By</Form.Label>
                        <Form.Group
                          style={{ textAlign: "left", marginTop: 0 }}
                          controlId="name"
                        >
                          <Form.Select
                            name="sortby"
                            value={formik.values.sortby}
                            onChange={(e) => {
                              formik.setFieldValue('sortby', e.target.value);
                              formik.handleSubmit();
                            }}
                          >
                            <option value={""}>Select</option>
                            <option value="LowtoHigh">Price: Low to High</option>
                            <option value="HightoLow">Price: High to Low</option>
                            <option value="experience">Experience</option>
                          </Form.Select>
                        </Form.Group>
                      </Box>
                    </Grid>
                  </Grid>
                </Container>
              </Toolbar>
              <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={12} xs={12}>
                  <Card>
                    <Container fluid>
                      <CardContent>
                        <Typography sx={{ textAlign: 'left', lineHeight: '29px' }} variant="h5" component="div">
                          {doctorValue?.total} doctors available in {formik?.values?.location}
                        </Typography>
                        <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                          <img width={'20px'} height={'20px'} src={img1} /> Book appointments with minimum wait-time & verified doctor details
                        </Typography>
                      </CardContent>
                      {doctorValue?.data && doctorValue?.data?.map((value, index) => {
                        return (
                          <React.Fragment key={`Cards${index}`}>
                            <Grid container spacing={0}>
                              <Grid item lg={8} md={8} sm={12} xs={12}>
                                <Stack
                                  direction={{ xs: "row", md: 'row' }}
                                  spacing={2}
                                  sx={{
                                    mt: 2
                                  }}
                                >
                                  <Box sx={{ width: '180px', height: '180px', borderRadius: '5px', overflow: 'hidden', textAlign: 'left' }}>
                                    {value?.profile_picture ? <img height={'100%'} width={'100%'} src={value?.profile_picture} alt={value.doctorName} /> : <img height={'100%'} width={'100%'} src={img2} alt={value.doctorName} />}
                                  </Box>
                                  <Box>
                                    <Typography sx={{ fontSize: '16px', textAlign: 'left', color: '#76B757', fontWeight: '600' }} variant="h6" component="div">
                                      {value.doctorName}
                                    </Typography>
                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                      {value.specialization}
                                    </Typography>
                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                      {value.experience} years
                                    </Typography>
                                    {/* <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal', my: 2 }} color="text.secondary" gutterBottom>
                                      <img height={'31.92px'} width={'102.16px'} src={img3} /> Assisted Surgery Experience
                                    </Typography> */}
                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                      <span style={{ fontWeight: 600 }}>{value.city},{value.state}</span> <br />
                                      ₹{value.consultationfee} Consultation fee at clinic
                                    </Typography>
                                    <Typography sx={{ textAlign: 'left', fontSize: 14, color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                                      {value.address}
                                    </Typography>
                                    <Box sx={{ textAlign: "left" }}>
                                      <Rating precision={0.5} name="read-only" size="small" value={value?.rating ? value?.rating : 0} readOnly />
                                    </Box>
                                    {/* <Divider sx={{
                                      my: 2,
                                      borderStyle: 'dashed',
                                      borderColor: '#D9D9D9'
                                    }} /> */}
                                    <Box sx={{
                                      display: 'flex',
                                      alignItems: 'flex-end',
                                      mt: 3
                                    }}>
                                    </Box>
                                  </Box>
                                </Stack>
                              </Grid>
                              <Grid item lg={4} md={4} sm={12} xs={12}>
                                <Stack sx={{ height: '100%' }} direction='row' alignItems={'flex-end'} spacing={0}>
                                  <Box sx={{ width: '100%' }}>
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', my: 2 }}>
                                      <CustomButton sx={{
                                        fontWeight: 700,
                                        fontSize: '14px',
                                      }} onClick={() => {
                                        navigate(`/doctor-detail/${value._id}/${value.doctorName.replace(/\s+/g, "-")}`, {
                                          state: {
                                            metaTitle: `${value?.doctorName} -  ${value?.specialization} in ${value.state}. ${value.metaData ? value.metaData : ""} - Book Appointment`,
                                            doctorDetailID: `${value._id}`
                                          }
                                        });

                                      }} variant='outlined' color='secondary'>
                                        View Profile
                                      </CustomButton>
                                    </Box>
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                                      <CustomButton onClick={(e) => handleChange(index, e)} variant='contained' color='secondary'>
                                        <CustomTitle>Book Appointment</CustomTitle>
                                      </CustomButton>
                                    </Box>
                                    {/* <Nav.Link  style={{ textDecoration: 'none' }}> */}
                                    <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', mt: 2, textDecoration: 'none' }}>
                                      <CustomButton component="a" href="tel:+91 8929280230" disabled={value.contactNumber ? false : true} variant='outlined' color='secondary'>
                                        Call Now
                                      </CustomButton>
                                    </Box>
                                    {/* </Nav.Link> */}
                                  </Box>
                                </Stack>
                              </Grid>
                              <Grid item lg={12} md={12} sm={12} xs={12}>
                                {checked.open == true && index == checked.index &&
                                  <Box sx={{ my: checked.open == true && index == checked.index ? 4 : 0 }}>
                                    <Slide key={`Cards${index}`} direction="up" in={checked.open} mountOnEnter unmountOnExit>
                                      <Container>
                                        <Card>
                                          <CardContent>
                                            {checked.open == true && index == checked.index && <ClinicForm setChecked={setChecked} ClinicData={value} />}
                                          </CardContent>
                                        </Card>
                                      </Container>
                                    </Slide>
                                  </Box>}
                              </Grid>
                            </Grid>
                            <Divider sx={{
                              my: 2,
                            }} />
                          </React.Fragment>
                        )
                      })}
                    </Container>
                  </Card>
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                  <Card>
                    <Container fluid>
                      <CardContent>
                        <Typography sx={{ textAlign: 'left', fontSize: '18px', mb: 1, fontWeight: 600 }} variant="h5" component="div">
                          Get an appointment with verified medical practitioner near you
                        </Typography>
                        <AppointmentForm xs={12} lg={12} md={12} sm={12} />
                        {/* <Form onSubmit={handleSubmit}>
                          <Row className="mb-3">
                            <Col xs={12} md={12} lg={12}>
                              <Form.Group controlId="name" style={{ textAlign: "left" }}>
                                <Form.Label>Patient's Name</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={posts.name}
                                  name="name"
                                  onChange={handleInputChange}
                                  placeholder="Enter Name"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                              <Form.Group style={{ textAlign: "left", marginTop: 5 }} controlId="contactNumber">
                                <Form.Label>Patient's Mobile Number</Form.Label>
                                <Form.Control
                                  type="number"
                                  name="contactNumber"
                                  value={posts.contactNumber}
                                  onChange={handleInputChange}
                                  placeholder="Enter Mobile Number"
                                />
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                              <Form.Group style={{ textAlign: "left", marginTop: 5 }} controlId="clinic">
                                <Form.Label>Select Clinic</Form.Label>
                                <Form.Select
                                  name="clinic"
                                  value={posts.clinic}
                                  onChange={handleInputChange}
                                >
                                  <option value={0}>Not Selected</option>
                                  {city.map((el, id) => {
                                    return (
                                      <option key={id} value={el._id}>
                                        {el.clinicName}, {el.city}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col xs={12} md={12} lg={12}>
                              <Form.Group
                                style={{ textAlign: "left", marginTop: 5 }}
                                controlId="specialization"
                              >
                                <Form.Label>Select Specialization</Form.Label>
                                <Form.Select
                                  name="specialization"
                                  value={posts.specialization}
                                  onChange={handleInputChange}
                                >
                                  <option value={0}>Not Selected</option>
                                  {specialization.map((el, id) => {
                                    return (
                                      <option key={id} value={el._id}>
                                        {el.specialization}
                                      </option>
                                    );
                                  })}
                                </Form.Select>
                              </Form.Group>
                            </Col>
                          </Row>
                          <div style={{ textAlign: "left", marginTop: 5 }}>
                            <Button variant='contained' type='submit' color='secondary' sx={{ borderRadius: '8px', width: '100%', color: 'white', fontSize: '16px', textTransform: 'capitalize', display: 'grid' }}>
                              Verify OTP
                            </Button>
                          </div>
                        </Form> */}
                      </CardContent>

                    </Container>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </ThemeProvider>
        </Container>
      </div >
    </>
  )
}

export default Consult
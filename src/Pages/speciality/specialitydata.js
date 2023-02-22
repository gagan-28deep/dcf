import { Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Card, Col, Collapse, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import HTTPrequest from '../../Config/HTTP_request';
import { useSearchProvider } from '../../provider/searchProvider';


const SpecialityData = (props) => {
    const { toggle, openNav } = props;
    const { formik } = useSearchProvider();
    const navigate = useNavigate();
    const [speciality, setSpeciality] = useState([]);
    const api = {
        path: "specialization",
        method: "GET",
    };
    const fetchData = async () => {
        const data = await HTTPrequest(api);
        if (data && data.data.status === 200) {
            setSpeciality(data.data);
            console.log('data.data', data.data)
        } else if (data && data.data.status === 401) {
            console.log("unauthorized user...");
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>

            <Toolbar sx={{ display: { md: 'flex', sm: 'block', xs: 'block' } }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography sx={{ fontSize: { md: '30px', sm: '25px', xs: '25px' }, textAlign: { md: 'left', sm: 'center', xs: 'center' }, lineHeight: { md: '36px', sm: '22px', xs: '22px' }, fontWeight: 700, mb: 2 }} variant="h6" component="div">
                        {speciality?.count}+ Specialties
                    </Typography>
                    <Typography sx={{ textAlign: { md: 'left', sm: 'center', xs: 'center' }, fontSize: '14px', color: '#414146', fontStyle: 'normal' }} color="text.secondary" gutterBottom>
                        Find your ideal doctor without waiting in lines or waiting for months to get an appointment.
                    </Typography>
                </Box>

                <Button onClick={openNav} sx={{ borderRadius: '28px', fontSize: { md: '0.9375rem', sm: '12px', xs: '12px' }, marginTop: { xs: '5px', sm: '5px', md: '0px' } }} variant='outlined' color='secondary'>
                    {toggle ? 'Hide Specialities' : 'See all Specialities'}
                </Button>
            </Toolbar>
            <Row>
                {speciality?.data && speciality?.data.map((el, id) => {
                    if (!toggle) {
                        if (id > 5) {
                            return "";
                        }
                    }
                    return (
                        <>
                            <Col style={{ height: `100%` }} key={id} xs={6} md={3} lg={2}>
                                {toggle ? <Collapse
                                    orientation="vertical"
                                    in={toggle}
                                // collapsedSize={"100%"}
                                >
                                    <Box sx={{ my: 2 }}>
                                        <Card style={{ cursor: 'pointer' }} border="light" onClick={() => {
                                            formik.setFieldValue('name', el.name.trim())
                                            formik.handleSubmit()
                                            // navigate(`/doctor/search?specialization=${el.name}`, { state: { name: el?.name.trim() } })
                                            // formik.handleSubmit();
                                        }}>
                                            <Card.Img variant="top" src={el.image} />
                                            <Card.Body>
                                                <Card.Text
                                                    style={{
                                                        fontSize: "0.9rem",
                                                        textAlign: "center",
                                                        fontWeight: "bold"

                                                    }}
                                                >
                                                    {el.name}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Box>
                                </Collapse>
                                    :
                                    <Box sx={{ my: 2 }}>
                                        <Card border="light" onClick={() => {
                                            formik.setFieldValue('name', el.name.trim())
                                            formik.handleSubmit()
                                            // navigate(`/doctor/search?specialization=${el.name}`, { state: { name: el?.name.trim() } })
                                            // formik.handleSubmit();
                                        }}>
                                            <Card.Img variant="top" src={el.image} />
                                            <Card.Body>
                                                <Card.Text
                                                    style={{
                                                        fontSize: "0.9rem",
                                                        textAlign: "center",
                                                        fontWeight: "bold"

                                                    }}
                                                >
                                                    {el.name}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    </Box>}
                            </Col>
                        </>
                    );
                })}
            </Row>
        </>
    )
}

export default SpecialityData
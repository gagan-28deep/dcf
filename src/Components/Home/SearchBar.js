import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import searchimg from "../../Assets/images/home page/search.png";
import markerimg from "../../Assets/images/home page/marker.png";
import HTTPrequest from "../../Config/HTTP_request";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import './home.css';
import Select from 'react-select'
import { Box, Divider, Grid } from "@mui/material";
import { ReactSelectBox } from "../form";
import { useFormik } from "formik";
import { Form } from "react-bootstrap";
import { apiAdminConfig } from "../../utils/api";
import { useSearchProvider } from "../../provider/searchProvider";

function Searchbar({ onClick, variant }) {
  const navigate = useNavigate();
  const location = useLocation();
  const locationData = location?.state?.location;
  const defaultName = location?.state?.name
  const [cityData, setCityData] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState([]);
  const { formik } = useSearchProvider();
  // console.log('searchDoctorsearchDoctor123', defaultName, location)

  // const formik = useFormik({
  //   initialValues: {
  //     location: locationData ? locationData : 'Delhi',
  //     name: '',
  //   },
  //   onSubmit: async (values) => {
  //     console.log('values.name', values.name)
  //     await apiAdminConfig.post(`searchDoctor?name=${values.name ? values.name : ""}&city=${values.location}&day=${location?.state?.day ? location?.state?.day : 'today'}&type=${location?.state?.type ? location?.state?.type : ''}&sortby=${location?.state?.sortby ? location?.state?.sortby : ""}`).then((response) => {
  //       if (response && response.data.code === 200) {
  //         console.log('searchDoctorsearchDoctor', response?.data)
  //         // setSearch(data.data.data);
  //         navigate(`/doctor/search`, {
  //           state: {
  //             value: response?.data,
  //             location: values?.location,
  //             name: values?.name,
  //             day: location?.state?.day ? location?.state?.day : "",
  //             type: location?.state?.type ? location?.state?.type : "",
  //             sortby: location?.state?.sortby
  //           },
  //         });
  //       } else if (response && response.data.code === 401) {
  //         console.log("unauthorized user...");
  //       }
  //     }).catch((error) => {
  //       console.log('searchbarError', error)
  //     })

  //   },
  //   enableReinitialize: true
  // });

  // useEffect(() => {
  //   if (defaultName) {
  //     formik.setFieldValue('name', defaultName)
  //   }
  // }, [defaultName])

  // useEffect(() => {
  //   if (location?.state?.day || location?.state?.type) {
  //     formik.handleSubmit();
  //   }
  // }, [formik.values?.location, location?.state?.type, location?.state?.day, location?.state?.sortby])

  const fetchCity = async (value) => {
    await apiAdminConfig.get('distinctCities').then((response) => {
      if (response.status === 200) {
        let data = response?.data;
        let cities = [];
        for (let item of data) {
          cities.push({ value: item, label: item });
        }
        setCityData(cities);
      }
    }).catch((error) => {
      console.log('locationError', error);
    })
  };

  useEffect(() => {
    fetchCity();
  }, []);
  console.log('locationlocation', location)


  const fetchDoctors = async () => {
    await apiAdminConfig.post(`searchDoctor?name=${query}&city=${formik.values.location}`).then((response) => {
      if (response.status === 200) {
        console.log('doctorData', response)
        let data = response?.data?.data;
        let specializationData = response?.data?.specialization;
        let doctorData = [];
        console.log("specializationData", specializationData)
        for (let item of data) {
          doctorData.push({ value: item?.name, label: item?.name });
        }
        for (let item of specializationData) {
          doctorData.push({ value: item?.specialization, label: item?.specialization });
        }
        setDoctors(doctorData);
      }
    }).catch((error) => {
      console.log('doctorError', error);
    })
  };

  useEffect(() => {
    if (formik.values.location) {
      fetchDoctors();
    }
  }, [formik.values.location]);


  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <Box sx={{ border: { md: '2px solid #ececec', sm: 'none', xs: 'none' }, borderRadius: { md: '50rem', lg: '50rem', xs: 'none' }, background: { md: '#fff', sm: 'transparent', xs: 'transparent' }, overFlow: 'hidden', position: 'relative' }} onClick={onClick} className="mb-0 p-0">
          <Grid container spacing={{ xs: 1, md: 0 }}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <InputGroup style={{ flexWrap: 'nowrap' }}>
                <InputGroup.Text
                  className="marker"
                >
                  <img src={markerimg} alt="location.png" />
                </InputGroup.Text>
                <ReactSelectBox
                  classNames="form-controls-1"
                  options={cityData}
                  placeholder="Search City"
                  value={formik.values.location}
                  isLoading={!cityData?.length}
                  isClearable={true}
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue('location', e.value);
                      formik.handleSubmit();
                    } else {
                      formik.setFieldValue('location', null);
                      formik.handleSubmit();
                    }
                  }}
                />
                <InputGroup.Text
                  style={{ background: "#fff", border: '0px', borderRadius: '0px' }}
                >
                  <Divider orientation="vertical" flexItem sx={{ border: { md: '1px solid #D9D9D9', xs: 'none' }, display: { xs: 'none', sm: 'none', md: 'block' } }} />
                  {/* <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                      <div className="vr" />
                    </Box> */}
                </InputGroup.Text>
              </InputGroup>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <InputGroup style={{ flexWrap: 'nowrap', width: '100%' }}>
                <ReactSelectBox
                  classNames="form-controls"
                  options={doctors}
                  placeholder="Search doctors, specializations"
                  value={formik.values.name}
                  isLoading={!doctors?.length}
                  onInputChange={(e) => setQuery(e)}
                  isClearable={true}
                  onChange={(e) => {
                    if (e) {
                      formik.setFieldValue('name', e.value);
                      formik.handleSubmit();
                    } else {
                      formik.setFieldValue('name', null);
                      formik.handleSubmit()
                    }
                  }}
                />
                <InputGroup.Text
                  className="search-img"
                >
                  <button style={{ border: 'none', background: 'transparent' }} type="submit">
                    <img src={searchimg} alt="location.png" />
                  </button>
                </InputGroup.Text>
              </InputGroup>
            </Grid>
          </Grid>
        </Box>
      </Form>
    </>
  );
}

export default Searchbar;

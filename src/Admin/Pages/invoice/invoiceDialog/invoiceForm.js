import { Box, Button, Grid } from '@mui/material'
import React from 'react'
import InvoiceTable from './invoiceTable';
import AddIcon from '@mui/icons-material/Add';
import { TextBox, ReactAdminSelectBox } from '../../../../Components/form';
import { apiAdminConfig } from '../../../../utils/api';
import { reject } from 'lodash';
import { Country, State, City } from 'country-state-city';
import { Form } from 'react-bootstrap';

const InvoiceForm = ({ _id, formik, defaultItems }) => {
    const [cityData, setCityData] = React.useState([]);
    const [customerName, setCustomerName] = React.useState([]);
    const [doctorName, setDoctorName] = React.useState([]);
    console.log('formikformik', formik)
    const state = State.getStatesOfCountry("IN").map((item) => ({
        label: item?.name,
        value: item?.name,
    }));

    console.log("countryIdcountryId", state);

    const fetchCustomer = async (value) => {
        await apiAdminConfig.get('patient').then((response) => {
            if (response.status === 200) {
                let data = response?.data?.data;
                let patients = [];
                for (let item of data) {
                    patients.push({ value: `${item?._id}/${item?.patient_name}`, label: `${item?.patient_name} - (M)- ${item?.contact_number}` });
                }
                setCustomerName(patients);
            }
        }).catch((error) => {
            console.log('locationError', error);
        })
    };

    React.useEffect(() => {
        fetchCustomer();
    }, []);

    const fetchDoctor = async () => {
        await apiAdminConfig.get('doctor_admin').then((response) => {
            if (response.status === 200) {
                let data = response?.data?.data;
                let doctors = [];
                for (let item of data) {
                    doctors.push({ value: `${item?._id}/${item?.doctorName}`, label: `${item?.doctorName} - (M)- ${item?.contactNumber}` });
                }
                setDoctorName(doctors);
            }
        }).catch((error) => {
            console.log('locationError', error);
        })
    };

    React.useEffect(() => {
        fetchDoctor();
    }, []);

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

    React.useEffect(() => {
        fetchCity();
    }, []);

    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            // height: "57.62px"
        }),
        menu: (provided, state) => ({
            ...provided,
            background: "#ffffff",
            zIndex: 1200
        })
    }

    const addNewRow = () => {
        formik.setFieldValue("items", [...formik.values.items, defaultItems])
    }

    const handleRemove = (index) => {
        // if (formik.values.items && index != 0) {
        const data = formik.values.items.splice(index, 1)
        formik.setFieldValue("items", reject(formik.values.items, data));
        formik.setFieldTouched(`items[${index}].title`, false);
        formik.setFieldTouched(`items[${index}].sac`, false);
        formik.setFieldTouched(`items[${index}].qty`, false);
        formik.setFieldTouched(`items[${index}].price`, false);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="customer_note"
                >
                    <Form.Label>Patient Name</Form.Label>
                    <ReactAdminSelectBox
                        classNames="p-0"
                        options={customerName}
                        placeholder="Patient Name"
                        value={formik.values.patient_name}
                        // disabled={formik.values.place_supply}
                        isLoading={!customerName?.length}
                        isClearable={true}
                        styles={customStyles}
                        onChange={(e) => {
                            if (e) {
                                const getValue = e.value.split("/");
                                // console.log("patient_namepatient_name", e.value.split("/"))
                                formik.setFieldValue('patient_name', getValue[1]);
                                formik.setFieldValue('patient', getValue[0]);
                            } else {
                                formik.setFieldValue('patient_name', null);
                                formik.setFieldValue('patient', null);
                            }
                        }}
                        error={formik.touched.patient_name && formik.errors.patient_name}
                    />
                </Form.Group>
            </Grid>
            <Grid item xs={12} md={6}>
                <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="customer_note"
                >
                    <Form.Label>Place of Supply</Form.Label>
                    <ReactAdminSelectBox
                        classNames="p-0"
                        options={state.length && state}
                        placeholder="Place of Supply"
                        value={formik.values.place_supply}
                        disabled={formik.values.place_supply}
                        isLoading={!state?.length}
                        isClearable={true}
                        styles={customStyles}
                        onChange={(e) => {
                            if (e) {
                                formik.setFieldValue('place_supply', e.value);
                            } else {
                                formik.setFieldValue('place_supply', null);
                            }
                        }}
                        error={formik.touched.place_supply && formik.errors.place_supply}
                    />
                </Form.Group>
            </Grid>
            <Grid item xs={12} md={_id !== "New" ? 6 : 12}>
                <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="customer_note"
                >
                    <Form.Label>Doctor Name</Form.Label>
                    <ReactAdminSelectBox
                        classNames="p-0"
                        options={doctorName}
                        placeholder="Doctor Name"
                        value={formik.values.doctor_name}
                        // disabled={formik.values.place_supply}
                        isLoading={!doctorName?.length}
                        isClearable={true}
                        styles={customStyles}
                        onChange={(e) => {
                            if (e) {
                                const getValue = e.value.split("/");
                                formik.setFieldValue('doctor_name', getValue[1]);
                                formik.setFieldValue('doctor', getValue[0]);
                            } else {
                                formik.setFieldValue('doctor_name', null);
                            }
                        }}
                        error={formik.touched.doctor_name && formik.errors.doctor_name}
                    />
                </Form.Group>
            </Grid>
            {_id !== "New" && <Grid item xs={12} md={6}>
                <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="invoice_num"
                >
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control
                        type="text"
                        value={formik.values.invoice_num}
                        name="invoice_num"
                        disabled={_id === "New" ? true : false}
                        onChange={(e) => {
                            formik.handleChange(e);
                        }}
                        placeholder="Invoice Number"
                        className="mb-0"
                        isInvalid={
                            formik.touched.invoice_num &&
                            formik.errors.invoice_num
                        }
                    />
                    {formik.errors.invoice_num && (
                        <Form.Control.Feedback type="invalid" style={{ color: '#dc3545', fontSize: "13px" }}>
                            {formik.errors.invoice_num}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Grid>}
            <Grid item xs={12} md={12}>
                <Form.Group
                    style={{ textAlign: "left" }}
                    controlId="subject"
                >
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                        type="text"
                        as="textarea"
                        rows={4}
                        value={formik.values.subject}
                        name="subject"
                        onChange={(e) => {
                            formik.handleChange(e);
                        }}
                        placeholder="Subject"
                        className="mb-0"
                        isInvalid={
                            formik.touched.subject &&
                            formik.errors.subject
                        }
                    />
                    {formik.errors.subject && (
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.subject}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>
            </Grid>
            <Grid item xs={12}>
                <InvoiceTable formik={formik} handleRemove={handleRemove} />
            </Grid>
            <Grid item xs={12}>
                <Box sx={{ textAlign: "left" }}>
                    <Button onClick={addNewRow} startIcon={<AddIcon sx={{ color: '#fff' }} color='inherit' />} variant="contained" color="primary">
                        Add another Item
                    </Button>
                </Box>
            </Grid>
        </Grid >
    )
}

export default InvoiceForm
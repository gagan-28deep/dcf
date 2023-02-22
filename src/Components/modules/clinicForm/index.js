import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Slide, Stack, styled } from '@mui/material';
import { useFormik } from 'formik';
import moment from 'moment';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { apiAdminConfig } from '../../../utils/api';
import { SelectBox } from '../../form';
import ConsultTabBox from '../consult/ConsultTabBox';


const CustomFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
    '.MuiTypography-root': {
        fontSize: '1.0714285714285714rem',
        [theme.breakpoints.down('md')]: {
            fontSize: '14px'
        }
    }
}))

const ClinicForm = (props) => {
    const { ClinicData, setChecked } = props;
console.log('ClinicData------------>',ClinicData);
    const [data, setData] = React.useState({
        open: false,
        SlotTotal: 0,
        clinicData: []
    });

    const formik = useFormik({
        initialValues: {
            doctorId: ClinicData._id,
            clinic_Id: "",
            date: moment().format("YYYY-MM-DD"),
            // date: '2022-10-01',
            type: "offline"
        },
        validate: (values) => {
            const errors = {};

            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            let url = `getRoomSlotDetailsByDrAndClinicId?type=${values.type}`;
            const data = {
                doctorId: values.doctorId,
                clinicId: values.clinic_Id?._id,
                date: values.date,
            }
            await apiAdminConfig.post(url, data)
                .then((response) => {
                    console.log('responseresponse12', response)
                    if (response && response?.data?.success === true) {
                        setData({
                            open: true,
                            SlotTotal: response?.data?.total,
                            clinicData: response?.data?.data
                        })
                    }
                })
                .catch((error) => {
                    const { response } = error;
                    if (response.status === 406) {
                        for (const [key, value] of Object.entries(values)) {
                            if ((response.data.type = "phone")) {
                                setErrors({ phoneNo: response.data.message });
                            }
                            if ((response.data.type = "email")) {
                                setErrors({ email: response.data.message });
                            }
                        }
                    }
                });
        },
        enableReinitialize: true,
    });
    console.log('clinic234', formik.values.clinic_Id)

    useEffect(() => {
        if (formik.values.clinic_Id) {
            formik.handleSubmit()
        }
    }, [formik.values])

    return (
        <Box sx={{ my: 3 }}>
            <form onSubmit={formik.handleSubmit}>
                <SelectBox
                    fullWidth={true}
                    label="Select Clinic"
                    value={formik.values.clinic_Id}
                    sx={{ textAlign: 'left' }}
                    onChange={(e) => {
                        formik.setFieldValue("clinic_Id", e.target.value);
                    }}
                    options={ClinicData?.clinics}
                    color="success"
                    name="clinic_Id"
                    error={formik.touched.clinic_Id && formik.errors.clinic_Id}
                    helperText={formik.touched.clinic_Id && formik.errors.clinic_Id}
                />
                <FormControl fullWidth={true}>
                    <FormLabel
                        sx={{ textAlign: 'left' }}
                        color='secondary'
                        id="demo-controlled-radio-buttons-group">Choose Type</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controllFed-radio-buttons-group"
                        value={formik.values.type}
                        onChange={(e) => {
                            if (e) {
                                formik.setFieldValue('type', e.target.value)
                            }
                        }}

                    >
                        <Stack direction={'row'}>
                            <CustomFormControlLabel value="offline" control={<Radio color='secondary' />} label="In Clinic Consult" />
                            <CustomFormControlLabel value="online" control={<Radio color='secondary' />} label="Video Consult" />
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </form>

            <Box sx={{ my: 4 }}>
                <Slide direction="up" in={data.open} mountOnEnter unmountOnExit>
                    <Box>
                        <ConsultTabBox setChecked={setChecked} formikObject={formik} FormikData={formik.values} TabData={data} AllData={ClinicData} />
                    </Box>
                </Slide>
            </Box>
        </Box>
    )
}

export default ClinicForm
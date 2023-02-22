import { Button, Grid } from '@mui/material'
import React from 'react'
import InvoiceTable from './invoiceTable';
import AddIcon from '@mui/icons-material/Add';
import { TextBox, ReactAdminSelectBox } from '../../../../Components/form';
import { apiAdminConfig } from '../../../../utils/api';
import { reject } from 'lodash';
const InvoiceForm = ({ formik, defaultItems, setGrantTotal, setSubtotal, grandTotal, subTotal }) => {
    const [cityData, setCityData] = React.useState([]);
    console.log('formikformik', formik)

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
            height: "57.62px"
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
        if (formik.values.items && index != 0) {
            const data = formik.values.items.splice(index, 1)
            formik.setFieldValue("items", reject(formik.values.items, data))
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <TextBox
                    fullWidth
                    label={"Customer Name *"}
                    name="pateint_name"
                    disabled={formik.values.pateint_name}
                    value={formik.values.pateint_name}
                    onChange={formik.handleChange}
                    error={formik.touched.pateint_name && formik.errors.pateint_name}
                    helperText={formik.touched.pateint_name && formik.errors.pateint_name}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <ReactAdminSelectBox
                    classNames="p-0"
                    options={cityData}
                    placeholder="Place of Supply *"
                    value={formik.values.place_supply}
                    disabled={formik.values.place_supply}
                    isLoading={!cityData?.length}
                    isClearable={true}
                    styles={customStyles}
                    onChange={(e) => {
                        if (e) {
                            formik.setFieldValue('place_supply', e.value);
                        } else {
                            formik.setFieldValue('place_supply', null);
                        }
                    }}
                />
                {/* <TextBox
                    fullWidth
                    label={"Place of Supply *"}
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    error={formik.touched.state && formik.errors.state}
                    helperText={formik.touched.state && formik.errors.state}
                /> */}
            </Grid>
            <Grid item xs={12} md={6}>
                <TextBox
                    fullWidth
                    label={"Doctor Name *"}
                    name="doctor_name"
                    disabled={formik.values.doctor_name}
                    value={formik.values.doctor_name}
                    onChange={formik.handleChange}
                    error={formik.touched.doctor_name && formik.errors.doctor_name}
                    helperText={formik.touched.doctor_name && formik.errors.doctor_name}
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <TextBox
                    fullWidth
                    label={"Invoice Number *"}
                    name="invoice_num"
                    disabled={formik.values.invoice_num}
                    value={formik.values.invoice_num}
                    onChange={formik.handleChange}
                    error={formik.touched.invoice_num && formik.errors.invoice_num}
                    helperText={formik.touched.invoice_num && formik.errors.invoice_num}
                />
            </Grid>
            <Grid item xs={12} md={12}>
                <TextBox
                    fullWidth
                    rows={4}
                    multiline
                    label={"Subject"}
                    name="subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    error={formik.touched.subject && formik.errors.subject}
                    helperText={formik.touched.subject && formik.errors.subject}
                />
            </Grid>
            <Grid item xs={12}>
                <InvoiceTable grandTotal={grandTotal} subTotal={subTotal} setSubtotal={setSubtotal} setGrantTotal={setGrantTotal} formik={formik} handleRemove={handleRemove} />
            </Grid>
            <Grid item xs={12}>
                <Button onClick={addNewRow} startIcon={<AddIcon sx={{ color: '#fff' }} color='inherit' />} variant="contained" color="primary">
                    Add another line
                </Button>
            </Grid>
        </Grid >
    )
}

export default InvoiceForm
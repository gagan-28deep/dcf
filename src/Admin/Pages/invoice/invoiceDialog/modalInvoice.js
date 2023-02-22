import CloseIcon from '@mui/icons-material/Close';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { Box, Card, CardContent, Divider, Grid, IconButton, Stack, ThemeProvider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { sumBy } from 'lodash';
import * as React from 'react';
import { TextBox } from '../../../../Components/form';
import theme from '../../../../Components/theme';
import { useSnackbar } from '../../../../provider/snackbar';
import { apiAdminConfig } from '../../../../utils/api';
import InvoiceForm from './invoiceForm';

const InvoiceDialog = ({ open, _id, handleClose }) => {
    const snackbar = useSnackbar();
    const [subTotal, setSubtotal] = React.useState(0);
    const [grandTotal, setGrantTotal] = React.useState(0)

    const defaultItems = {
        title: "",
        qty: Number(0),
        price: Number(0),
        final_price: Number(0),
        discounted_price: Number(0),
        sac: "",
        tax: "0"
    }

    const formik = useFormik({
        initialValues: {
            doctor: "",
            patient: "",
            doctor_name: "",
            patient_name: "",
            customer_note: "",
            invoice_num: "",
            items: [],
            subject: "",
            total_amount: 0,
            place_supply: "",
            sub_total: 0
        },
        validate: (values) => {
            const errors = {};
            if (!values.patient_name) {
                errors.patient_name = "Patient name is required";
            }
            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            if (values.items.length) {
                values["sub_total"] = Math.round(sumBy(values.items, function (o) { return o.final_price; }));
                values["total_amount"] = Math.round(sumBy(values.items, function (o) { return o.final_price; }));
            }
            await apiAdminConfig.post(`/invoice/generate`, values).then((response) => {
                if (response?.data.status) {

                    snackbar({
                        message: response?.data?.message,
                        severity: "success",
                    });
                } else {
                    snackbar({
                        message: response?.data?.message,
                        severity: "error",
                    });
                }
            }).catch((error) => {
                console.log("invoiceError", error)
                snackbar({
                    message: "Something went wrong...",
                    severity: "error",
                });
            })
            console.log("InvoiceDialog", values);
            // handleClose();
        },
    });


    // const [value, setValue] = React.useState('tds');

    // const handleChange = (event) => {
    //     setValue(event.target.value);
    // };

    const bindData = async (id) => {
        await apiAdminConfig.get(`/invoice/generate/${id}`).then((response) => {
            if (response?.data?.status === true) {
                const { data } = response?.data;
                console.log('datadata', data)
                for (const [key] of Object.entries(formik.values)) {
                    if (key == "items") {
                        console.log("data?.items", data?.items)
                        let itemsData = [];
                        data?.items && data?.items.forEach((element) => {
                            itemsData.push({
                                title: element?.title,
                                qty: Number(element?.qty),
                                price: Number(element?.price),
                                final_price: Number(element?.final_price),
                                discounted_price: Number(element?.discounted_price),
                                sac: element.sac,
                                tax: element?.tax ? element?.tax : "0"
                            })
                        })
                        formik.setFieldValue("items", itemsData)
                    } else {
                        formik.setFieldValue([key], data[key])
                    }
                }
                console.log("invoice/generate", response?.data?.data)
            }
        }).catch((error) => {
            console.log('InvoiceError', error)
        })
    }

    console.log("datadataformiks", formik.values)
    React.useEffect(() => {
        if (_id) {
            bindData(_id)
        }
    }, [_id])

    return (
        <Box
            component="form"
        >
            <ThemeProvider theme={theme}>
                <Dialog
                    fullScreen={true}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    scroll='paper'
                >
                    <Stack direction={"row"} justifyContent="space-between">
                        <DialogTitle id="responsive-dialog-title">
                            <ReceiptIcon fontSize='large' /> {_id !== "New" ? "Edit Invoice" : "Add Invoice"}
                        </DialogTitle>
                        <DialogTitle id="responsive-dialog-title">
                            <IconButton onClick={handleClose}>
                                <CloseIcon fontSize='medium' />
                            </IconButton>
                        </DialogTitle>
                    </Stack>

                    <DialogContent dividers={'paper'}>
                        <DialogContentText sx={{ height: '100%' }}>
                            <InvoiceForm _id={_id} formik={formik} defaultItems={defaultItems} />
                            <Grid container spacing={2}>
                                <Grid item md={6} sx={{ my: 3 }}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'end', width: '100%' }}>
                                            <Stack sx={{ width: '100%' }} direction={"column"} spacing={2}>
                                                <Typography>
                                                    Customer Notes
                                                </Typography>
                                                <Box>
                                                    <TextBox
                                                        multiline={true}
                                                        rows={3}
                                                        label="Description"
                                                        name="customer_note"
                                                        value={formik.values.customer_note}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <Typography variant="body2">
                                                        Will be displayed on the invoice
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item md={6} sx={{ my: 3 }}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent sx={{ height: '100%' }}>
                                            <Stack spacing={2} sx={{ height: '100%' }}>
                                                <Stack direction={"row"} justifyContent="space-between">
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        Sub Total (₹)
                                                    </Typography>
                                                    <Typography>
                                                        {Math.round(sumBy(formik.values.items, function (o) { return o.final_price; }))}
                                                    </Typography>
                                                </Stack>
                                                <Stack direction={"row"} justifyContent="space-between">
                                                    <Typography sx={{ fontWeight: 'bold' }}>
                                                        Total Discount
                                                    </Typography>
                                                    <Typography>
                                                        {formik?.values?.discounted_price}
                                                    </Typography>
                                                </Stack>
                                                {/* <Stack direction={"row"} alignItems="baseline" justifyContent="space-between">
                                                    <Stack direction={"row"} spacing={4} width="100%">
                                                        <FormControl>
                                                            <RadioGroup
                                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                                name="controlled-radio-buttons-group"
                                                                value={value}
                                                                onChange={handleChange}
                                                            >
                                                                <Stack direction="row" alignItems="center">
                                                                    <FormControlLabel color='primary' value="tds" control={<Radio color="primary" />} label="TDS" />
                                                                    <FormControlLabel color='primary' value="tcs" control={<Radio color="primary" />} label="TCS" />
                                                                </Stack>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <Box sx={{ width: '100%' }}>
                                                            <SelectBox
                                                                label="Select"
                                                                fullWidth={false}
                                                                options={selectOptions}
                                                            />
                                                        </Box>
                                                    </Stack>
                                                    <Typography>
                                                        -00.00
                                                    </Typography>
                                                </Stack> */}
                                                {/* <Stack direction={"row"} alignItems="center" justifyContent="space-between">
                                                    <Stack direction={"row"} spacing={2}>
                                                        <Box sx={{ width: '100px' }}>
                                                            <TextBox
                                                                fullWidth
                                                                label="Adjustment"
                                                            />
                                                        </Box>
                                                        <Box sx={{ width: '100px' }}>
                                                            <TextBox
                                                                fullWidth
                                                                label="Adjustment"
                                                            />
                                                        </Box>
                                                    </Stack>
                                                    <Typography>
                                                        00.00
                                                    </Typography>
                                                </Stack> */}
                                                {/* <Stack direction={"row"} justifyContent="space-between">
                                                    <Typography>
                                                        Round Off
                                                    </Typography>
                                                    <Typography>
                                                        0.00
                                                    </Typography>
                                                </Stack> */}
                                                <Box sx={{ display: 'flex', alignItems: 'end', height: '100%', width: '100%' }}>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Divider />
                                                        <Stack sx={{ mt: 2 }} direction={"row"} justifyContent="space-between">
                                                            <Typography sx={{ fontWeight: 'bold' }}>
                                                                Total (₹)
                                                            </Typography>
                                                            <Typography>
                                                                {Math.round(sumBy(formik.values.items, function (o) { return o.final_price; }))}
                                                            </Typography>
                                                        </Stack>
                                                    </Box>
                                                </Box>
                                            </Stack>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </DialogContent>

                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" onClick={formik.handleSubmit} autoFocus>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </Box>
    );
}
export default InvoiceDialog;
import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import DateSelect from "../../../Components/Datepicker/Dateselect";
import { useSnackbar } from "../../../provider/snackbar";
import { includes, sumBy } from "lodash";
import InvoiceForm from "./invoiceDialog/invoiceForm";
import { Box, Card, CardContent, Divider, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import theme from "../../../Components/theme";
import * as Yup from 'yup';

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();

  const PaymentOptions = [
    {
      value: "",
      label: "Choose an Option"
    },
    {
      value: "cash",
      label: "Cash"
    },
    {
      value: "online",
      label: "Online"
    }
  ]

  const defaultItems = {
    title: "",
    qty: Number(1),
    price: Number(0),
    final_price: Number(0),
    discounted_price: Number(0),
    sac: "",
    tax: "0",
    totalgst: 0,
    totaldiscount: 0,
    subtotal: 0
  }

  const validationSchema = Yup.object().shape({
    subject: Yup.string("Subject is required").required("Subject is required"),
    payment_mode: Yup.string("Payment is required").required("Payment is required"),
    doctor_name: Yup.mixed("Doctor name is required").required("Doctor name is required"),
    patient_name: Yup.mixed("Doctor name is required").required("Patient name is required"),
    place_supply: Yup.mixed("Doctor name is required").required("Place supply is required"),
    items: Yup.array()
      .of(
        Yup.object().shape({
          title: Yup.string().required("Title is required"),
          sac: Yup.string().required("SAC is required"),
          // discounted_price: Yup.number().min(1, "Discount is required").required("Discount is required"),
          qty: Yup.number().min(1, "Quantity is required").required("Quantity is required"),
          price: Yup
            .number()
            .min(1, "Price is required")
            // .max(1, "Price is required")
            .integer().required("Price is required")
        })
      )
      .required('required'),
  })

  const formik = useFormik({
    initialValues: {
      doctor: "",
      patient: "",
      doctor_name: "",
      patient_name: "",
      customer_note: "",
      invoice_num: "",
      items: [defaultItems],
      subject: "",
      total_amount: 0,
      place_supply: "",
      sub_total: 0,
      total_discount: 0,
      total_gst: 0,
      payment_mode: ""
    },
    validationSchema,
    onSubmit: async (values, { setErrors }) => {
      formik.setTouched(true);
      if (values.items.length) {
        values["sub_total"] = (Math.round(sumBy(values.items, function (o) { return Number(o.subtotal); })));
        values["total_amount"] = Math.round(sumBy(values.items, function (o) { return o.final_price; }));
        values["total_discount"] = Math.round(sumBy(values.items, function (o) { return Number(o.totaldiscount); }));
        values["total_gst"] = Math.round(sumBy(values.items, function (o) { return Number(o.totalgst); }));
      }
        await apiAdminConfig.post(`/invoice/generate`, values).then((response) => {
          if (response?.data.status) {
            navigate('/master/invoice')
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

  // const bindData = async (id) => {
  //     await apiAdminConfig.get(`/invoice/generate/${id}`).then((response) => {
  //         if (response?.data?.status === true) {
  //             const { data } = response?.data;
  //             console.log('datadata', data)
  //             for (const [key] of Object.entries(formik.values)) {
  //                 if (key == "items") {
  //                     console.log("data?.items", data?.items)
  //                     let itemsData = [];
  //                     data?.items && data?.items.forEach((element) => {
  //                         itemsData.push({
  //                             title: element?.title,
  //                             qty: Number(element?.qty),
  //                             price: Number(element?.price),
  //                             final_price: Number(element?.final_price),
  //                             discounted_price: Number(element?.discounted_price),
  //                             sac: element.sac,
  //                             tax: element?.tax ? element?.tax : "0"
  //                         })
  //                     })
  //                     formik.setFieldValue("items", itemsData)
  //                 } else {
  //                     formik.setFieldValue([key], data[key])
  //                 }
  //             }
  //             console.log("invoice/generate", response?.data?.data)
  //         }
  //     }).catch((error) => {
  //         console.log('InvoiceError', error)
  //     })
  // }

  // console.log("invoiceError", formik.errors.items, formik?.errors && formik?.errors?.items)

  console.log("invoiceErrordatadataformiks12", formik.values?.items)
  // React.useEffect(() => {
  //     if (_id) {
  //         bindData(_id)
  //     }
  // }, [_id])


  return (
    <ThemeProvider theme={theme}>
      <Row className="mt-4">
        <Col md={6} style={{ textAlign: "left" }}>
          <h3 style={{ height: "40px" }}>Add Invoice</h3>
        </Col>
        <Col md={4}></Col>
        <Col md={2} style={{ textAlign: "left" }}>
          <Button
            onClick={() => {
              navigate(`/master/invoice`);
            }}
            variant="outlined"
            color="success"
          >
            Back
          </Button>
        </Col>
      </Row>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <div className="adminContant">
          <Card variant="outlined">
            <CardContent style={{ minHeight: "300px" }}>
              <InvoiceForm _id={id ? id : "New"} formik={formik} defaultItems={defaultItems} />
              <Grid container spacing={2}>
                <Grid item md={6} sx={{ my: 3 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'end', width: '100%' }}>
                      <Stack sx={{ width: '100%' }} direction={"column"} spacing={2}>
                        <Typography sx={{ textAlign: "left" }}>
                          Customer Notes
                        </Typography>
                        <Box sx={{ textAlign: "left" }}>
                          <Form.Label>Mode of Payment</Form.Label>
                          <Form.Group
                            style={{ textAlign: "left" }}
                            controlId="tax"
                          >
                            <Form.Select
                              aria-label="Select.."
                              name={`payment_mode`}
                              value={formik.values.payment_mode}
                              onChange={(e) => {
                                formik.setFieldValue(`payment_mode`, e.target.value);
                              }}
                              isInvalid={
                                formik.touched.payment_mode &&
                                formik.errors.payment_mode
                              }
                            >
                              {PaymentOptions && PaymentOptions.map((item) => (
                                <option value={item?.value}>{item?.label}</option>
                              ))}
                            </Form.Select>
                            {formik.errors.payment_mode && (
                              <Form.Control.Feedback type="invalid" style={{ color: '#dc3545', fontSize: "13px" }}>
                                {formik.errors.payment_mode}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                        </Box>
                        <Box>
                          <Form.Group
                            style={{ textAlign: "left" }}
                            controlId="customer_note"
                          >
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              type="text"
                              value={formik.values.customer_note}
                              name="customer_note"
                              onChange={(e) => {
                                formik.handleChange(e);
                              }}
                              placeholder="Note"
                              className="mb-0"
                              isInvalid={
                                formik.touched.customer_note &&
                                formik.errors.customer_note
                              }
                            />
                            {formik.errors.customer_note && (
                              <Form.Control.Feedback type="invalid">
                                {formik.errors.customer_note}
                              </Form.Control.Feedback>
                            )}
                          </Form.Group>
                          <Typography variant="body2" sx={{ textAlign: "left", mt: 1 }}>
                            Will be displayed on the invoice
                          </Typography>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item md={6} sx={{ my: 3 }}>
                  <Card variant="outlined" sx={{ height: '100%' }}>
                    <CardContent sx={{ height: '100%' }}>
                      <Stack spacing={2} sx={{ height: '100%' }}>
                        <Stack direction={"row"} justifyContent="space-between" sx={{ width: "100%" }}>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            Sub Total (₹)
                          </Typography>
                          <Typography>
                            {Math.round(sumBy(formik.values.items, function (o) { return (Number(o.qty) * Number(o.price)); }))}
                          </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent="space-between">
                          <Typography sx={{ fontWeight: 'bold' }}>
                            Total Discount (₹)
                          </Typography>
                          <Typography>
                            {Math.round(sumBy(formik.values.items, function (o) {
                              return ((Number(o.qty) * Number(o.price)) * Number(o.discounted_price)) / 100; }))}
                          </Typography>
                        </Stack>
                        <Stack direction={"row"} justifyContent="space-between">
                          <Typography sx={{ fontWeight: 'bold' }}>
                            Total GST (₹)
                          </Typography>
                          <Typography>
                            {Math.round(sumBy(formik.values.items, function (o) {
                              let total = 0;
                              let finalAmount = 0;
                              let totalTaxAmount = 0;
                              total += (Number(o.qty) * Number(o.price));
                              if (Number(o.discounted_price) > 0 && Number(o.price) > 0) {
                                finalAmount += (total - ((Number(total) * Number(o.discounted_price)) / 100));
                              } else {
                                finalAmount += total;
                              }
                              if (Number(o.tax) > 0 && Number(o.price) > 0) {
                                totalTaxAmount += (((Number(finalAmount) * Number(o.tax)) / 100));
                              }
                              return totalTaxAmount;
                            }))
                            }
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
                            <Divider sx={{ borderColor: "#000" }} />
                            <Stack sx={{ mt: 2, width: "100%" }} direction={"row"} justifyContent="space-between">
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
              <div style={{ textAlign: "right" }}>
                <Button
                  style={{ background: "#76B757" }}
                  variant="contained"
                  className="rounded"
                  type="submit"
                >
                  Submit
                </Button>{" "}
                <Button
                  style={{
                    borderColor: "#76B757",
                    color: "#76B757",
                  }}
                  variant="outlined"
                  className="rounded"
                  onClick={() => {
                    formik.resetForm();
                  }}
                >
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Form>
    </ThemeProvider>
  );
};

class AddInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
    };
  }
  render() {
    return (
      <div>
        {this.state.windowWidth >= 600 ? (
          <Sidebar>
            <Contant />
          </Sidebar>
        ) : (
          <div style={{ width: "95%", margin: "80px auto" }}>
            {" "}
            <Contant />
          </div>
        )}
      </div>
    );
  }
}

export default AddInvoice;

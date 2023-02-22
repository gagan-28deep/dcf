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
import { Formik, useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import DateSelect from "../../../Components/Datepicker/Dateselect";
import { Box, Card, CardContent, Divider, Grid, Stack, ThemeProvider, Typography } from "@mui/material";
import InvoiceForm from "./invoiceDialog/invoiceForm";
import { sumBy } from "lodash";
import { useSnackbar } from "../../../provider/snackbar";
import theme from "../../../Components/theme";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const { id } = useParams();

  const defaultItems = {
    title: "",
    qty: Number(1),
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
      if (!values.doctor_name) {
        errors.doctor_name = "Doctor name is required";
      }
      if (!values.subject) {
        errors.subject = "Subject is required";
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
    if (id) {
      bindData(id)
    }
  }, [id])

  return (
    <ThemeProvider theme={theme}>
      <Row className="mt-4">
        <Col md={6} style={{ textAlign: "left" }}>
          <h3 style={{ height: "40px" }}>Edit Invoice</h3>
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
                          {Math.round(sumBy(formik.values.items, function (o) { return o.final_price; }))}
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
    </ThemeProvider>
  );
};

class EditPatient extends Component {
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

export default EditPatient;

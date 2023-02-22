import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionSummary, Box, Button, Card, FormControl, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CollapseComponent from './collapse';
import RemoveIcon from '@mui/icons-material/Remove';
import { SelectBox, TextBox } from '../../../../Components/form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { includes, map, some, sumBy } from 'lodash';
import { Form } from 'react-bootstrap';
import { getIn } from 'formik';

const InvoiceTable = ({ formik, handleRemove }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const TaxableOptions = [
        {
            value: "0",
            label: "Non-Taxable"
        },
        {
            value: 5,
            label: "GST5 (5%)"
        },
        {
            value: 12,
            label: "GST12 (12%)"
        },
        {
            value: 18,
            label: "GST18 (18%)"
        },
        {
            value: 28,
            label: "GST28 (28%)"
        },
    ]

    const getFinalPrice = (price = 0, qty = 0, discounted_price = 0, index, tax = 0) => {
        let total = 0;
        let finalAmount = 0;
        let totalTaxAmount = 0;
        let totalgst = 0;
        let totaldiscount = 0
        let subTotal = 0

        subTotal += (Number(qty) * Number(price));

        formik.setFieldValue(`items[${index}].subtotal`, Math.round(subTotal))

        total += (Number(qty) * Number(price));

        if (Number(discounted_price) > 0 && Number(price) > 0) {
            totaldiscount += ((Number(total) * Number(discounted_price)) / 100);
            finalAmount += (total - ((Number(total) * Number(discounted_price)) / 100));
        } else {
            finalAmount += total;
            totaldiscount += 0
        }

        if (Number(tax) > 0 && Number(price) > 0) {
            totalgst += ((Number(finalAmount) * Number(tax)) / 100);
            totalTaxAmount += (finalAmount + ((Number(finalAmount) * Number(tax)) / 100));
        } else {
            totalTaxAmount += finalAmount;
            totalgst += 0;
        }

        formik.setFieldValue(`items[${index}].final_price`, Math.round(totalTaxAmount))
        formik.setFieldValue(`items[${index}].totalgst`, Math.round(totalgst))
        formik.setFieldValue(`items[${index}].totaldiscount`, Math.round(totaldiscount))
    }

    return (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>ITEM DETAILS</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">QUANTITY</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">RATE</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">DISCOUNT</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">TAX</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">AMOUNT</TableCell>
                        <TableCell sx={{ fontWeight: 600 }} align="center">REMOVE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formik?.values && formik?.values?.items.length >= 0 && formik?.values?.items.map((item, index) => {
                        return (
                            <TableRow
                                key={`items-${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Form.Group
                                        style={{ textAlign: "left" }}
                                        controlId="title"
                                    >
                                        <Form.Control
                                            type="text"
                                            name={`items[${index}].title`}
                                            value={item.title}
                                            // disabled={index === 0}
                                            onChange={(e) => {
                                                formik.setFieldValue(`items[${index}].title`, e.target.value)
                                            }}
                                            // onBlur={formik.handleBlur}
                                            placeholder="Item Name"
                                            className="mb-0"
                                            isInvalid={
                                                formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.title && formik?.touched && formik?.touched?.items &&
                                                formik?.touched?.items[index]?.title
                                            }
                                        />
                                        {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.title && (
                                            <Form.Control.Feedback style={{ fontSize: "13px" }} type="invalid">
                                                {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.title}
                                            </Form.Control.Feedback>
                                        )}

                                    </Form.Group>

                                    <Accordion
                                        sx={{
                                            '&.MuiAccordion-root:before': {
                                                height: "0px"
                                            }
                                        }}
                                        className='mt-2 border-0' expanded={expanded === index} onChange={handleChange(index)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                            sx={{
                                                '& .MuiAccordionSummary-content': {
                                                    alignItems: "center",
                                                    display: "flex",
                                                    justifyContent: "space-between"
                                                }
                                            }}
                                        >
                                            <Typography sx={{ marginBlockStart: "0em", marginBlockEnd: "0em", height: "max-content" }} component="p" variant='text.secondary'>SAC</Typography>
                                            <Box>
                                                <Button onClick={(e) => handleChange(e, index)} size='small' color="primary">
                                                    Update
                                                </Button>
                                            </Box>
                                        </AccordionSummary>
                                        <div>
                                            <CollapseComponent
                                                formik={formik}
                                                values={item}
                                                index={index}
                                            />
                                        </div>
                                    </Accordion>
                                    {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.sac && (
                                        <Typography color="error" sx={{ fontSize: "13px !important", mt: 1 }} type="invalid">
                                            {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.sac}
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: "bottom" }}>
                                    <Box sx={{ display: "flex", alignItems: "baseline", height: "100%" }}>
                                        <Form.Group
                                            style={{ textAlign: "left" }}
                                            controlId="qty"
                                        >
                                            <Form.Control
                                                type="text"
                                                name={`items[${index}].qty`}
                                                value={item.qty}
                                                // disabled={index === 0}
                                                onChange={(e) => {
                                                    if (/^\d*$/.test(e.target.value)) {
                                                        formik.setFieldValue(`items[${index}].qty`, e.target.value)
                                                        getFinalPrice(item?.price, e.target.value, item.discounted_price, index, item?.tax);
                                                    }
                                                }}
                                                placeholder="Quantity"
                                                className="mb-0"
                                                isInvalid={
                                                    formik?.touched && formik?.touched?.items &&
                                                    formik?.touched?.items[index]?.qty &&
                                                    formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.qty
                                                }
                                            />
                                            {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.qty && (
                                                <Form.Control.Feedback style={{ fontSize: "13px" }} type="invalid">
                                                    {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.qty}
                                                </Form.Control.Feedback>
                                            )}
                                        </Form.Group>
                                    </Box>
                                    {/* {item?.qty} */}
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: "bottom" }}>
                                    <Form.Group
                                        style={{ textAlign: "left" }}
                                        controlId="price"
                                    >
                                        <Form.Control
                                            type="text"
                                            name={`items[${index}].price`}
                                            value={item.price}
                                            // disabled={index === 0}
                                            onChange={(e) => {
                                                if (/^\d*$/.test(e.target.value)) {
                                                    formik.setFieldValue(`items[${index}].price`, e.target.value)
                                                    getFinalPrice(e.target.value, item?.qty, item.discounted_price, index, item?.tax);
                                                }
                                            }}
                                            placeholder="Price"
                                            className="mb-0"
                                            isInvalid={
                                                formik?.touched && formik?.touched?.items &&
                                                formik?.touched?.items[index]?.price &&
                                                formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.price
                                            }
                                        />
                                        {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.price && (
                                            <Form.Control.Feedback style={{ fontSize: "13px" }} type="invalid">
                                                {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.price}
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                    {/* {item?.price} */}
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: "bottom" }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <Form.Group
                                            style={{ textAlign: "left" }}
                                            controlId="discounted_price"
                                        >
                                            <Form.Control
                                                type="text"
                                                name={`items[${index}].discounted_price`}
                                                value={`${item.discounted_price}`}
                                                // disabled={index === 0}
                                                onChange={(e) => {
                                                    if (/^\d*$/.test(e.target.value)) {
                                                        formik.setFieldValue(`items[${index}].discounted_price`, e.target.value);
                                                        getFinalPrice(item?.price, item?.qty, e.target.value, index, item?.tax);
                                                    }
                                                }}
                                                placeholder="discount Price"
                                                className="mb-0"
                                            // isInvalid={
                                            //     formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.discounted_price
                                            // }
                                            />
                                            {/* {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.price && (
                                                <Form.Control.Feedback style={{fontSize:"13px"}} type="invalid">
                                                    {formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.price}
                                                </Form.Control.Feedback>
                                            )} */}
                                        </Form.Group>
                                        <Typography sx={{ marginBottom: "5px !important" }} component="p" variant="body2">%</Typography>
                                    </Stack>
                                    {/* {item?.discounted_price} % */}
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: "bottom" }}>
                                    <Form.Group
                                        style={{ textAlign: "left" }}
                                        controlId="tax"
                                    >
                                        <Form.Select
                                            aria-label="Select.."
                                            name={`items[${index}].tax`}
                                            value={item.tax}
                                            onChange={(e) => {
                                                formik.setFieldValue(`items[${index}].tax`, e.target.value);
                                                getFinalPrice(item?.price, item?.qty, item?.discounted_price, index, e.target.value);
                                            }}
                                        >
                                            {TaxableOptions && TaxableOptions.map((item) => (
                                                <option value={item?.value}>{item?.label}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: "bottom" }}>
                                    <Form.Group
                                        style={{ textAlign: "left" }}
                                        controlId="discounted_price"
                                    >
                                        <Form.Control
                                            type="text"
                                            name={`items[${index}].final_price`}
                                            disabled={true}
                                            value={item?.final_price || 0}
                                            onChange={(e) => {
                                                formik.setFieldValue(`items[${index}].final_price`, e.target.value)
                                            }}
                                            placeholder="Amount"
                                            className="mb-0"
                                        // isInvalid={
                                        //     `${formik.touched}.items[${index}].final_price` &&
                                        //     `${formik.errors}.items[${index}].final_price`
                                        // }
                                        />
                                        {/* {`${formik.errors}.items[${index}].final_price` && (
                                            <Form.Control.Feedback style={{fontSize:"13px"}} type="invalid">
                                                {`${formik.errors}.items[${index}].final_price`}
                                            </Form.Control.Feedback>
                                        )} */}
                                    </Form.Group>
                                </TableCell>
                                <TableCell align="center" sx={{ verticalAlign: "bottom" }}>
                                    <Box sx={{ mb: 0 }}>
                                        <IconButton onClick={() => handleRemove(index)}>
                                            <DeleteIcon color='primary' />
                                        </IconButton>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {
                formik?.values?.items?.length <= 0 &&
                <Box sx={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography component="p" variant="h5">
                        No Data Found
                    </Typography>
                </Box>
            }
        </TableContainer >
    );
}
export default InvoiceTable;
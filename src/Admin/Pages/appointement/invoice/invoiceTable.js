import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Accordion, AccordionSummary, Box, Button, FormControl, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CollapseComponent from './collapse';
import RemoveIcon from '@mui/icons-material/Remove';
import { SelectBox, TextBox } from '../../../../Components/form';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const InvoiceTable = ({ formik, handleRemove, setSubtotal, setGrantTotal, subTotal, grandTotal }) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const TaxableOptions = [
        {
            value: "non-taxable",
            label: "Non-Taxable"
        },
        {
            value: "taxable",
            label: "Taxable"
        }
    ]

    return (
        <TableContainer component={Paper} sx={{ mb: 3 }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ITEM DETAILS</TableCell>
                        <TableCell align="center">QUANTITY</TableCell>
                        <TableCell align="center">RATE</TableCell>
                        <TableCell align="center">DISCOUNT</TableCell>
                        <TableCell align="center">TAX</TableCell>
                        <TableCell align="center">AMOUNT</TableCell>
                        <TableCell align="center">Remove</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {formik?.values && formik?.values?.items.length >= 0 && formik?.values?.items.map((item, index) => {

                        // if (item) {
                        //     let subTotal = 0;
                        //     let grandTotal = 0;


                        // }

                        return (
                            <TableRow
                                key={`items-${index}`}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <TextBox
                                        fullWidth
                                        name={`items[${index}].title`}
                                        value={item.title}
                                        disabled={index === 0}
                                        onChange={(e) => {
                                            formik.setFieldValue(`items[${index}].title`, e.target.value)
                                        }}
                                    />

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
                                </TableCell>
                                <TableCell align="center">
                                    <TextBox
                                        fullWidth
                                        name={`items[${index}].qty`}
                                        value={item.qty}
                                        disabled={index === 0}
                                        onChange={(e) => {
                                            formik.setFieldValue(`items[${index}].qty`, e.target.value)
                                        }}
                                    />
                                    {/* {item?.qty} */}
                                </TableCell>
                                <TableCell align="center">
                                    <TextBox
                                        fullWidth
                                        name={`items[${index}].price`}
                                        value={item.price}
                                        disabled={index === 0}
                                        onChange={(e) => {
                                            formik.setFieldValue(`items[${index}].price`, e.target.value)
                                        }}
                                    />
                                    {/* {item?.price} */}
                                </TableCell>
                                <TableCell align="center">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <TextBox
                                            fullWidth
                                            name={`items[${index}].discounted_price`}
                                            value={`${item.discounted_price}`}
                                            disabled={index === 0}
                                            onChange={(e) => {
                                                formik.setFieldValue(`items[${index}].discounted_price`, e.target.value)
                                            }}
                                        /> <Typography sx={{ marginBottom: "20px !important" }} component="p" variant="body2">%</Typography>
                                    </Stack>
                                    {/* {item?.discounted_price} % */}
                                </TableCell>
                                <TableCell align="center">
                                    <SelectBox
                                        fullWidth
                                        name={`items[${index}].tax`}
                                        value={item.tax}
                                        onChange={(e) => {
                                            formik.setFieldValue(`items[${index}].tax`, e.target.value)
                                        }}
                                        disabled={index === 0}
                                        options={TaxableOptions}
                                    />
                                    {/* {item?.protein} */}
                                </TableCell>
                                <TableCell align="center">
                                    0
                                    {/* {(item?.qty * item?.price) / item?.discounted_price * 100} */}
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleRemove(index)}>
                                        <RemoveIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
            {formik?.values?.items?.length <= 0 &&
                <Box sx={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Typography component="p" variant="h5">
                        No Data Found
                    </Typography>
                </Box>}
        </TableContainer>
    );
}
export default InvoiceTable;
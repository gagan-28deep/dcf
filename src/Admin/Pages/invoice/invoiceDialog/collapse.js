import { AccordionDetails, Card, Collapse } from '@mui/material'
import React from 'react'
import { Form } from 'react-bootstrap'
import { TextBox } from '../../../../Components/form'

const CollapseComponent = ({ formik, values, index }) => {
    return (
        <React.Fragment>
            <AccordionDetails>
                <Card className='border-0 mt-2 shadow-none'>
                    <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="sac"
                    >
                        <Form.Control
                            type="text"
                            name={`items[${index}].sac`}
                            value={values.sac}
                            onChange={(e) => {
                                formik.setFieldValue(`items[${index}].sac`, e.target.value)
                            }}
                            placeholder="SAC"
                            className="mb-0"
                            isInvalid={
                                formik?.touched && formik?.touched?.items &&
                                formik?.touched?.items[index]?.sac &&
                                formik?.errors && formik?.errors?.items && formik?.errors?.items[index]?.sac
                            }
                        />
                       
                    </Form.Group>
                    {/* <TextBox
                        fullWidth
                        name={`items[${index}].sac`}
                        value={values.sac}
                        onChange={(e) => {
                            formik.setFieldValue(`items[${index}].sac`, e.target.value)
                        }}
                    /> */}
                </Card>
            </AccordionDetails>
        </React.Fragment>
    )
}

export default CollapseComponent
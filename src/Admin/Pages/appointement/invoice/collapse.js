import { AccordionDetails, Card, Collapse } from '@mui/material'
import React from 'react'
import { TextBox } from '../../../../Components/form'

const CollapseComponent = ({ formik, values, index }) => {
    return (
        <React.Fragment>
            <AccordionDetails>
                <Card className='border-0 mt-2 shadow-none'>
                    <TextBox
                        fullWidth
                        name={`items[${index}].sac`}
                        value={values.sac}
                        onChange={(e) => {
                            formik.setFieldValue(`items[${index}].sac`, e.target.value)
                        }}
                    />
                </Card>
            </AccordionDetails>
        </React.Fragment>
    )
}

export default CollapseComponent
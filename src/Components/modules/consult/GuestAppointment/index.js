import { Box, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material'
import React from 'react'
import GuestAppointmentForm from './guestForm'

const GuestAppointment = ({ AppointmentClinicId, AppointmentFormikData, AppointmentAllData, setChecked }) => {
    const [value, setValue] = React.useState('self');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <>
            <Box sx={{ my: 4 }}>
                <FormControl>
                    <FormLabel color='secondary' id="demo-controlled-radio-buttons-group">Book As</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={value}
                        onChange={handleChange}
                    >
                        <Stack direction={'row'}>
                            <FormControlLabel value="self" control={<Radio color='secondary' />} label="Self" />
                            <FormControlLabel value="guest" control={<Radio color='secondary' />} label="Guest" />
                        </Stack>
                    </RadioGroup>
                </FormControl>
                <GuestAppointmentForm
                    setChecked={setChecked}
                    type={value}
                    AppointmentClinic={AppointmentClinicId}
                    AppointmentFormik={AppointmentFormikData}
                    AppointmentAll={AppointmentAllData}
                />
            </Box>
        </>
    )
}

export default GuestAppointment
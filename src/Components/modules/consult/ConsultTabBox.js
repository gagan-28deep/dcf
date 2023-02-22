import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CustomBox, CustomTabSubTypography, CustomTabTypography, CustomTitle } from './style';
import { Button, Card, CardContent, Grid } from '@mui/material';
import GuestAppointment from './GuestAppointment';
import moment from 'moment';



import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect } from 'react';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ pt: 2, pb: 0, textAlign: 'left' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const ConsultTabBox = ({ formikObject, FormikData, AllData, TabData, setChecked }) => {
    console.log('TabData---------->', TabData);
    const [value, setValue] = React.useState(0);
    const [date, setDate] = React.useState(new Date());
    const [slotValue, setSlotValue] = React.useState({
        selectData: '',
        open: '',
        index: ''
    });

    const getSlotData = (item, index) => {
        setSlotValue({
            selectData: item,
            open: true,
            index: index
        })
    }
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    console.log('datedate', date, formikObject.values)

    return (
        <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
            <AppBar sx={{ height: '95px' }} color="secondary" position="static">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="secondary"
                    textColor="inherit"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab sx={{ color: "#fff" }} label={
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            width: '100%'
                        }}>
                            {/* <CustomTabTypography>
                                Today
                            </CustomTabTypography> */}
                            <CustomTabSubTypography>
                                <Box sx={{ my: 2 }}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            color="success"
                                            autoFocus
                                            inputFormat="DD/MM/YYYY"
                                            format="DD-MM-YYYY"
                                            label="Select Date"
                                            minDate={moment().format("YYYY-MM-DD")}
                                            value={date}
                                            onChange={(newValue) => {
                                                setDate(moment(new Date(newValue)).format("YYYY-MM-DD"));
                                                formikObject.setFieldValue('date', moment(new Date(newValue)).format("YYYY-MM-DD"))
                                            }}
                                            renderInput={(params) => <TextField color='success' {...params} />}
                                        />
                                    </LocalizationProvider>
                                </Box>
                            </CustomTabSubTypography>
                            <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
                                <CustomTabSubTypography>
                                    {TabData.SlotTotal} Slots Available
                                </CustomTabSubTypography>
                            </Box>
                        </Box>
                    } {...a11yProps(0)} />
                </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
                <CustomBox>
                    <Grid container spacing={2}>
                        {TabData.clinicData && TabData.clinicData.map((item, index) => {
                            return (
                                <Grid item lg={3} xs={6}>
                                    <Box key={`TabData${index}`}>
                                        <Button sx={{ width: { md: '150px', xs: '100%' }, fontSize: { xs: '11px', md: '15px' } }} onClick={() => getSlotData(item, index)} variant={slotValue.open && slotValue.index == index ? 'contained' : 'outlined'} color='secondary'>
                                            {item?.timeSlotData?.start_time} - {item?.timeSlotData?.end_time}
                                        </Button>
                                    </Box>
                                </Grid>
                            )
                        })}
                    </Grid>
                </CustomBox>
                <Box>
                    <GuestAppointment setChecked={setChecked} AppointmentClinicId={slotValue.selectData} AppointmentFormikData={FormikData} AppointmentAllData={AllData} />
                </Box>
            </TabPanel>
        </Box>
    );
}

export default ConsultTabBox;
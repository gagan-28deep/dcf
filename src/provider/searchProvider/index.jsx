import { useFormik } from 'formik';
import React from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiAdminConfig } from '../../utils/api';
import { getUser, getUserToken, removeUserData } from '../../utils/cookie';


const UserSearchProvider = React.createContext();

export function UserSearchProviders({ children }) {
    const [doctorValue, setDoctorValue] = React.useState([])
    const navigate = useNavigate();
    const location = useLocation();
    const locationData = location?.state?.location;
    const defaultName = location?.state?.name
    console.log('searchDoctorsearchDoctor123', defaultName)

    const formik = useFormik({
        initialValues: {
            location: 'Delhi',
            name: '',
            type: 'offline',
            day: 'all',
            sortby: ''
        },
        onSubmit: async (values) => {
            console.log('values.name', values.name)
            navigate(`/doctor/search?specialization=${values?.name ? values?.name : ""}`, {
                state: {
                    specialization: values?.name
                }
            });
        },
        // enableReinitialize: true
    });
    console.log("location.pathname", location.pathname)

    React.useEffect(() => {
        if (location.pathname != "/doctor/search") {
            formik.setFieldValue("name", "")
            console.log("stateClear")
            navigate(location.pathname, {
                state: {
                    ...location.state,
                    specialization: ""
                },
                replace: true
            });
        }
    }, [location.pathname])

    // React.useEffect(() => {
    //     if (location?.state?.day || location?.state?.type) {
    //         formik.handleSubmit();
    //     }
    // }, [formik.values?.location, location?.state?.type, location?.state?.day, location?.state?.sortby])

    return (
        <UserSearchProvider.Provider
            value={{
                formik,
                defaultName,
                locationData,
                doctorValue,
                setDoctorValue
            }}
        >
            {children}
        </UserSearchProvider.Provider>
    );
}

export function useSearchProvider() {
    return React.useContext(UserSearchProvider);
}

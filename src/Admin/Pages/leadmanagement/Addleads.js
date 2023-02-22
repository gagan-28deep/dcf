import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
    let navigate = useNavigate();
    const snackbar = useSnackbar();
    const [loader, setLoader] = useState(false);
    const [options, setOptions] = useState([]);
    const [clinics, setClinics] = useState([]);

    const formik = useFormik({
        initialValues: {
            user_name: "",
            contact_number: "",
            specialization: "",
            lead_type: "",
            address: "",
            discription: "",
            clinic: "",
            remarks: "",
        },
        validate: (values) => {
            const errors = {};
            if (!values.contact_number) {
                errors.contact_number = "Contact number is required";
            } else if (!/^[0-9]{10}$/.test(values.contact_number)) {
                errors.contact_number = "Please enter valid number";
            }
            if (!values.user_name) {
                errors.user_name = "Name is required";
            }
            if (!values.lead_type) {
                errors.lead_type = "Lead Type is required";
            }
            if (!values.specialization) {
                errors.specialization = "Specialization is required";
            }
            if (!values.discription) {
                errors.discription = "Discription is required";
            }

            if (!values.clinic) {
                errors.clinic = "Clinic is required";
            }
            if (!values.remarks) {
                errors.remarks = "Remarks is required";
            }  
            return errors;
        },
        onSubmit: async (values, { setErrors }) => {
            console.log('values', values);
            await apiAdminConfig
                .post("leadmanagement/add", values)
                .then((response) => {
                    console.log('response', response);
                    if (response?.data?.status === true) {
                        setLoader(false);
                               snackbar({
                            message: "Lead has been added successfully.",
                            severity: "success",
                        });
                        formik.resetForm();
                    }
                })
                .catch((error) => {
                    const { response } = error;
                    if (response?.data?.status === 406) {
                        if (response.data.message.toLowerCase().split(" ")[0] === "phone") {
                            setErrors({ phoneNo: response.data.message });
                        }
                        if (response.data.message.toLowerCase().split(" ")[0] === "email") {
                            setErrors({ email: response.data.message });
                        }
                    }
                });
        },
    });

    // get DeptName
    const fetchDeptName = async () => {
        await apiAdminConfig
            .post(`getDeptName`)
            .then((response) => {
                if (response.status === 200) {
                    let data = response.data.data;
                    let arr = [];
                    for (let item of data) {
                        arr.push({ value: item, label: item });
                    }
                    setOptions(arr);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    // get clinic list
    const fetchClinic = async () => {
        await apiAdminConfig
            .post(`appointment/getAllAssignDrClinic`)
            .then((response) => {
                let data = response.data.data;
                let arr = [];
                for (let item of data) {
                    arr.push({ value: item._id, label: item.clinicName });
                }
                console.log(arr);
                setClinics(arr);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };


    useEffect(() => {
        fetchDeptName();
        fetchClinic();
    }, []);
    return (
        <>
            {loader ? (
                <Loader />
            ) : (
                <>
                    <Row className="mt-4">
                        <Col md={6} style={{ textAlign: "left" }}>
                            <h3 style={{ height: "40px" }}>Add Leads</h3>
                        </Col>
                        <Col md={4}></Col>
                        <Col md={2} style={{ textAlign: "left" }}>
                            <Button
                                onClick={() => {
                                    navigate(`/master/leadmanagement`);
                                }}
                                variant="outlined"
                                color="success"
                            >
                                Back
                            </Button>
                        </Col>
                    </Row>
                    <div className="adminContant">
                        <Card>
                            <Card.Body style={{ minHeight: "300px" }}>
                                <Form onSubmit={formik.handleSubmit}>
                                    <Row className="mb-3">
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="user_name"
                                            >
                                                <Form.Label>Patient Name</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={formik.values.user_name}
                                                    name="user_name"
                                                    onChange={formik.handleChange}
                                                    placeholder="Enter Name"
                                                    className="mb-0"
                                                    isInvalid={
                                                        formik.touched.user_name &&
                                                        formik.errors.user_name
                                                    }
                                                />
                                                {formik.errors.user_name && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.user_name}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="contact_number"
                                            >
                                                <Form.Label>Contact Number</Form.Label>
                                                <Form.Control
                                                    type="tel"
                                                    maxLength="10"
                                                    value={formik.values.contact_number}
                                                    name="contact_number"
                                                    onChange={formik.handleChange}
                                                    placeholder="Enter Number"
                                                    className="mb-0"
                                                    isInvalid={
                                                        formik.touched.contact_number && formik.errors.contact_number
                                                    }
                                                />
                                                {formik.errors.contact_number && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.contact_number}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="specialization"
                                            >
                                                <Form.Label>Specialization</Form.Label>
                                                <Form.Select
                                                    aria-label="Select.."
                                                    value={formik.values.specialization}
                                                    onChange={(e) => {
                                                        if (e.target.value !== "0") {
                                                            formik.setFieldValue(
                                                                "specialization",
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    isInvalid={
                                                        formik.touched.specialization &&
                                                        formik.errors.specialization
                                                    }
                                                >
                                                    <option value="0">Select Specialization</option>
                                                    {options.map((el, id) => {
                                                        return (
                                                            <option key={id} value={el.value}>
                                                                {el.label}
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Select>
                                                {formik.errors.specialization && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.specialization}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="clinic"
                                            >
                                                <Form.Label>Attendee Clinic</Form.Label>
                                                <Form.Select
                                                    aria-label="Select.."
                                                    value={formik.values.clinic}
                                                    onChange={(e) => {
                                                        if (e.target.value !== "0") {
                                                            formik.setFieldValue(
                                                                "clinic",
                                                                e.target.value
                                                            );
                                                        }
                                                    }}
                                                    isInvalid={
                                                        formik.touched.clinic &&
                                                        formik.errors.clinic
                                                    }
                                                >
                                                    <option value="0">Select Clinics</option>
                                                    {clinics.map((el, id) => {
                                                        return (
                                                            <option key={id} value={el.value}>
                                                                {el.label}
                                                            </option>
                                                        );
                                                    })}
                                                </Form.Select>
                                                {formik.errors.clinic && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.clinic}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="address"
                                            >
                                                <Form.Label>Address</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as="textarea"
                                                    rows={1}
                                                    value={formik.values.address}
                                                    name="address"
                                                    onChange={formik.handleChange}
                                                    placeholder="Enter Address"
                                                    className="mb-0"
                                                    isInvalid={
                                                        formik.touched.address && formik.errors.address
                                                    }
                                                />
                                                {formik.errors.address && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.address}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="discription"
                                            >
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    as="textarea"
                                                    rows={1}
                                                    value={formik.values.discription}
                                                    name="discription"
                                                    onChange={formik.handleChange}
                                                    placeholder="Enter Description"
                                                    className="mb-0"
                                                    isInvalid={
                                                        formik.touched.discription && formik.errors.discription
                                                    }
                                                />
                                                {formik.errors.discription && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.discription}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="lead_type"
                                            >
                                                <Form.Label>Lead Type</Form.Label>
                                                <Form.Select
                                                    aria-label="Select.."
                                                    value={formik.values.lead_type}
                                                    onChange={(e) => {
                                                        if (e.target.value !== "0") {
                                                            formik.setFieldValue(
                                                                "lead_type", e.target.value
                                                            );
                                                        }
                                                    }}
                                                    isInvalid={
                                                        formik.touched.lead_type &&
                                                        formik.errors.lead_type
                                                    }
                                                >
                                                    <option value="0">Choose Type</option>
                                                    <option value="COLD">COLD</option>
                                                    <option value="WARM">WARM</option>
                                                    <option value="HOT">HOT</option>

                                                </Form.Select>
                                                {formik.errors.lead_type && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.lead_type}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>

                                        <Col xs={12} md={6} lg={6}>
                                            <Form.Group
                                                style={{ textAlign: "left" }}
                                                controlId="remarks"
                                            >
                                                <Form.Label>Remarks</Form.Label>
                                                <Form.Select
                                                    aria-label="Select.."
                                                    value={formik.values.remarks}
                                                    onChange={(e) => {
                                                        if (e.target.value !== "0") {
                                                            formik.setFieldValue(
                                                                "remarks", e.target.value
                                                            );
                                                        }
                                                    }}
                                                    isInvalid={
                                                        formik.touched.remarks &&
                                                        formik.errors.remarks
                                                    }
                                                >
                                                <option value="0">Choose Remarks</option>
                                                <option value="PENDING">PENDING</option>
                                                <option value="DONE">DONE</option>
                                                <option value="SPAM">SPAM</option>
                                            
                                                </Form.Select>
                                                {formik.errors.status && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.status}
                                                    </Form.Control.Feedback>
                                                )}
                                            </Form.Group>
                                        </Col>
                                    </Row>
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
                                            onClick={() => formik.resetForm()}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </div>
                </>
            )}
        </>
    );
};

class Adddoctor extends Component {
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

export default Adddoctor;

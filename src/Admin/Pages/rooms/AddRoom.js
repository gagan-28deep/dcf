import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import { useFormik } from "formik";

const Contant = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const daysArray = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const [floorcounts, setFloorcounts] = useState([]);
  const [days, setDays] = useState([]);

  const formik = useFormik({
    initialValues: {
      rentPerMonth: 0,
      roomName: "",
      roomNumber: 0,
      floor: "",
      specialization: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.rentPerMonth) {
        errors.rentPerMonth = "Rent is required";
      }
      if (!values.floor) {
        errors.floor = "Floor is required";
      }
      if (!values.roomName) {
        errors.roomName = "Room Name is required";
      }
      if (!values.specialization) {
        errors.specialization = "Specialization is required";
      }
      if (!values.roomNumber) {
        errors.roomNumber = "Room Number is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      if (days.length !== 0) {
        values = {
          ...values,
          days: JSON.stringify(days.map((el) => el.value)),
          clinicData: id,
        };
        await apiAdminConfig
          .post(`addRoom`, values)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              snackbar({
                message: "Room has been created successfully.",
                severity: "success",
              });
              formik.resetForm();
              setDays([]);
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        snackbar({
          message: "Days are required.",
          severity: "error",
        });
      }
    },
  });

  // get DeptName
  const fetchDeptName = async () => {
    setLoader(true);
    await apiAdminConfig
      .post("getDeptName")
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item, label: item });
          }
          setOptions((prevState) => [...prevState, ...arr]);
          setLoader(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // get Clinic Data
  const fetchClinicdata = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`asset/${value}`)
      .then((response) => {
        if (response.status === 200) {
          let arr = [];
          for (let i = 1; i <= parseInt(response.data.data.floorCount); i++) {
            arr.push({ value: i.toString(), label: i });
          }
          setFloorcounts((prevState) => [...prevState, ...arr]);
        }
        setLoader(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchDeptName();
    fetchClinicdata(id);
  }, [id]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add Room</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/clinics/rooms`, {
                    state: { data: id },
                  });
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
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="floor"
                      >
                        <Form.Label>Floor</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.floor}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("floor", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.floor && formik.errors.floor
                          }
                        >
                          <option value="0">Select Floor</option>
                          {floorcounts.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.floor && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.floor}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="roomName"
                      >
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.roomName}
                          name="roomName"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          isInvalid={
                            formik.touched.roomName && formik.errors.roomName
                          }
                        />
                        {formik.errors.roomName && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.roomName}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="roomNumber"
                      >
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control
                          type="number"
                          value={formik.values.roomNumber}
                          name="roomNumber"
                          onChange={formik.handleChange}
                          placeholder="Enter Number"
                          isInvalid={
                            formik.touched.roomNumber &&
                            formik.errors.roomNumber
                          }
                        />
                        {formik.errors.roomNumber && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.roomNumber}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
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
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="rentPerMonth"
                      >
                        <Form.Label>Rent Per Month</Form.Label>
                        <Form.Control
                          type="number"
                          value={formik.values.rentPerMonth}
                          name="rentPerMonth"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          isInvalid={
                            formik.touched.rentPerMonth &&
                            formik.errors.rentPerMonth
                          }
                        />
                        {formik.errors.rentPerMonth && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.rentPerMonth}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="days"
                      >
                        <Form.Label>Select Days</Form.Label>
                        <MultiSelect
                          key={daysArray.id}
                          options={daysArray}
                          value={days}
                          onChange={setDays}
                          labelledBy="Select"
                          hasSelectAll={true}
                        />
                        {formik.errors.specialization && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.specialization}
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

class AddRoom extends Component {
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

export default AddRoom;

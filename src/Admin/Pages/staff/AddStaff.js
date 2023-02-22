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
import { MultiSelect } from "react-multi-select-component";
import { apiAdminConfig } from "../../../utils/api";
import { useFormik } from "formik";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const formik = useFormik({
    initialValues: {
      user_name: "",
      employee_id: "",
      email: "",
      password: "",
      roles: []
    },
    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }
      if (!values.employee_id) {
        errors.employee_id = "Employee Id is required";
      }
      if (!values.user_name) {
        errors.user_name = "Name is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      console.log(selected.length);
      if (selected.length !== 0) {
        values = {
          ...values,
          roles: JSON.stringify(selected.map((el) => el.value)),
        };
        await apiAdminConfig
          .post(`master/staff`, values)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              snackbar({
                message: "Staff has been created successfully.",
                severity: "success",
              });
              formik.resetForm();
              setSelected([]);
            }
          })
          .catch((error) => console.log("error", error));
      } else {
        snackbar({
          message: "Roles are required.",
          severity: "error",
        });
      }
    },
  });

  // get roles data
  const fetchRoles = async () => {
    setLoader(true);
    const api = {
      path: "master/getRoles",
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item.role_name, label: item.role_name });
          }
          setOptions(arr);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchRoles();
  }, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add Staff</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => navigate("/master/staff")}
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
                        controlId="user_name"
                      >
                        <Form.Label>Staff's Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.user_name}
                          name="user_name"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          className="mb-3"
                          isInvalid={
                            formik.touched.user_name && formik.errors.user_name
                          }
                        />
                        {formik.errors.user_name && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.user_name}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="employee_id"
                      >
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.employee_id}
                          name="employee_id"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          className="mb-3"
                          isInvalid={
                            formik.touched.employee_id &&
                            formik.errors.employee_id
                          }
                        />
                        {formik.errors.employee_id && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.employee_id}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>

                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="email"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.email}
                          name="email"
                          onChange={formik.handleChange}
                          placeholder="Enter Name"
                          className="mb-3"
                          isInvalid={
                            formik.touched.email && formik.errors.email
                          }
                        />
                        {formik.errors.email && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.email}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="password"
                      >
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          value={formik.values.password}
                          name="password"
                          onChange={formik.handleChange}
                          placeholder="Enter Password"
                          className="mb-3"
                          isInvalid={
                            formik.touched.password && formik.errors.password
                          }
                        />
                        {formik.errors.password && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="roles"
                      >
                        <Form.Label>Roles</Form.Label>
                        <MultiSelect
                          key={options._id}
                          options={options}
                          value={selected}
                          onChange={setSelected}
                          labelledBy="Select"
                          hasSelectAll={true}
                        />
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
                      onClick={() => {
                        setSelected([])
                        formik.resetForm()
                      }}
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

class Addstaff extends Component {
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

export default Addstaff;

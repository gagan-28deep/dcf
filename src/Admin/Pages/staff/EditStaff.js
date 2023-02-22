import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate, useParams } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import { useFormik } from "formik";

const Contant = () => {
  let navigate = useNavigate();
  const snackbar = useSnackbar();
  let { id } = useParams();
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
          .put(`master/staff/${id}`, values)
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              snackbar({
                message: `Staff Updated Successfully`,
                severity: "success",
              });
              formik.resetForm();
              setSelected([]);
              navigate("/master/staff",{replace: true});
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
    await apiAdminConfig
      .get(`master/getRoles`)
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
      .catch((error) => {
        console.log("error", error);
      });
  };

  // ============ Get user data =============
  const fetchuser = async (value) => {
    setLoader(true);
    await apiAdminConfig
      .get(`master/staff/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setSelected([
            {
              value: response.data.data.roles,
              label: response.data.data.roles,
            },
          ]);
          for (const [key, value] of Object.entries(response.data.data)) {
            if (key == 'roles') {
              const rolesData = response.data.data[key].map(item => {
                return ({
                  value: item,
                  label: item
                })
              });
              formik.setFieldValue(key, rolesData)
              setSelected(rolesData)
            } else {
              formik.setFieldValue(`${key}`, value);
            }
          }
        }
        setLoader(false);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchuser(id);
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
              <h3 style={{ height: "40px" }}>Edit Staff</h3>
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
                        {formik.errors.password && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.password}
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
                      onClick={() => fetchuser(id)}
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

class EditStaff extends Component {
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

export default EditStaff;

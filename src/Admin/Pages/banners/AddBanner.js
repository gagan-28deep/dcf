import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";

const Contant = () => {
  let navigate = useNavigate();

  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [loader, setLoader] = useState(false);

  const formik = useFormik({
    initialValues: {
      banner_title: "",
      banner_image: "",
      banner_category: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.banner_title) {
        errors.banner_title = "Title is required";
      }
      if (!values.banner_category) {
        errors.banner_category = "Category is required";
      }
      if (!values.banner_image) {
        errors.banner_image = "Banner is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      console.log("values", values);
      await apiAdminConfig
        .post("/banner", values)
        .then((response) => {
          if (response.data.status === 200) {
            setLoader(false);
            setsnackdata({
              open: true,
              message: response.data.message,
              status: "success",
            });
            formik.resetForm();
          }
        })
        .catch((error) => {
          const { response } = error;
          if (response?.status === 406) {
            for (const [key, value] of Object.entries(values)) {
              if ((response.data.type = "phone")) {
                setErrors({ phoneNo: response.data.message });
              }
              if ((response.data.type = "email")) {
                setErrors({ email: response.data.message });
              }
            }
          }
        });
    },
  });

  useEffect(() => { }, []);

  const fileUpload = async (event) => {
    let body = { files: event.target.files[0] };
    await apiAdminConfig
      .post(
        "getFileUrl",
        { ...body },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          formik.setFieldValue(`${event.target.name}`, response.data.data);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    if (snackData.open && snackData.status == 'error') {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "error",
        });
      }, 3000);
    } else if (snackData.open && snackData.status == 'success') {
      setTimeout(() => {
        setsnackdata({
          open: false,
          message: "",
          status: "success",
        });
      }, 1000);
    }
  }, [snackData.open])

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <CustomSnackbar value={snackData} />
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Edit Banner</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/banner`);
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
              <Card.Body style={{ minHeight: "200px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="banner_title"
                      >
                        <Form.Label>Banner Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.banner_title}
                          name="banner_title"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={
                            formik.touched.banner_title &&
                            formik.errors.banner_title
                          }
                        />
                        {formik.errors.banner_title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.banner_title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="banner_category"
                      >
                        <Form.Label>Select Category</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.banner_category}
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue(
                                "banner_category",
                                e.target.value
                              );
                            }
                          }}
                          isInvalid={
                            formik.touched.banner_category &&
                            formik.errors.banner_category
                          }
                        >
                          <option value="0">Choose your category</option>
                          <option value="Web">Web</option>
                          <option value="Doctors on app">Doctors on app</option>
                          <option value="Users on app">Users on app</option>
                        </Form.Select>
                        {formik.errors.banner_category && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.banner_category}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="banner_image"
                      >
                        <Form.Label>Banner Image</Form.Label>
                        <Form.Control
                          name="banner_image"
                          type="file"
                          className="mb-0"
                          onChange={(e) => {
                            fileUpload(e);
                          }}
                          isInvalid={
                            formik.touched.banner_image &&
                            formik.errors.banner_image
                          }
                        />
                        {formik.errors.banner_image && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.banner_image}
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
            <Card
              style={{
                marginTop: "1%",
                display: `${formik.values.banner_image ? "block" : "none"}`,
              }}
            >
              <Card.Body style={{ minHeight: "300px" }}>
                <Image
                  style={{
                    margin: "10px",
                  }}
                  src={formik.values.banner_image}
                  alt={formik.values.banner_image}
                />
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class AddBanner extends Component {
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

export default AddBanner;

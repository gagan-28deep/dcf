import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Table from "react-bootstrap/Table";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import ModalCustom from "../../../Components/notify/Modal";
import { MultiSelect } from "react-multi-select-component";
import DateSelect from "../../../Components/Datepicker/Dateselect";
import Nodata from "../../../Components/nodata/Nodata";

const Contant = () => {
  let navigate = useNavigate();
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [model, setModel] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    id: "",
  });

  let tablehead = [
    "S/N",
    "Title",
    "Description",
    "Code",
    "Discount",
    "Doctors",
    "Created At",
    "Start Date",
    "End Date",
    "Usage",
    "Action",
  ];

  // =============== Form Submission ===============
  const formik = useFormik({
    initialValues: {
      title: "",
      end_date: "",
      max_count: 0,
      discount: "",
      start_date: "",
      description: "",
      code: "",
      doctor_id: [],
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.end_date) {
        errors.end_date = "End time is required";
      }
      if (!values.start_date) {
        errors.start_date = "Start time is required";
      }
      if (!values.max_count) {
        errors.max_count = "Count is required";
      }
      if (!values.code) {
        errors.code = "Coupon code is required";
      }
      if (!values.discount) {
        errors.discount = "Discount is required";
      }
      if (!values.description) {
        errors.description = "Description is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      setLoader(true);
      if (values?.code) {
        values.code = values.code.toUpperCase();
      }
      if (selected) {
        values.doctor_id = selected.map((el) => el.value);
      }
      await apiAdminConfig
        .post("createCoupon", values)
        .then((response) => {
          setLoader(false);
          if (response.status === 200) {
            setsnackdata({
              open: true,
              message: "Coupon Created Successfully",
              status: "success",
            });
            formik.resetForm();
            fetchCoupons();
          }
          if (response.status === 400) {
            setsnackdata({
              open: true,
              message: response.data.message,
              status: "error",
            });
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

  // =============== get Doctors data ==============
  const fetchDoctors = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`doctor_admin`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({ value: item._id, label: item.doctorName });
          }
          setOptions(arr);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // =================Get Copons ===================
  const fetchCoupons = async () => {
    await apiAdminConfig
      .get(`getallcoupons`)
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          console.log("apidata", apidata[0]);
          setPosts(apidata);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchCoupons();
    fetchDoctors();
  }, []);

  //================ Get current Posts =============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  //================ Change Page ================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //=============== Remove Coupons =============
  const handledelete = async (value) => {
    await apiAdminConfig
      .delete(`removecoupon/${value.id}`)
      .then((response) => {
        if (response.status === 200) {
          setModel({
            open: false,
          });
          fetchCoupons();
          setsnackdata({
            open: true,
            message: response.data.message,
            status: "success",
          });
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
          {<ModalCustom value={model} handelDelete={handledelete} />}
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Coupons</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/doctors`);
                }}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ marginBottom: "1rem" }}>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="title"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.title}
                          name="title"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={
                            formik.touched.title && formik.errors.title
                          }
                        />
                        {formik.errors.title && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.title}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="code"
                      >
                        <Form.Label>Coupon Code</Form.Label>
                        <Form.Control
                          type="text"
                          minLength="6"
                          maxLength="6"
                          value={formik.values.code.toUpperCase()}
                          name="code"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={formik.touched.code && formik.errors.code}
                        />
                        {formik.errors.code && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.code}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="discount"
                      >
                        <Form.Label>Discount (In %)</Form.Label>
                        <Form.Control
                          type="number"
                          maxLength="6"
                          value={formik.values.discount}
                          name="discount"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={
                            formik.touched.discount && formik.errors.discount
                          }
                        />
                        {formik.errors.discount && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.discount}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="description  "
                      >
                        <Form.Label>Description </Form.Label>
                        <Form.Control
                          type="text"
                          as="textarea"
                          value={formik.values.description}
                          name="description"
                          onChange={formik.handleChange}
                          placeholder="Enter Description"
                          className="mb-0"
                          isInvalid={
                            formik.touched.description &&
                            formik.errors.description
                          }
                        />
                        {formik.errors.description && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.description}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="max_count"
                      >
                        <Form.Label>Max Usage</Form.Label>
                        <Form.Control
                          type="number"
                          maxLength="6"
                          value={formik.values.max_count}
                          name="max_count"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={
                            formik.touched.max_count && formik.errors.max_count
                          }
                        />
                        {formik.errors.max_count && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.max_count}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="doctor_id"
                      >
                        <Form.Label>Doctors</Form.Label>
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
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="dob">
                        <Form.Label>Srart Date</Form.Label>
                        <DateSelect
                          place="Select Date"
                          select={(value) => {
                            formik.setFieldValue(
                              "start_date",
                              moment(value).format("YYYY-MM-DD").toString()
                            );
                          }}
                          type={
                            formik.touched.start_date &&
                              formik.errors.start_date
                              ? "error"
                              : "success"
                          }
                          value={formik.values.start_date}
                        />
                        {formik.errors.start_date && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.start_date}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group style={{ textAlign: "left" }} controlId="dob">
                        <Form.Label>End Date</Form.Label>
                        <DateSelect
                          place="Select Date"
                          select={(value) => {
                            formik.setFieldValue(
                              "end_date",
                              moment(value).format("YYYY-MM-DD").toString()
                            );
                          }}
                          type={
                            formik.touched.end_date && formik.errors.end_date
                              ? "error"
                              : "success"
                          }
                          value={formik.values.end_date}
                        />
                        {formik.errors.end_date && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.end_date}
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
                    // onClick={datanull}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "100%",
              }}
            >
              <Card.Body className="mt-2" style={{ minHeight: "300px" }}>
                {currentPost && currentPost.length !== 0 ? (
                  <Table size="lg" responsive>
                    <thead
                      style={{
                        backgroundColor: "#F0F1F2",
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      <tr style={{ width: "100%" }}>
                        {tablehead.map((el, id) => {
                          return (
                            <th
                              key={id}
                              style={
                                id === 0
                                  ? { width: "100%" }
                                  : el === "Action"
                                    ? { minWidth: "15vh", textAlign: "center" }
                                    : { minWidth: "25vh" }
                              }
                            >
                              {el}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "left" }}>
                      {currentPost.map((el, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{el?.title}</td>
                            <td>{el?.description}</td>
                            <td>{el?.code}</td>
                            <td>{el?.discount}</td>
                            <td>{el?.doctor_id.length}</td>
                            <td>
                              {moment(el?.createdAt).format("yyyy-MM-DD")}
                            </td>
                            <td>{el?.start_date}</td>
                            <td>{el?.end_date}</td>
                            <td>{`${el?.used_by.length}/${el?.max_count}`}</td>
                            <td>
                              <Button
                                onClick={(e) => {
                                  setsnackdata({ open: false });
                                  setModel({
                                    open: true,
                                    type: "delete",
                                    title: "Remove Coupon",
                                    message:
                                      "Are you sure? you won't be able to revert this!",
                                    id: el?._id,
                                  });
                                }}
                                color="error"
                              >
                                <MdDeleteOutline size={20} />
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <Nodata />
                  </div>
                )}
              </Card.Body>
              <Card.Footer>
                <div className="justify-content-between flex-wrap d-flex align-items-center">
                  <Card.Text className="footer-text">
                    Showing {indexOfFirstPost + 1}-{indexOfLastPost} out of{" "}
                    {posts.length}
                  </Card.Text>
                  <TablePagination
                    postsPerPage={postsPerPage}
                    totalPosts={posts.length}
                    paginate={paginate}
                  />
                </div>
              </Card.Footer>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class Coupons extends Component {
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

export default Coupons;

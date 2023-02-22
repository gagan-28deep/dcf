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
import { MdDeleteOutline } from "react-icons/md";
import moment from "moment";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import ModalCustom from "../../../Components/notify/Modal";
import DateSelect from "../../../Components/Datepicker/Dateselect";
import Nodata from "../../../Components/nodata/Nodata";

const Contant = () => {
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [model, setModel] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    id: "",
  });

  let tablehead = ["S/N", "Date", "Day", "Description", "Created At", "Action"];

  // =============== Form Submission ===============
  const formik = useFormik({
    initialValues: {
      date: "",
      comment: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.comment) {
        errors.comment = "Comment is required";
      }
      if (!values.date) {
        errors.date = "Date is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      // setLoader(true);
      console.log("values----->", values);
      await apiAdminConfig
        .post(`addholiday`, values)
        .then((response) => {
          setLoader(false);
          if (response.status === 200) {
            formik.resetForm();
            fetchData();
            setTimeout(() => {
              setsnackdata({
                open: true,
                message: "Holiday Added Successfully",
                status: "success",
              });
            }, 1000);
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
          console.log("response", response);
        });
    },
  });

  // =================Get Data ===================
  const fetchData = async () => {
    await apiAdminConfig
      .get(`getholidays`)
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          console.log(apidata[0]);
          setPosts(apidata);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchData();
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
    console.log("value", value);
    await apiAdminConfig
      .delete(`removeholiday/${value.id}`)
      .then((response) => {
        if (response.status === 200) {
          setModel({
            open: false,
          });
          setsnackdata({
            open: true,
            message: response.data.message,
            status: "success",
          });
          setTimeout(() => {
            fetchData();
          }, 1000);
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
              <h3 style={{ height: "40px" }}>
                Public Holidays Management ({posts.length})
              </h3>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ marginBottom: "1rem" }}>
              <Card.Body style={{ minHeight: "200px" }}>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="date"
                      >
                        <Form.Label>Date</Form.Label>
                        <DateSelect
                          place="Select Date"
                          select={(value) => {
                            formik.setFieldValue(
                              "date",
                              moment(value).format("YYYY-MM-DD").toString()
                            );
                          }}
                          type={
                            formik.touched.date && formik.errors.date
                              ? "error"
                              : "success"
                          }
                          value={formik.values.date}
                        />
                        {formik.errors.date && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.date}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="comment"
                      >
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.comment}
                          name="comment"
                          onChange={(e) => {
                            setsnackdata({ open: false });
                            formik.handleChange(e);
                          }}
                          placeholder="Enter comment"
                          className="mb-0"
                          isInvalid={
                            formik.touched.comment && formik.errors.comment
                          }
                        />
                        {formik.errors.comment && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.comment}
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
                            <td>{el?.date}</td>
                            <td>{moment(el?.date).format("dddd")}</td>
                            <td>{el?.comment}</td>
                            <td>
                              {moment(el?.createdAt).format("yyyy-MM-DD")}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Button
                                onClick={(e) => {
                                  setsnackdata({ open: false });
                                  setModel({
                                    open: true,
                                    type: "delete",
                                    title: "Remove Holiday",
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

class HolidayManage extends Component {
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

export default HolidayManage;

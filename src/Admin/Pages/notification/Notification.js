import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsSearch } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { apiAdminConfig } from "../../../utils/api";
import { useFormik } from "formik";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
  const snackbar = useSnackbar();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  let tablehead = ["S/N", "Text", "Category", "Created On"];
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`notificationsmanagment/getall`)
      .then((response) => {
        let apidata = response.data.data;
        setPosts(apidata);
        setLoader(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  // =============== Form Submission ===============
  const formik = useFormik({
    initialValues: {
      category: "",
      text: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.category) {
        errors.category = "Category is required";
      }
      if (!values.text) {
        errors.text = "Message url is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      // setLoader(true);
      console.log(values);
      await apiAdminConfig
        .post(`notificationsmanagment/createadminNotification`, values)
        .then((response) => {
          setLoader(false);
          if (response.status === 201) {
            formik.resetForm();
            handleClose();
            fetchdata();
            snackbar({
              message: "Notification Created Successfully",
              severity: "success",
            });
          }
          if (response.status === 400) {
          }
        })
        .catch((error) => {
          const { response } = error;
          console.log("response", response);
        });
    },
  });

  useEffect(() => {
    fetchdata();
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPost = posts
    .filter(
      (el) =>
        el?.text.toLowerCase().includes(query.toLowerCase()) ||
        el?.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={4} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Notification Managment (
                {query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={4}>
              <InputGroup className="mb-3">
                <InputGroup.Text className="search-bar">
                  <BsSearch />
                </InputGroup.Text>
                <Form.Control
                  className="search-input"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  placeholder="Search"
                  onChange={(e) => {
                    setCurrentPage(1);
                    setQuery(e.target.value);
                  }}
                />
              </InputGroup>
            </Col>
            <Col md={3} style={{ textAlign: "left" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#76B757" }}
                onClick={handleShow}
              >
                Add Notificaiton
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Body className="mt-2" style={{ minHeight: "300px" }}>
                <Table size="md" responsive>
                  <thead
                    style={{
                      backgroundColor: "#F0F1F2",
                      textAlign: "left",
                    }}
                  >
                    <tr>
                      {tablehead.map((el, id) => {
                        return <th key={id}>{el}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody style={{ textAlign: "left" }}>
                    {currentPost.map((el, id) => {
                      return (
                        <tr key={id}>
                          <td>{id + 1}</td>
                          <td>{el.text}</td>
                          <td>{el.category}</td>
                          <td>{moment(el.createdAt).format("DD/MM/YYYY")}</td>
                          {/* <td>
                                <BsThreeDotsVertical />
                              </td> */}
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
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

            {/* Add Notification form  */}
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add Notification</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="category"
                      >
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.category}
                          name="category"
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("category", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.category && formik.errors.category
                          }
                        >
                          <option value="0">Select Category</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Patient">Patient</option>
                          <option value="Clinic Manager">Clinic Manager</option>
                        </Form.Select>
                        {formik.errors.category && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.category}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="text"
                      >
                        <Form.Label>Message</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.text}
                          name="text"
                          onChange={formik.handleChange}
                          placeholder="Enter Message"
                          className="mb-0"
                          isInvalid={formik.touched.text && formik.errors.text}
                        />
                        {formik.errors.text && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.text}
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col sm={12}>
                      <div style={{ textAlign: "right", marginTop: "10px" }}>
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
                    </Col>
                  </Row>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

class Notification extends Component {
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

export default Notification;

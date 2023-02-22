import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { MdDelete } from "react-icons/md";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import Nodata from "../../../Components/nodata/Nodata";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import ModalCustom from "../../../Components/notify/Modal";
import moment from "moment";
import Image from "react-bootstrap/Image";
import { useFormik } from "formik";

const Contant = () => {
  const snackbar = useSnackbar();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const [query, setQuery] = useState("");
  let tablehead = [
    "S/N",
    "Specialization",
    "Image",
    "Created On",
    "Status",
    "Action",
  ];

  const formik = useFormik({
    initialValues: {
      specialization: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.specialization) {
        errors.specialization = "Specialization is required";
      }

      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      setLoader(true);
      console.log(values);
      await apiAdminConfig
        .post(`specialization`, values)
        .then((response) => {
          setLoader(false);
          if (response.status === 201) {
            formik.resetForm();
            handleClose();
            fetchdata();
            snackbar({
              message: "Specialization Created Successfully",
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

  //fetch data function
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`specialization`)
      .then((response) => {
        console.log("response", response);
        if (response.status === 200) {
          let apidata = response.data.data;
          console.log(apidata[0]);
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPost = posts
    .filter(
      (el) =>
        el?.specialization.toLowerCase().includes(query.toLowerCase()) ||
        el?.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //handle Delete function
  const handledelete = async (value) => {
    await apiAdminConfig
      .delete(`specialization/${value.id}`)
      .then((response) => {
        if (response.data.status === 200) {
          snackbar({
            message: "Specialization Removed Successfully.",
            severity: "success",
          });
          setModel({
            open: false,
          });
          fetchdata();
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<ModalCustom value={model} handelDelete={handledelete} />}
          <Row className="mt-4">
            <Col md={4} sm={4} xs={12} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Specialization ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={8} sm={8} xs={12}>
              <Stack direction="horizontal" gap={3} className="content-header">
                <Box>
                  <InputGroup className="mb-3">
                    <Form.Control
                      className="rounded"
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Search"
                      onChange={(e) => {
                        setCurrentPage(1);
                        setQuery(e.target.value);
                      }}
                    />
                  </InputGroup>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#76B757",
                      display: "flex",
                      width: "max-content",
                    }}
                    onClick={handleShow}
                  >
                    Add Specialization
                  </Button>
                </Box>
              </Stack>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "white" }}></Card.Header>
              <Card.Body className="mt-4" style={{ minHeight: "300px" }}>
                {currentPost && currentPost.length !== 0 ? (
                  <Table size="md" responsive>
                    <thead
                      style={{
                        backgroundColor: "#F0F1F2",
                        textAlign: "left",
                      }}
                    >
                      <tr>
                        {tablehead.map((el, id) => {
                          return (
                            <th
                              style={
                                id === 0
                                  ? { width: "100%" }
                                  : el === "Action"
                                    ? { minWidth: "15vh", textAlign: "center" }
                                    : { minWidth: "25vh" }
                              }
                              key={id}
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
                            <td>{el?.specialization}</td>
                            <td>
                              <Image
                                width="100"
                                height="100"
                                src={el?.image}
                                alt={`${el?.name}.png`}
                              />
                            </td>
                            <td style={{ width: "20vh" }}>
                              {moment(el?.createdAt).format("DD/MM/YYYY")}
                            </td>
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el.status === true
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      borderColor: "#76B757",
                                      width: "15vh",
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#EEC048",
                                      borderColor: "#EEC048",
                                      width: "15vh",
                                    }
                                }
                              >
                                {el.status === true ? "Active" : "Inactive"}
                              </Button>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setModel({
                                              open: true,
                                              type: "delete",
                                              title: "Remove Specialization",
                                              message:
                                                "Are you sure? you won't be able to revert this!",
                                              id: el?._id,
                                            });
                                          }}
                                        >
                                          <MdDelete size={18} /> Delete
                                        </Dropdown.Item>
                                      </Stack>
                                    </Popover.Body>
                                  </Popover>
                                }>
                                  <Dropdown.Toggle
                                    variant="light"
                                    id="dropdown-basic"
                                  >
                                    <BsThreeDotsVertical />
                                  </Dropdown.Toggle>
                                </OverlayTrigger>
                              </Dropdown>
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

            {/* Add Specialization form  */}
            <Modal show={show} onHide={handleClose} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Add Specialization</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={formik.handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="specialization"
                      >
                        <Form.Label>Specialization</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.specialization}
                          name="specialization"
                          onChange={formik.handleChange}
                          placeholder="Enter Specialization"
                          className="mb-0"
                          isInvalid={
                            formik.touched.specialization &&
                            formik.errors.specialization
                          }
                        />
                        {formik.errors.specialization && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.specialization}
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

class ManageSpecialization extends Component {
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

export default ManageSpecialization;

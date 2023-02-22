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
import { BsThreeDotsVertical, BsSearch } from "react-icons/bs";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdDelete } from "react-icons/md";
import Image from "react-bootstrap/Image";
import moment from "moment";
import { useFormik } from "formik";
import { apiAdminConfig } from "../../../utils/api";
import InputGroup from "react-bootstrap/InputGroup";
import ModalCustom from "../../../Components/notify/Modal";
import Modal from "react-bootstrap/Modal";
import Videofram from "../../../Components/Home/Videofram";
import Nodata from "../../../Components/nodata/Nodata";
import { useSnackbar } from "../../../provider/snackbar";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

const Contant = () => {
  const snackbar = useSnackbar();
  const [lgShow, setLgShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [videoId, setVideoid] = useState("");
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [model, setModel] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    id: "",
  });

  let tablehead = ["S/N", "Title", "Thumbnail", "Created At", "Action"];

  // =============== Form Submission ===============
  const formik = useFormik({
    initialValues: {
      title: "",
      url: "",
      doctor_id: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.title) {
        errors.title = "Title is required";
      }
      if (!values.url) {
        errors.url = "Video url is required";
      }
      return errors;
    },
    onSubmit: async (values, { setErrors }) => {
      setLoader(true);
      values.slug = values.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      await apiAdminConfig
        .post(`doctorvideoupload/${values.doctor_id}`, values)
        .then((response) => {
          setLoader(false);
          if (response.status === 200) {
            formik.resetForm();
            fetchData();
            snackbar({
              message: "Coupon Created Successfully",
              severity: "success",
            });
          }
          if (response.status === 400) {
            snackbar({ message: response.data.message, status: "error" });
          }
        })
        .catch((error) => {
          const { response } = error;
          console.log("response", response);
        });
    },
  });

  // =============== get Doctors data ==============
  const fetchDoctors = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`doctor`)
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.data;
          let arr = [];
          for (let item of data) {
            arr.push({
              value: item._id,
              label: item.doctorName,
              spec: item.specialization,
              email: item.email,
            });
          }
          setOptions(arr);
          setLoader(false);
        }
      })
      .catch((error) => console.log("error", error));
  };

  // =================Get Videos ===================
  const fetchData = async () => {
    await apiAdminConfig
      .get(`doctorsprescribedVideos`)
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchDoctors();
  }, []);

  //================ Get current Posts =============
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts
    .filter((el) => el?.title.toLowerCase().includes(query.toLowerCase()))
    .slice(indexOfFirstPost, indexOfLastPost);

  //================ Change Page ================
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //=============== Remove Coupons =============
  const handledelete = async (value) => {
    await apiAdminConfig
      .delete(`removedoctorvideo/${value.id}`)
      .then((response) => {
        if (response.status === 200) {
          setModel({
            open: false,
          });
          fetchData();
          snackbar({
            message: response.data.message,
            severity: "success",
          });
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
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Videos Management ({query ? currentPost.length : posts.length})
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
          </Row>
          <div className="adminContant">
            <Card style={{ marginBottom: "1rem" }}>
              <Card.Body style={{ minHeight: "200px" }}>
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
                      <Form.Group style={{ textAlign: "left" }} controlId="url">
                        <Form.Label>Video URL</Form.Label>
                        <Form.Control
                          type="text"
                          value={formik.values.url}
                          name="url"
                          onChange={formik.handleChange}
                          placeholder="Enter Title"
                          className="mb-0"
                          isInvalid={formik.touched.url && formik.errors.url}
                        />
                        {formik.errors.url && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.url}
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
                        <Form.Select
                          aria-label="Select.."
                          value={formik.values.doctor_id}
                          name="doctor_id"
                          onChange={(e) => {
                            if (e.target.value !== "0") {
                              formik.setFieldValue("doctor_id", e.target.value);
                            }
                          }}
                          isInvalid={
                            formik.touched.doctor_id && formik.errors.doctor_id
                          }
                        >
                          <option value="0">Select Doctor</option>
                          {options.map((el, id) => {
                            return (
                              <option key={id} value={el?.value}>
                                {el?.label}, {el?.spec}, {el?.email}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {formik.errors.doctor_id && (
                          <Form.Control.Feedback type="invalid">
                            {formik.errors.doctor_id}
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
                            <td>{el?.title}</td>
                            <td>
                              <div className="hovercard"></div>
                              <Image
                                width="300"
                                height="200"
                                thumbnail
                                src={el?.thumbnail}
                                alt={el?.slug}
                              />
                            </td>
                            <td>
                              {moment(el?.createdAt).format("yyyy-MM-DD")}
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setVideoid(el.video_id);
                                            setLgShow(true);
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={(e) => {
                                            setModel({
                                              open: true,
                                              type: "delete",
                                              title: "Remove Video",
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
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Body>
                <Videofram id={videoId} />
              </Modal.Body>
            </Modal>
          </div>
        </>
      )}
    </>
  );
};

class VideoManagement extends Component {
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

export default VideoManagement;

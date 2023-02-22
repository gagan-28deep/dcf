import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import AddIcon from "@mui/icons-material/Add";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Nodata from "../../../Components/nodata/Nodata";
import { MdRemoveRedEye, MdDelete, MdMode, MdAdd } from "react-icons/md";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import ModalCustom from "../../../Components/notify/Modal";

const Contant = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
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
  let tablehead = [
    "S/N",
    "Clinic Name",
    "Clinic Manager",
    "State",
    "City",
    "Address",
    "Created On",
    "Status",
    "Action",
  ];
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`asset`)
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          console.log('apidata', apidata);
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
        el.city.toLowerCase().includes(query.toLowerCase()) ||
        el.state.toLowerCase().includes(query.toLowerCase()) ||
        el.clinicName.toLowerCase().includes(query.toLowerCase()) ||
        el.location.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //handle Delete function
  const handledelete = async (value) => {
    let api = {
      path: `asset/${value.id}`,
      method: "DELETE",
    };
    await apiAdminConfig
      .delete(`${api.path}`)
      .then((response) => {
        if (response.status === 200) {
          fetchdata();
          snackbar({
            message: "Clinic Removed Successfully",
            severity: "success",
          });
          setModel({
            open: false,
          });
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {<ModalCustom value={model} handelDelete={handledelete} />}
          <Row className="mt-4">
            <Col md={4} sm={4} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Clinics ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={8} sm={8}>
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
                  <Link
                    to={`/master/clinics/add-clinic`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      style={{
                        backgroundColor: "#76B757",
                        display: "flex",
                        width: "max-content",
                      }}
                      startIcon={<AddIcon style={{ color: "#fff" }} />}
                    >
                      Add Clinic
                    </Button>
                  </Link>
                </Box>
              </Stack>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Body className="mt-2" style={{ minHeight: "300px" }}>
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
                            <td>{el.clinicName}</td>
                            <td>{el?.clinicManagerId?.user_name}</td>
                            <td>{el.state}</td>
                            <td>{el.city}</td>
                            <td>{el.location}</td>
                            <td style={{ width: "20vh" }}>
                              {moment(el.createdAt).format("DD/MM/YYYY")}
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
                                            navigate(
                                              `/master/clinics/add-clinic-manager/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdAdd size={18} /> Manage Clinic Manager
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/clinics/clnic-view/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View Clinic
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(`/master/clinics/rooms`, {
                                              state: { data: el._id },
                                            });
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View Rooms
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/clinics/edit/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdMode size={18} /> Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            setModel({
                                              open: true,
                                              type: "delete",
                                              title: "Remove Clinic",
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
          </div>
        </>
      )}
    </>
  );
};

class Clinic extends Component {
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

export default Clinic;

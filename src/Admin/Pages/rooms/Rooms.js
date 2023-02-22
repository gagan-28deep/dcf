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
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdDelete, MdMode } from "react-icons/md";
import ModalCustom from "../../../Components/notify/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import Nodata from "../../../Components/nodata/Nodata";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

const Contant = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const snackbar = useSnackbar();
  const passValue = location?.state?.data;
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
    "Room Name",
    "Room Number",
    "Clinic Name",
    "Floor",
    "Specialization",
    "Rent",
    "Status",
    "Action",
  ];

  //fetch data function
  const fetchdata = async (id) => {
    setLoader(true);
    await apiAdminConfig
      .get(`getAllRoomByClinicId/${id}`)
      .then((response) => {
        if (response.status === 200) {
          let apidata = response.data.data;
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchdata(passValue);
  }, []);

  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  var currentPost = posts
    .filter(
      (el) =>
        el.specialization.toLowerCase().includes(query.toLowerCase()) ||
        el.roomName.toLowerCase().includes(query.toLowerCase()) ||
        el.roomNumber.toString().includes(query.toString())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //handle Delete function
  const handledelete = async (value) => {
    await apiAdminConfig
      .delete(`room/${value.id}`)
      .then((response) => {
        if (response.data.status === 200) {
          fetchdata(passValue);
          snackbar({
            message: "Room has been removed successfully.",
            severity: "success",
          });
          setModel({
            open: false,
          });
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
            <Col md={5} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Rooms ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={4}>
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
            </Col>
            <Col md={2} style={{ textAlign: "right" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#76B757" }}
                onClick={() => {
                  navigate(`/master/clinics/room/addroom/${passValue}`);
                }}
              >
                Add Room
              </Button>
            </Col>
            <Col md={1} style={{ textAlign: "left" }}>
              <Link to={`/master/clinics/`} style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="success">
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
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
                          return <th key={id}>{el}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: "left" }}>
                      {currentPost.map((el, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{el.roomName}</td>
                            <td>{el.roomNumber}</td>
                            <td>{el.clinicData.clinicName}</td>
                            <td>{el.floor}</td>
                            <td>{el.specialization}</td>
                            <td>{el.rentPerMonth}</td>
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el.paidStatus === true
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      borderColor: "#76B757",
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#EEC048",
                                      borderColor: "#EEC048",
                                    }
                                }
                              >
                                {el.paidStatus === true ? "Paid" : "Due"}
                              </Button>
                            </td>
                            <td>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/clinics/room/view/${passValue}/${el._id}`
                                            );
                                          }}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => {
                                            navigate(
                                              `/master/clinics/room/edit/${passValue}/${el._id}`
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
                                              title: "Remove Room",
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
                <div className="justify-content-between d-flex align-items-center">
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

class Rooms extends Component {
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

export default Rooms;

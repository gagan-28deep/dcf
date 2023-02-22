import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import "../../admin.css";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
// import ModalCustom from "../../../Components/notify/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdToggleOn } from "react-icons/md";
import { apiAdminConfig } from "../../../utils/api";
// import { useNavigate } from "react-router-dom";
import Nodata from "../../../Components/nodata/Nodata";
import { useSnackbar } from "../../../provider/snackbar";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";

const Contant = () => {
  // let navigate = useNavigate();
  const snackbar = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  // const [model, setModel] = useState({
  //   open: false,
  //   type: "",
  //   title: "",
  //   message: "",
  //   id: "",
  // });
  let tablehead = [
    "S/N",
    "Patient Name",
    "Contact No.",
    "Specialization",
    "Clinic Name",
    "Address",
    "Status",
    "Created At",
    "Action",
  ];
  const fetchdata = async () => {
    setLoader(true);
    let api = {
      path: "getconsultation",
      method: "GET",
    };
    await apiAdminConfig
      .get(`${api.path}`)
      .then((response) => {
        if (response.data.status === 200) {
          let apidata = response.data.data;
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
        el?.name.toLowerCase().includes(query.toLowerCase()) ||
        el?.specialization?.specialization
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        el?.clinic?.clinicName.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  // Handle Status
  const handleStatus = async (value) => {
    setLoader(true);
    let api = {
      path: `updateconsultation/${value._id}`,
      body: { status: value.status === true ? false : true },
    };
    await apiAdminConfig
      .put(`${api.path}`, api.body)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          snackbar({
            message: response.data.message,
            severity: "success",
          });
          fetchdata();
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
          {/* {<ModalCustom value={model} handelDelete={handleStatus} />} */}
          <Row className="mt-4">
            <Col md={8} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Consultations ({query ? currentPost.length : posts.length})
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
            <Card style={{ width: "100%" }}>
              <Card.Body className="mt-2" style={{ minHeight: "300px" }}>
                {currentPost && currentPost.length !== 0 ? (
                  <Table size="xxl" responsive>
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
                            {/* <td>{el?._id}</td> */}
                            <td>{el?.name}</td>
                            <td>{el?.contactNumber}</td>
                            <td>{el?.specialization?.specialization}</td>
                            <td>{el?.clinic?.clinicName}</td>
                            <td>{el?.clinic?.location}</td>
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el?.status === true
                                    ? {
                                      backgroundColor: "#E4F1DD",
                                      color: "#76B757",
                                      borderColor: "#76B757",
                                      width: "19vh",
                                    }
                                    : {
                                      backgroundColor: "#FDF8EA",
                                      color: "#EEC048",
                                      borderColor: "#EEC048",
                                      width: "19vh",
                                    }
                                }
                              >
                                {el?.status === true ? "Resolved" : "Pending"}
                              </Button>
                            </td>
                            <td>{moment(el.createdAt).format("DD/MM/YYYY")}</td>
                            <td style={{ textAlign: "center" }}>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        <Dropdown.Item
                                          onClick={() => handleStatus(el)}
                                        >
                                          <MdToggleOn size={18} /> Change Status
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

class Consultation extends Component {
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

export default Consultation;

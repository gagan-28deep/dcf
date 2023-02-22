import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import http from "../../../Config/HTTP_request";
import Table from "react-bootstrap/Table";
import "../../admin.css";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import Nodata from "../../../Components/nodata/Nodata";

const Contant = () => {
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [query, setQuery] = useState("");
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });
  let tablehead = [
    "S/N",
    "Appintment Id",
    "Doctor Name",
    "Patient Name",
    "Appointment Status",
    "Payment Status",
  ];
  const fetchdata = async () => {
    setLoader(true);
    let api = {
      path: "appointment/appointmentsOfPatients",
      method: "GET",
    };
    let response = await http(api);
    if (response.response) {
      console.log("response.response", response.response);
    } else {
      if (response.data.status === 200) {
        let apidata = response.data.data;
        console.log("apidata----->", apidata);
        setPosts(apidata);
        setLoader(false);
      }
    }
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
        el.doctorname.toLowerCase().includes(query.toLowerCase()) ||
        el.patientname.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
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
          {<CustomSnackbar value={snackData} />}
          <Row className="mt-4">
            <Col md={8} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Patient Appointment Booking (
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
            {/* <Col md={2} style={{ textAlign: "left" }}>
                  <Link
                    to={`/master/staff/add-staff`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#76B757" }}
                    >
                      + Add Staff
                    </Button>
                  </Link>
                </Col> */}
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
                                    : { minWidth: "28vh" }
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
                            <td>{el._id}</td>
                            <td>{el.doctorname}</td>
                            <td>{el.patientname}</td>
                            {/* <td>
                                {moment(el.createdAt).format("DD/MM/YYYY")}
                              </td> */}
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el.status === "done" ||
                                    el.status === "rescheduled"
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
                                {el.status === "done" ||
                                  el.status === "rescheduled"
                                  ? "Done"
                                  : "Pending"}
                              </Button>
                            </td>
                            <td>
                              <Button
                                disabled
                                size="sm"
                                variant="success"
                                style={
                                  el.payment_status === true
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
                                {el.payment_status === true
                                  ? "Done"
                                  : "Pending"}
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

class Payments extends Component {
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

export default Payments;

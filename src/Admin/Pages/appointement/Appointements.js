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
import ModalCustom from "../../../Components/notify/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdOutlineCancel, MdMode } from "react-icons/md";
import { apiAdminConfig } from "../../../utils/api";
import { useNavigate } from "react-router-dom";
import Nodata from "../../../Components/nodata/Nodata";
import { useSnackbar } from "../../../provider/snackbar";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import ReceiptIcon from '@mui/icons-material/Receipt';
import { InvoiceDialog } from "./invoice";

import { TbFileInvoice } from "react-icons/tb";
const Contant = () => {
  let navigate = useNavigate();
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
    "Appointment",
    "Patient Name",
    "Doctor Name",
    "Specialization",
    "Type",
    "Date",
    "Time",
    "Status",
    "Payment Status",
    "Created At",
    "Action",
  ];
  const fetchdata = async () => {
    setLoader(true);
    let api = {
      path: "appointment/getAllAppointments",
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
        el.doctorname.toLowerCase().includes(query.toLowerCase()) ||
        el.patientname.toLowerCase().includes(query.toLowerCase()) ||
        el.status.toLowerCase().includes(query.toLowerCase()) ||
        el.departmentname.toLowerCase().includes(query.toLowerCase())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  // Handle Status
  const handleStatus = async (value) => {
    setModel({ open: false });
    setLoader(true);
    let api = {
      path: `appointment/cancelAppointment/${value.id}`,
      body: { by: "admin" },
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
          window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  };


  const [open, setOpen] = React.useState({
    boolean: false,
    _id: ""
  });

  const handleClickOpen = (id) => {
    setOpen({ boolean: true, _id: id });
  };

  const handleClose = () => {
    setOpen({ boolean: false, _id: "" });
  };

  // Generate Inovice
  const generateInvoice = async (value) => {
    setLoader(true);
    console.log('generateInvoice', value);
    await apiAdminConfig
      .get(`getAppointmentSlip/${value}`)
      .then((response) => {
        if (response.status === 200) {
          setLoader(false);
          snackbar({
            message: "Invoice generated successfully",
            severity: "success",
          });
          fetchdata();
          setLoader(false);
          // window.location.reload();
        }
      })
      .catch((error) => console.log("error", error));
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) :
        (
          <>
            {<ModalCustom value={model} handelDelete={handleStatus} />}
            <Row className="mt-4">
              <Col md={8} style={{ textAlign: "left" }}>
                <h3 style={{ height: "40px" }}>
                  Appointments ({query ? currentPost.length : posts.length})
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
                              <td>{el._id}</td>
                              <td>{el.patientname}</td>
                              <td>{el.doctorname}</td>
                              <td>{el.departmentname}</td>
                              <td>{el.appointment_type}</td>
                              <td>{moment(el.date).format("DD/MM/YYYY")}</td>
                              <td>
                                {el.room_time_slot_id
                                  ? el.room_time_slot_id.start_time
                                  : ""}
                              </td>
                              <td>
                                <Button
                                  disabled
                                  size="sm"
                                  variant="success"
                                  style={
                                    el.status === "done" ||
                                      el.status === "rescheudled"
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
                                  {el.status}
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
                                        width: "18vh",
                                      }
                                      : {
                                        backgroundColor: "#FDF8EA",
                                        color: "#EEC048",
                                        borderColor: "#EEC048",
                                        width: "18vh",
                                      }
                                  }
                                >
                                  {el.payment_status === true
                                    ? "Paid"
                                    : "Pending"}
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
                                            onClick={() => {
                                              navigate(
                                                `/master/appointments/view/${el._id}`
                                              );
                                            }}
                                          >
                                            <MdRemoveRedEye size={18} /> View
                                          </Dropdown.Item>

                                          <Dropdown.Item
                                            style={{
                                              display: `${el.status === "cancelled" ||
                                                el.status === "done"
                                                ? "none"
                                                : "block"
                                                }`,
                                            }}
                                            onClick={() => {
                                              setModel({
                                                open: true,
                                                title: "Appointment Cancel",
                                                type: "cancel",
                                                message:
                                                  "Sure you want to cancel this appointments?",
                                                id: el._id,
                                              });
                                            }}
                                          >
                                            <MdOutlineCancel size={18} /> Cancel
                                            Appointment
                                          </Dropdown.Item>

                                          {/* <Dropdown.Item
                                            onClick={() => handleClickOpen(el._id)}
                                          >
                                            <ReceiptIcon size={18} /> Invoice
                                          </Dropdown.Item> */}

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
            <InvoiceDialog
              open={open.boolean}
              _id={open._id}
              handleClose={handleClose}
            />
          </>
        )}

    </>
  );
};

class Appointments extends Component {
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

export default Appointments;

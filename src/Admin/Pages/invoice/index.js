import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { Box } from "@mui/material";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { apiAdminConfig } from "../../../utils/api";
import Dropdown from "react-bootstrap/Dropdown";
import { Link, useNavigate } from "react-router-dom";
import Nodata from "../../../Components/nodata/Nodata";
import {
  MdRemoveRedEye,
  MdDelete,
  MdMode,
  MdOutlineDownload,
  MdSend,
  MdToggleOn,
  MdOutlineFileCopy,
} from "react-icons/md";
import {
  CiViewTimeline
} from "react-icons/ci";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import { Country, State, City } from 'country-state-city';
import { InvoiceDialog } from "./invoiceDialog";
import { useSnackbar } from "../../../provider/snackbar";
import useInvoicePDF from "../../../Components/pdf/invoicePDF";


const Contant = () => {
  const snackbar = useSnackbar();
  const navigate = useNavigate();
  const [download, setDownload] = React.useState({
    href: "",
    index: ""
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    "Doctor Name",
    "Patient Name",
    "Place Of Supply",
    "Subject",
    "Sub Total",
    "Total Amount",
    "Created At",
    "Action",
  ];

  const fetchdata = async () => {
    setLoading(true);
    await apiAdminConfig
      .get("invoice/getall")
      .then((response) => {
        if (response.data.status === true) {

          setLoading(false);
          let apidata = response.data.data;
          setPosts(apidata);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(() => {
    fetchdata();
  }, []);

  console.log("Country", Country.getAllCountries())
  console.log("State", State.getAllStates())
  // Get current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = posts
    .filter(
      (el) =>
        el.doctor_name.toLowerCase().includes(query.toLowerCase()) ||
        el.patient_name.toLowerCase().includes(query.toLowerCase())
      // el.email.toLowerCase().includes(query.toLowerCase()) ||
      // el.contact_number.toString().includes(query.toString())
    )
    .slice(indexOfFirstPost, indexOfLastPost);

  //Change Page
  const paginate = (pagenumber) => {
    setsnackdata({ open: false });
    setCurrentPage(pagenumber);
  };
  console.log("postsposts", posts)


  //Handle status
  const hadleDelete = async (value) => {
    // let body = {
    //   is_active: value.is_active === true ? false : true,
    // };
    // await apiAdminConfig
    //   .put(`patient/${value._id}`, body)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       fetchdata();
    //       setsnackdata({
    //         open: true,
    //         message: response.data.message,
    //         status: "success",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error", error);
    //   });
  };

  //handle downlaod
  const handleViewInvoice = async (id) => {
    await apiAdminConfig.post(`invoice/view/${id}`).then((response) => {
      if (response?.data) {
        // setDownload({ href: response?.data?.url, index: index })
        window.open(response?.data?.url, "_parent")
        snackbar({
          message: response?.data?.message,
          severity: "success",
        });
      } else {
        snackbar({
          message: response?.data?.message,
          severity: "error",
        });
      }
    }).catch((error) => {
      console.log("invoiceError", error)
      snackbar({
        message: "Something went wrong...",
        severity: "error",
      });
    })
  }

  //handle client invoice
  const handleClientInvoice = async (id) => {
    await apiAdminConfig.get(`invoice/sendtoclient/${id}`).then((response) => {
      if (response?.data.status) {
        snackbar({
          message: response?.data?.message,
          severity: "success",
        });
      } else {
        snackbar({
          message: response?.data?.message,
          severity: "error",
        });
      }
    }).catch((error) => {
      console.log("invoiceError", error)
      snackbar({
        message: "Something went wrong...",
        severity: "error",
      });
    })
  }
  //Handle Delete
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

  const { generatePdfDocument } = useInvoicePDF();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomSnackbar value={snackData} />{" "}
          <Row className="mt-4">
            <Col md={4} sm={4} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Invoice ({query ? currentPost.length : posts.length})
              </h3>
            </Col>
            <Col md={8} sm={8}>
              <Stack direction="horizontal" gap={3} className="content-header">
                <Box>
                  <InputGroup className="mb-3">
                    <Form.Control
                      className="rounded me-auto"
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
                    startIcon={<AddIcon style={{ color: "#fff" }} />}
                    onClick={() => navigate('/master/invoice/add')}
                  >
                    Add INVOICE
                  </Button>
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
                      {currentPost.map((el, index) => {
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{el.doctor_name}</td>
                            <td>{el.patient_name}</td>
                            <td>{el.place_supply}</td>
                            <td>{el.subject}</td>
                            <td>{el.sub_total}</td>
                            <td>{el.total_amount}</td>

                            <td>{moment(el.createdAt).format("DD/MM/YYYY")}</td>
                            <td style={{ textAlign: "center" }}>
                              <Dropdown>
                                <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
                                  <Popover id="popover-basic">
                                    <Popover.Body>
                                      <Stack gap={2}>
                                        {/* <Dropdown.Item
                                        // onClick={() => handleClickOpen(el._id)}
                                        >
                                          <MdRemoveRedEye size={18} /> View
                                        </Dropdown.Item> */}
                                        {/* <Dropdown.Item
                                          onClick={() => navigate(`/master/invoice/edit/${el._id}`)}
                                        >
                                          <MdMode size={18} /> Edit
                                        </Dropdown.Item>
                                        <Dropdown.Item
                                          onClick={() => hadleDelete(el._id)}
                                        >
                                          <MdDelete size={18} /> Delete
                                        </Dropdown.Item> */}
                                        <Dropdown.Item
                                          onClick={() => generatePdfDocument(el, snackbar)}
                                        >
                                          <CiViewTimeline size={18} /> View Invoice
                                        </Dropdown.Item>
                                        {/* {download.index == index && <Dropdown.Item
                                          // onClick={() => handleViewInvoice(el._id)}
                                          href={download.href}
                                          download
                                        >
                                          <MdOutlineDownload size={18} /> Download Invoice
                                        </Dropdown.Item>} */}
                                        <Dropdown.Item
                                          onClick={() => handleClientInvoice(el._id)}
                                        >
                                          <MdSend size={18} /> Sent Client Invoice
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

class Patients extends Component {
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
            <Contant />
          </div>
        )}
      </div>
    );
  }
}

export default Patients;

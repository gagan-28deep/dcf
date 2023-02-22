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
import { useNavigate } from "react-router-dom";
import { apiAdminConfig } from "../../../utils/api";
import Dropdown from "react-bootstrap/Dropdown";
import { MdRemoveRedEye, MdDelete, MdMode, MdToggleOn } from "react-icons/md";
import CustomSnackbar from "../../../Components/notify/Snackbar";
import ModalCustom from "../../../Components/notify/Modal";

const Contant = () => {
  let navigate = useNavigate();
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
  const [model, setModel] = useState({
    open: false,
    type: "",
    title: "",
    message: "",
    id: "",
  });

  let tablehead = [
    "S/N",
    "Patient",
    "Doctor",
    "Order ID",
    "Payment ID",
    "Amount",
    "Status",
    "Transacted On",
  ];
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`payments/getpayments`)
      .then((res) => {
        if (res.status === 200) {
          let apidata = res.data.data;
          console.log("apidata", apidata[0]);
          setPosts(apidata);
          setLoader(false);
        }
      })
      .catch((err) => console.log(err));
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
        el?.user_id?.patient_name.toLowerCase().includes(query.toLowerCase()) ||
        el?.doctor_id?.doctorName.toLowerCase().includes(query.toLowerCase()) ||
        el.order_id.toLowerCase().includes(query.toLowerCase()) ||
        el.payment_id.toLowerCase().includes(query.toLowerCase()) ||
        el.amount.toString().includes(query.toLowerCase())
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
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>
                Online Payments ({query ? currentPost.length : posts.length})
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
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                variant="contained"
                style={{ backgroundColor: "#76B757" }}
                onClick={() => navigate(`/master/reports/`, { replace: true })}
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Body className="mt-2" style={{ minHeight: "400px" }}>
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
                          <td>{el?.user_id?.patient_name}</td>
                          <td>{el?.doctor_id?.doctorName}</td>
                          <td>{el?.order_id}</td>
                          <td>{el?.payment_id}</td>
                          <td>{el?.amount}</td>
                          <td>{el?.payment_status}</td>
                          <td>{moment(el?.createdAt).format("MMM DD,yyyy")}</td>
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
          </div>
        </>
      )}
    </>
  );
};

class OnlinePayments extends Component {
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

export default OnlinePayments;

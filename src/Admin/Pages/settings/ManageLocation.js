import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import AddIcon from "@mui/icons-material/Add";
import "../../admin.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { MdDelete, MdMode } from "react-icons/md";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import Nodata from "../../../Components/nodata/Nodata";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
import ModalCustom from "../../../Components/notify/Modal";

const Contant = () => {
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const [posts, setPosts] = useState([]);
  const [loader, setLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentPostFilter, setCurrentPostFilter] = useState({
    currentPost: [],
    indexOfFirstPost: 0,
    indexOfLastPost: 0
  })
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
    "State",
    "City",
    "Pincode",
    "Address",
    "Status",
    "Action",
  ];
  //fetch data function
  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`location`)
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

  console.log('currentPage', currentPage)

  // Get current Posts
  const getQueryData = (postsData) => {
    setLoader(true);
    console.log('eeeepostsData', postsData)
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    console.log('indexOFpost', indexOfLastPost, indexOfFirstPost)
    // let currentPost = []
    let currentPost = postsData.length && postsData
      .filter(
        (el) =>
          el?.location?.toLowerCase().includes(query.toLowerCase()) ||
          el?.state?.toLowerCase().includes(query.toLowerCase()) ||
          el?.city?.toLowerCase().includes(query.toLowerCase()) ||
          el?.pincode?.toString().includes(query.toLowerCase())
      )
      .slice(indexOfFirstPost, indexOfLastPost);
    console.log('eeeecurrentPost', indexOfLastPost, indexOfFirstPost)
    setCurrentPostFilter({
      currentPost: currentPost.length != 0 ? currentPost : postsData,
      indexOfFirstPost: indexOfLastPost,
      indexOfLastPost: indexOfFirstPost
    })
    setLoader(false);
  }

  useEffect(() => {
    if (posts.length !== 0) {
      getQueryData(posts)
    }
  }, [query.toLocaleLowerCase(), posts.length, currentPage, postsPerPage])

  console.log('currentPostFilter', currentPostFilter)

  //Change Page
  const paginate = (pagenumber) => {
    setCurrentPage(pagenumber);
  };

  //handle Delete function
  const handledelete = async (value) => {
    await apiAdminConfig
      .delete(`location/${value.id}`)
      .then((response) => {
        if (response.data.status === 200) {
          snackbar({
            message: "Location Removed Successfully.",
            severity: "success",
          });
          setModel({
            open: false,
          });
          fetchdata();
          if (currentPostFilter.currentPost.length == 0) {
            setCurrentPage(currentPage - 1)
          }
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
                Location ({query ? currentPostFilter?.currentPost.length : posts.length})
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
                    startIcon={<AddIcon style={{ color: "#fff" }} />}
                    onClick={() => {
                      navigate(`/master/settings/location/add`);
                    }}
                  >
                    Add Location
                  </Button>
                </Box>
              </Stack>
            </Col>
          </Row>
          <div className="adminContant">
            <Card style={{ width: "100%" }}>
              <Card.Header style={{ backgroundColor: "white" }}></Card.Header>
              <Card.Body className="mt-4" style={{ minHeight: "300px" }}>
                {currentPostFilter?.currentPost && currentPostFilter?.currentPost.length !== 0 ? (
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
                      {currentPostFilter?.currentPost.map((el, id) => {
                        return (
                          <tr key={id}>
                            <td>{id + 1}</td>
                            <td>{el?.state}</td>
                            <td>{el?.city}</td>
                            <td>{el?.pincode}</td>
                            <td>{el?.address}</td>

                            {/* <td style={{ width: "20vh" }}>
                              {moment(el.createdAt).format("DD/MM/YYYY")}
                            </td> */}
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
                                              `/master/settings/location/edit/${el._id}`
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
                                              title: "Remove Location",
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
                    Showing {currentPostFilter?.indexOfLastPost + 1}-{currentPostFilter?.indexOfFirstPost} out of{" "}
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

class ManageLocation extends Component {
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

export default ManageLocation;

import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import http from "../../../Config/HTTP_request";
import Table from "react-bootstrap/Table";
import moment from "moment";
import AddIcon from "@mui/icons-material/Add";
import "../../admin.css";
import { BsSearch, BsThreeDotsVertical } from "react-icons/bs";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Dropdown from "react-bootstrap/Dropdown";
import TablePagination from "../../../Components/Pagination/Pagination";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { Box } from "@mui/material";
import { IoReload } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import {
    MdRemoveRedEye,
    MdDelete,
    MdMode,
} from "react-icons/md";
import { apiAdminConfig } from "../../../utils/api";
import Nodata from "../../../Components/nodata/Nodata";
import ModalCustom from "../../../Components/notify/Modal";
import { useSnackbar } from "../../../provider/snackbar";

const Contant = () => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const snackbar = useSnackbar();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [query, setQuery] = useState("");
    const [filterdeptName, setfilterdeptName] = useState([]);
    const [clinics, setClinics] = useState([]);

    const [model, setModel] = useState({
        open: false,
        type: "",
        title: "",
        message: "",
        id: "",
    });

    let tablehead = [
        "S/N",
        "Patient Name",
        "Contact No.",
        "Specialization",
        "Address",
        "Clinic",
        "Lead type",
        "Remark",
        "Created At",
        "Action",
    ];
    const fetchdata = async () => {
        setFilter({})
        setLoading(true);
        await apiAdminConfig
            .post("leadmanagement/getall")
            .then((response) => {
                if (response.data.status === true) {
                    let apidata = response.data.data;
                    setPosts(apidata);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    //specialization data
    const getdeptNames = async () => {
        let api = {
            path: "deptNames",
            method: "GET",
        };
        let response = await http(api);

        if (response.response) {
            setLoading(false);
            console.log("response.response", response.response);
        } else {
            if (response.status === 200) {
                let spec = await response.data.data.map((el) => el.specialization);
                setfilterdeptName(spec);
            }
        }
    };

    // get clinic list
    const fetchClinic = async () => {
        await apiAdminConfig
            .post(`appointment/getAllAssignDrClinic`)
            .then((response) => {
                let data = response.data.data;
                let arr = [];
                for (let item of data) {
                    arr.push({ value: item._id, label: item.clinicName });
                }
                console.log(arr);
                setClinics(arr);
            })
            .catch((error) => {
                console.log("error", error);
            });
    };

    const [filter, setFilter] = useState({});
    // handle state, city, spec filter
    const handleFilterchange = async (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value });
    };

    const handleFilter = async () => {
        await apiAdminConfig
            .post("leadmanagement/getall", filter)
            .then((response) => {
                if (response.status === 200) {
                    let apidata = response.data.data;
                    setPosts(apidata);
                }
            })
            .catch((error) => {
                console.log("error---->", error);
            });
    };

    //handle Delete function
    const handledelete = async (value) => {
        console.log('handle delte value', value);
        await apiAdminConfig
            .delete(`leadmanagement/remove/${value.id}`)
            .then((response) => {
                console.log("response------->", response);
                if (response && response?.status === 200) {
                    fetchdata();
                    setModel({ open: false })
                    setTimeout(() => {
                        snackbar({
                            message: "Lead has been removed successfully.",
                            severity: "success",
                        })
                    }, 1000);
                }
            })
            .catch((error) => {
                console.log("error---->", error);
            });
    };

    useEffect(() => {
        fetchdata();
        getdeptNames();
        fetchClinic();
    }, []);

    // Get current Posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;

    const currentPost = posts
        .filter(
            (el) =>
                el.user_name.toLowerCase().includes(query.toLowerCase()) ||
                el.specialization.toLowerCase().includes(query.toLowerCase()) ||
                el.user_number.toString().includes(query.toString()) ||
                el?.clinic?.clinicName.toLowerCase().includes(query.toLowerCase())
        )
        .slice(indexOfFirstPost, indexOfLastPost);

    //Change Page
    const paginate = (pagenumber) => {
        setCurrentPage(pagenumber);
    };

    useEffect(() => {

    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {<ModalCustom value={model} handelDelete={handledelete} />}
                    <Row className="mt-4">
                        <Col md={4} sm={4} style={{ textAlign: "left" }}>
                            <h3 style={{ height: "40px" }}>
                                Leads ({query ? currentPost.length : posts.length})
                            </h3>
                        </Col>
                        <Col md={8} sm={8}>
                            <Stack className="content-header" direction="horizontal" gap={3}>
                                <Box>
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
                                </Box>
                                <Box>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: "#76B757", width: "25vh" }}
                                        startIcon={<AddIcon style={{ color: "#fff" }} />}
                                        onClick={() => {
                                            navigate(`/master/leadmanagement/add`);
                                        }}
                                    >
                                        Add Lead
                                    </Button>
                                </Box>
                            </Stack>
                        </Col>
                    </Row>
                    <div className="adminContant">
                        <Card style={{ width: "100%" }}>
                            <Card.Header style={{ backgroundColor: "white" }}>
                                <Row style={{ minHeight: "50px" }}>
                                    <Col className={"adminContent-1"}>
                                        <Form.Select
                                            onChange={handleFilterchange}
                                            name="lead_type"
                                        >
                                            <option value="0">Filter By Lead</option>
                                            <option value="COLD">COLD</option>
                                            <option value="WARM">WARM</option>
                                            <option value="HOT">HOT</option>
                                        </Form.Select>
                                    </Col>
                                    <Col className={"adminContent-1"}>
                                        <Form.Select
                                            onChange={handleFilterchange}
                                            name="specialization"
                                        >
                                            <option value="0">Filter By Specialization</option>
                                            {filterdeptName.map((el, id) => {
                                                return (
                                                    <option key={id} spec={el}>
                                                        {el}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col style={{display : localStorage.getItem("user_type")=== "subadmin" ? "none" : "block"}} className={"adminContent-1"}>
                                        <Form.Select
                                            onChange={handleFilterchange}
                                            name="clinic"
                                        >
                                            <option value="0">Filter By Clinic</option>
                                            {clinics.map((el, id) => {
                                                return (
                                                    <option key={id} value={el.value} >
                                                        {el.label}
                                                    </option>
                                                );
                                            })}
                                        </Form.Select>
                                    </Col>
                                    <Col className={"adminContent-1"}>
                                        <div>
                                            <Button
                                                variant="outlined"
                                                style={{ color: "#76B757", borderColor: "#76B757" }}
                                                onClick={handleFilter}
                                            >
                                                Apply Filter
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col className={"adminContent-1"}>
                                        <div>
                                            <Button
                                                variant="outlined"
                                                style={{ color: "#F37A20", borderColor: "#F37A20" }}
                                                startIcon={<IoReload style={{ color: "#F37A20" }} />}
                                                onClick={fetchdata}
                                            >
                                                Reset
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </Card.Header>
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
                                                        <td>{el?.user_name}</td>
                                                        <td>{el?.user_number}</td>
                                                        <td>{el?.specialization}</td>
                                                        <td>{el?.address}</td>
                                                        <td>{el?.clinic?.clinicName}</td>
                                                        <td>
                                                            <Button
                                                                disabled
                                                                size="sm"
                                                                variant="success"
                                                                style={
                                                                    el.lead_type === "COLD" ?
                                                                        {
                                                                            backgroundColor: "#EAF5FB",
                                                                            color: "#5CB2E3",
                                                                            borderColor: "#5CB2E3",
                                                                            width: "15vh",

                                                                        } : el.lead_type === "WARM" ? {
                                                                            backgroundColor: "#FDF8EA",
                                                                            color: "#EEC048",
                                                                            borderColor: "#EEC048",
                                                                            width: "15vh",
                                                                        } : {
                                                                            backgroundColor: "#FCE2DB",
                                                                            color: "#C02231",
                                                                            width: "15vh",
                                                                        }
                                                                }

                                                            >
                                                                {el.lead_type}
                                                            </Button>
                                                        </td>
                                                        <td>
                                                            <Button
                                                                disabled
                                                                size="sm"
                                                                variant="success"
                                                                style={
                                                                    el.remarks === "DONE"
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
                                                                {el.remarks}
                                                            </Button>
                                                        </td>
                                                        <td style={{ width: "20vh" }}>
                                                            {moment(el?.createdAt).format("DD/MM/YYYY")}
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
                                                                                            `/master/leadmanagement/view/${el._id}`
                                                                                        );
                                                                                    }}
                                                                                >
                                                                                    <MdRemoveRedEye size={18} /> View
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item
                                                                                    onClick={() => {
                                                                                        navigate(
                                                                                            `/master/leadmanagement/edit/${el._id}`
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
                                                                                            title: "Remove Lead",
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
                    </div>{" "}
                </>
            )
            }
        </>
    );
};

class Leadmanagement extends Component {
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

export default Leadmanagement;

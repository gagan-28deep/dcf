import React, { useEffect, Component, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import http from "../../../Config/HTTP_request";
import "../../admin.css";
import { useParams } from "react-router-dom";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";
import CustomSnackbar from "../../../Components/notify/Snackbar";

const Contant = () => {
  let navigate = useNavigate();
  let { clinicId, id } = useParams();
  const [validated, setValidated] = useState(false);
  const [postdata, setPostdata] = useState({
    rentPerMonth: 0,
    roomName: "",
    roomNumber: 0,
    floor: 0,
    specialization: "",
  });
  const [loader, setLoader] = useState(false);
  const [options, setOptions] = useState([]);
  const daysArray = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];
  const [floorcounts, setFloorcounts] = useState([]);
  const [days, setDays] = useState([]);

  const [error, setError] = useState({
    userName: "",
    employeeId: "",
    email: "",
    password: "",
  });
  const [snackData, setsnackdata] = React.useState({
    open: false,
    message: "",
    status: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    fetchdata(postdata);
  };

  const fetchdata = async (value) => {
    setLoader(true);
    let weekdays = days.map((el) => el.value);
    const api = {
      path: `editRoom/${id}`,
      method: "POST",
      body: {
        ...value,
        days: JSON.stringify(weekdays),
        clinicData: id,
      },
    };
    let response = await http(api);
    if (response.response) {
      if (response.response.data.status === 400) {
        setError(true);
        setError((prevState) => ({
          ...prevState,
          email: response.response.data.message,
        }));
        setLoader(false);
      }
    } else {
      if (response.data.status === 401) {
        setsnackdata((prevState) => ({
          ...prevState,
          open: true,
          message: `Session has been expired.`,
          status: "error",
        }));
        setTimeout(() => {
          navigate("../admin-signin", {
            replace: true,
            state: { data: clinicId },
          });
        }, 1500);
      } else {
        setLoader(false);
        setsnackdata((prevState) => ({
          ...prevState,
          open: true,
          message: `Room updated successfully.`,
          status: "success",
        }));
        // setTimeout(() => {
        navigate(`/master/clinics/rooms`, {
          state: { data: clinicId },
        });
        // }, 1500);
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.value !== "0") {
      if (e.target.name === "roomNumber" || e.target.name === "rentPerMonth") {
        setPostdata({ ...postdata, [e.target.name]: parseInt(e.target.value) });
      } else {
        setPostdata({
          ...postdata,
          [e.target.name]: e.target.value,
        });
      }
    }
  };

  // get DeptName
  const fetchDeptName = async () => {
    setLoader(true);
    const api = {
      path: "getDeptName",
      method: "POST",
    };
    let response = await http(api);
    if (response.response) {
      console.log("response.response", response.response);
    } else {
      if (response.status === 200) {
        let data = response.data.data;
        let arr = [];
        for (let item of data) {
          arr.push({ value: item, label: item });
        }
        setOptions(arr);
        setLoader(false);
      }
    }
  };

  // get Clinic Data
  const fetchClinicdata = async (value) => {
    setLoader(true);
    const api = {
      path: `asset/${value}`,
      method: "GET",
    };
    let response = await http(api);
    if (response.response) {
      if (response.response.data.status === 400) {
        setLoader(false);
      }
    } else {
      if (response.status === 200) {
        let arr = [];
        for (let i = 1; i <= parseInt(response.data.data.floorCount); i++) {
          arr.push({ value: i.toString(), label: i });
        }
        setFloorcounts(arr);
      }
      setLoader(false);
    }
  };

  //get room data
  const fecthRoomData = async (value) => {
    setLoader(true);
    const api = {
      path: `getRoomById/${value}`,
      method: "GET",
    };
    let response = await http(api);
    if (response.response) {
      if (response.response.data.status === 400) {
        setLoader(false);
      }
    } else {
      if (response.status === 200) {
        setPostdata((prevState) => ({
          ...prevState,
          rentPerMonth: response.data.data[0].roomId.rentPerMonth,
          roomName: response.data.data[0].roomId.roomName,
          roomNumber: response.data.data[0].roomId.roomNumber,
          specialization: response.data.data[0].roomId.specialization,
          floor: response.data.data[0].roomId.floor,
        }));
        let d = [];
        response.data.data.map((el) => {
          return d.push({ value: el.day, label: el.day });
        });
        setDays(d);
      }
      setLoader(false);
      setsnackdata((prevState) => ({
        ...prevState,
        open: false,
      }));
    }
  };

  useEffect(() => {
    fetchDeptName();
    fecthRoomData(id);
    fetchClinicdata(clinicId);
  }, []);

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
          <CustomSnackbar value={snackData} />
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Edit Room</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Button
                onClick={() => {
                  navigate(`/master/clinics/rooms`, {
                    state: { data: clinicId },
                  });
                }}
                variant="outlined"
                color="success"
              >
                Back
              </Button>
            </Col>
          </Row>
          <div className="adminContant">
            <Card>
              <Card.Body style={{ minHeight: "300px" }}>
                <Form onSubmit={handleSubmit}>
                  <Row className="mb-3">
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="floor"
                      >
                        <Form.Label>Floor</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={postdata.floor}
                          name="floor"
                          onChange={handleChange}
                        >
                          <option value="0">Select Floor</option>
                          {floorcounts.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="roomName"
                      >
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.roomName}
                          name="roomName"
                          placeholder="Enter Room Name"
                          onChange={handleChange}
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="roomNumber"
                      >
                        <Form.Label>Room Number</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          value={postdata.roomNumber}
                          name="roomNumber"
                          onChange={handleChange}
                          placeholder="Enter Room Number"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="specialization"
                      >
                        <Form.Label>Specialization</Form.Label>
                        <Form.Select
                          aria-label="Select.."
                          value={postdata.specialization}
                          name="specialization"
                          onChange={handleChange}
                        >
                          <option value="0">Select Specialization</option>
                          {options.map((el, id) => {
                            return (
                              <option key={id} value={el.value}>
                                {el.label}
                              </option>
                            );
                          })}
                        </Form.Select>
                        {/* <MultiSelect
                          key={options._id}
                          options={options}
                          value={selected}
                          onChange={setSelected}
                          hasSelectAll={false}
                        /> */}
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="rentPerMonth"
                      >
                        <Form.Label>Rent Per Month</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          value={postdata.rentPerMonth}
                          name="rentPerMonth"
                          onChange={handleChange}
                          placeholder=""
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="days"
                      >
                        <Form.Label>Select Days</Form.Label>
                        <MultiSelect
                          key={daysArray.id}
                          options={daysArray}
                          value={days}
                          onChange={setDays}
                          hasSelectAll={true}
                        />
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
                      Update
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: "#76B757",
                        color: "#76B757",
                      }}
                      variant="outlined"
                      className="rounded"
                      onClick={() => fecthRoomData(id)}
                    >
                      Reset
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class EditRoom extends Component {
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

export default EditRoom;

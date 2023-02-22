import React, { useEffect, Component, useState } from "react";
import Button from "react-bootstrap/Button";
// import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../admin.css";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { apiAdminConfig } from "../../../utils/api";
import { Stack } from "react-bootstrap";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ProgressBar from "react-bootstrap/ProgressBar";

const Contant = () => {
  let navigate = useNavigate();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [doc, setDoc] = useState({});
  const [pat, setPat] = useState({});
  const [appointments, setAppointments] = useState({});
  const [clinicdata, setClinicdata] = useState({});

  const fetchData = async (url, value) => {
    return await apiAdminConfig
      .post(url, {
        startd: value,
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data.count;
        }
      })
      .catch((error) => {
        console.log("error=====>", error);
      });
  };

  const fetchAPi = async () => {
    setLoader(true);
    const week = moment().subtract(1, "week").toISOString();
    const month = moment().subtract(1, "months").toISOString();
    const year = moment().subtract(1, "years").toISOString();
    Promise.all([
      fetchData(`adminreport/doctorfilterby`, week),
      fetchData(`adminreport/doctorfilterby`, month),
      fetchData(`adminreport/doctorfilterby`, year),
      fetchData(`adminreport/patientfilterby`, week),
      fetchData(`adminreport/patientfilterby`, month),
      fetchData(`adminreport/patientfilterby`, year),
      fetchData(`adminreport/appointmentsdoctorsfilterby`, week),
      fetchData(`adminreport/appointmentsdoctorsfilterby`, month),
      fetchData(`adminreport/appointmentsdoctorsfilterby`, year),
    ]).then((values) => {
      console.log(values);
      setDoc((prev) => ({
        ...prev,
        week: values[0],
        month: values[1],
        year: values[2],
      }));
      setPat((prev) => ({
        ...prev,
        week: values[3],
        month: values[4],
        year: values[5],
      }));
      setAppointments((prev) => ({
        ...prev,
        week: values[6],
        month: values[7],
        year: values[8],
      }));
      setLoader(false);
    });
  };

  const fetchClinicData = async () => {
    await apiAdminConfig
      .get(`room/getAllRoomsOfClinicWithOccupancy`)
      .then((response) => {
        if (response.status === 200) {
          console.log("response", response.data.data);
          setClinicdata((prev) => ({
            ...prev,
            ...response.data.data[0],
          }));
        }
      })
      .catch((error) => console.log("error", error));
  };
  useEffect(() => {
    fetchAPi();
    fetchClinicData();
  }, [0]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Doctors Report</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}></Col>
          </Row>
          <div className="adminContant">
            <Card style={{ marginTop: "1%" }}>
              <Card.Body style={{ minHeight: "300px" }}>
                <Tabs
                  defaultActiveKey="1"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="1" title="No of Signups">
                    <Card border="light" style={{ textAlign: "left" }}>
                      <Card.Title>Number of sign up</Card.Title>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <h4>Doctors</h4>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={4}>
                                    <h2>{doc.week}</h2>
                                    <h6>Weekly</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{doc.month}</h2>
                                    <h6>Monthly</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{doc.year}</h2>
                                    <h6>Yearly</h6>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col md={6}>
                            <h4>Patients</h4>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={4}>
                                    <h2>{pat.week}</h2>
                                    <h6>Weekly</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{pat.month}</h2>
                                    <h6>Monthly</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{pat.year}</h2>
                                    <h6>Yearly</h6>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Tab>
                  <Tab eventKey="appoint" title="No of Appointments">
                    <Card border="2" style={{ textAlign: "left" }}>
                      <Card.Title>Number of Appointments</Card.Title>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={4}>
                                    <h2>{appointments.week}</h2>
                                    <h6>Weekly</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{appointments.month}</h2>
                                    <h6>Monthly</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{appointments.year}</h2>
                                    <h6>Yearly</h6>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Tab>

                  <Tab eventKey="3" title="Clinic Utilization">
                    <Card border="light" style={{ textAlign: "left" }}>
                      <Card.Title>Clinic Utilization(Rooms)</Card.Title>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <h4>Doctors</h4>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Row>
                                  <Col md={4}>
                                    <h2>{clinicdata.totalRoom}</h2>
                                    <h6>Total Rooms</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{clinicdata.occupiedRoomId}</h2>
                                    <h6>Occupied</h6>
                                  </Col>
                                  <Col md={4}>
                                    <h2>{clinicdata.emptyRoom}</h2>
                                    <h6>Vacant</h6>
                                  </Col>
                                </Row>
                                <ProgressBar
                                  variant="success"
                                  now={clinicdata.percent}
                                  label={`${clinicdata.percent}%`}
                                />
                                <Button
                                  variant="success"
                                  style={{
                                    margin: "2%",
                                    // backgroundColor: "#76B757",
                                    color: "#fff",
                                  }}
                                  onClick={() => {
                                    navigate(`/master/reports/cliutil`, {
                                      replace: true,
                                    });
                                  }}
                                >
                                  Availablity of Clinics and Respective Rooms
                                </Button>{" "}
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Tab>

                  <Tab eventKey="4" title="Online Payments">
                    <Card border="light" style={{ textAlign: "left" }}>
                      <Card.Title>Online Payments</Card.Title>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <Card style={{ textAlign: "center" }}>
                              <Card.Body>
                                <Button
                                  variant="success"
                                  style={{
                                    margin: "2%",
                                    backgroundColor: "#76B757",
                                    color: "#fff",
                                  }}
                                  onClick={() => {
                                    navigate(`/master/reports/online_pay`, {
                                      replace: true,
                                    });
                                  }}
                                >
                                  Online Payments
                                </Button>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </>
  );
};

class Reports extends Component {
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

export default Reports;

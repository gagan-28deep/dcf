import React, { useEffect, Component, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import "../../admin.css";
import img1 from "../../../Assets/images/admin/dashboard_doctor.png";
import img2 from "../../../Assets/images/admin/dashboar_patient.png";
import img3 from "../../../Assets/images/admin/dashboard_clinic.png";
import img4 from "../../../Assets/images/admin/dashbord_appointment.png";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import GoogleApiWrapper from "../../../Components/googlemap/GoogleApiWrapper";
import { Container } from "react-bootstrap";
import { Stack, Box, styled } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { apiAdminConfig } from "../../../utils/api";

const CustomButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#E4F1DD",
  color: "#76B757",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  fontStyle: "normal",
  borderRadius: "4px",
  boxShadow: "none",
  textTransform: "capitalize",
  ":hover": {
    backgroundColor: "#E4F1DD",
    boxShadow: "none",
  },
}));

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "12px",
}));

const Contant = () => {
  const [dashboard, setDashboard] = useState([
    { title: "Doctors", img: img1, count: 0 },
    { title: "Patients", img: img2, count: 0 },
    { title: "Clinics", img: img3, count: 0 },
    { title: "Appointments", img: img4, count: 0 },
  ]);
  const [loader, setLoader] = useState(false);

  const fetchdata = async () => {
    setLoader(true);
    await apiAdminConfig
      .get(`dashboard`)
      .then(async (response) => {
        let apidata = response.data.data;
        if (apidata.doctors && apidata.doctors !== 0) {
          let index = await dashboard.findIndex(
            (x) => x.title.toUpperCase() === "DOCTORS"
          );
          setDashboard((prevState) => [
            ...prevState,
            (dashboard[index]["count"] = apidata.doctors),
          ]);
        }
        if (apidata.clinics && apidata.clinics !== 0) {
          let index = await dashboard.findIndex(
            (x) => x.title.toUpperCase() === "CLINICS"
          );
          setDashboard((prevState) => [
            ...prevState,
            (dashboard[index]["count"] = apidata.clinics),
          ]);
        }
        if (apidata.patients && apidata.patients !== 0) {
          let index = await dashboard.findIndex(
            (x) => x.title.toUpperCase() === "PATIENTS"
          );
          setDashboard((prevState) => [
            ...prevState,
            (dashboard[index]["count"] = apidata.patients),
          ]);
        }
        if (apidata.appointments && apidata.appointments !== 0) {
          let index = await dashboard.findIndex(
            (x) => x.title.toUpperCase() === "APPOINTMENTS"
          );
          setDashboard((prevState) => [
            ...prevState,
            (dashboard[index]["count"] = apidata.appointments),
          ]);
        }
        setLoader(false);
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      {" "}
      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="adminContant">
            <Container fluid>
              <Row>
                {dashboard.map((el, id) => {
                  return el.title ? (
                    <Col lg={3} key={id}>
                      <CustomCard>
                        <CardContent>
                          <Stack direction="horizonal" spacing={2}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "flex-end",
                              }}
                            >
                              <Image
                                roundedCircle
                                thumbnail
                                src={el.img}
                                width="135px"
                                height={"135px"}
                                alt="dashboardImage.png"
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "right",
                                width: "100%",
                              }}
                            >
                              <Box>
                                <h1
                                  style={{ height: "50px", color: "#4D4D51" }}
                                >
                                  {el.count}
                                </h1>
                                <CustomButton size="small" variant="contained">
                                  {el.title}
                                </CustomButton>
                              </Box>
                            </Box>
                          </Stack>
                        </CardContent>
                      </CustomCard>
                    </Col>
                  ) : (
                    <div key={id}></div>
                  );
                })}
              </Row>
              <Card
                style={{ width: "100%", maxHeight: "500px", marginTop: "1rem" }}
              >
                <Box>
                  <GoogleApiWrapper />
                </Box>
              </Card>
            </Container>
          </div>
        </>
      )}
    </>
  );
};

class Dashboard extends Component {
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

export default Dashboard;

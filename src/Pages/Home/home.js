/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Collapse, Container, Fade } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import DocplazaFeatures from "../../Components/Home/Docplaza_features";
import Docplazasteps from "../../Components/Home/DoctorsplazaSteps";
import Docvideos from "../../Components/Home/Docvideos";
import downloadappbanner from "../../Assets/images/DownloadPlaystore.png";
import Topbanner from "../../Assets/images/Top.png";
import SpecializationSection from "../../Components/Home/Speciality";
import ClinicConsultation from "../../Components/Home/ClinicConsultation";
import AppointmentForm from "../../Components/Home/AppointmentForm";
import Searchbar from "../../Components/Home/SearchBar";
import "./home.css";
import BookAppointment from "../../Components/Home/bookappointment";
import Experience from "../../Components/Home/experience";
import Banner from "../../Components/Home/Banner";
import DoctorApp from "../../Components/Home/DoctorApp";
import TopBanner from "../../Components/Home/topBanner";
import { Box, Typography } from "@mui/material";
import banner from "../../Assets/images/home page/top-banner.png";
import theme from "../../Components/theme";

const Home = () => {
  const [height, setHeight] = useState(200);
  const [toggle, settoggle] = useState(false);
  const openNav = () => {
    settoggle(!toggle);
  };

  const handleOpen = () => {

  }

  return (
    <>
      <div className="homecontainer">
        {/* Top banner image  */}
        <Box sx={{
          background: '#f9fcf6',
          // backgroundImage: `url(${banner})`,
          // backgroundRepeat: 'no-repeat',
          // width: '100%',
          // backgroundPosition: 'right',
          // backgroundSize: 'cover',
          py: 4,
          // [theme.breakpoints.down('md')]: {
          //   backgroundImage: `url()`,
          //   backgroundRepeat: 'no-repeat',
          //   width: '100%',
          //   backgroundPosition: 'right',
          //   backgroundSize: 'cover',
          // }
        }}>
          <Container fluid className='containerSpace'>
            <Box sx={{ width: { md: '70%', sm: '100%' } }}>
              <Searchbar variant={"outline-secondary"} onClick={handleOpen} />
            </Box>
          </Container>
          <Box sx={{ mt: 4 }}>
            <TopBanner />
            {/* <img
            style={{ maxWidth: "100%", height: "auto" }}
            src={Topbanner}
            alt="doctorsplazabanner.png"
          /> */}
          </Box>
        </Box>

        {/* <div id='bookappointment'></div> */}
        <div id='bookappointment'>
          <Card
            border="light"
            ttyle={{ border: "none" }}
            className="homespecialist"
          >
            <Card.Header style={{ backgroundColor: "#E3F0DC" }}>
              {" "}
              <Card.Title
                style={{
                  marginTop: "0px",
                  marginBottom: "0px",
                  height: "100%",
                }}
                className='cardTitles'
              >
                Book Your Appointment with Shortest Wait Time
              </Card.Title>
            </Card.Header>
            <Card.Body style={{ textAlign: "left" }}>
              <AppointmentForm sm={12} xs={12} md={6} lg={3} />
            </Card.Body>
          </Card>
        </div>

        <Container className="homedata" fluid>
          {/* Banner */}
          {/* Doctors Plaza Fetures */}
          <Card className="normalCard">
            <Card.Body>
              <Card.Title
                style={{
                  marginBottom: "40px",
                  height: "100%",
                }}
                className='cardTitles'
              >
                Our Top Searched Specialities
              </Card.Title>
              <div style={{}}>
                {/* <Collapse in={toggle}> */}
                <SpecializationSection toggle={toggle} />
                {/* </Collapse> */}
              </div>
            </Card.Body>
          </Card>
          <Card
            border="light"
            style={{ border: "none" }}
            className="normalCard"
          >
            <Card.Title
              style={{
                marginBottom: "0px",
                height: "100%",
              }}
              className='cardTitles'
            >
              We set the bar higher
            </Card.Title>
            {/* <Card.Body> */}
            <DocplazaFeatures />
            {/* </Card.Body> */}

          </Card>

          {/* Speciality section */}


          {/* Book Appointment */}
          <Card
            border="light"
            style={{ border: "none" }}
            className="homefeture"
            id='#nm'
          >
            <Card.Title
              style={{
                fontSize: "24px",
                textAlign: "left",
                marginLeft: "0%",
                height: "100%",
              }}
            >
              Book an appointment for an in-clinic consultation
            </Card.Title>
            <Card.Text
              style={{
                textAlign: "left",
                marginLeft: "0%",
                fontSize: "0.75rem",
                color: "#C1C7CA",
              }}
            >
              Are you trying to find the closest medical facility? yet unable to identify the very best? Here is
              the answer! <br /> You can connect with 50+ professionals through Doctors Plaza to receive the best
              in-clinic care. Find multiple<br /> specialists under one roof.
            </Card.Text>
            {/* <Card.Body> */}
            <BookAppointment />
            {/* </Card.Body> */}
          </Card>
          <Card
            border="light"
            ttyle={{ border: "none" }}
            className="homefeture"
          >
            <Typography
              component="p"
              sx={{
                fontSize: "24px",
                textAlign: "left",
                marginLeft: "1%",
                height: { md: "25px", sm: 'auto', xs: 'auto' },
              }}
            >
              The knowledge of our Superb Doctors!
            </Typography>
            <Card.Text
              style={{
                textAlign: "left",
                marginLeft: "1%",
                fontSize: "0.75rem",
                color: "#C1C7CA",
              }}
            >
              Our doctors have imparted their knowledge.
            </Card.Text>
            <Card.Body>
              <Docvideos />
            </Card.Body>
          </Card>

          {/* Experience */}
          {/* <Card border="light" style={{ border: 'none' }} className="homefeture">
            <Card.Title
              style={{ textAlign: "left", marginLeft: "1%", height: "25px" }}
            >
              Experience online doctor consultations
            </Card.Title>
            <Card.Text
              style={{
                textAlign: "left",
                marginLeft: "1%",
                fontSize: "0.75rem",
                color: "#C1C7CA",
              }}
            >
              Find experienced doctors across all specialties
            </Card.Text>
            <Card.Body>
              <Experience />
            </Card.Body>
          </Card> */}

          {/* How to get start */}
          <Card
            border="light"
            style={{ border: "none" }}
            className="homefeture"
          >
            <Card.Title
              style={{
                fontSize: "24px",
                textAlign: "left",
                marginLeft: "1%",
                height: "25px",
              }}
            >
              How Do You Begin?
            </Card.Title>
            <Card.Text
              style={{
                textAlign: "left",
                marginLeft: "1%",
                fontSize: "0.75rem",
                color: "#C1C7CA",
              }}
            >
              A newcomer to Doctors Plaza? To make an appointment, follow these steps:
            </Card.Text>
            <Card.Body>
              <Docplazasteps />
            </Card.Body>
          </Card>
        </Container>
      </div>

      <div className="">
        <DoctorApp />
      </div>
    </>
  );
};
export default Home;

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Navbar, Offcanvas, Card } from "react-bootstrap";
import img1 from "../../Assets/images/home page/green-logo.png";
import img2 from "../../Assets/images/home page/header-logo.png";
import img3 from "../../Assets/images/home page/canvas-header.png";
import React from "react";
import FrontSignin from "../auth/signin";
import FrontSignup from "../auth/signup";
import "./navigation.css";
import { NavLink, useLocation } from "react-router-dom";
import { useUserAuth } from "../../provider/auth/UserAuthContext";
import { useEffect } from "react";
import { Box, Button, ThemeProvider, Toolbar, Typography } from "@mui/material";
import theme from "../theme";
import headerLogo from "../../Assets/images/drplazanew.png";
import CloseIcon from "@mui/icons-material/Close";
import headerlogo from "../../Assets/images/drplazanew.png";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import EmailIcon from "@mui/icons-material/Email";

function NavigationBar() {
  const [openForm, setOpenForm] = React.useState(true);
  const location = useLocation();
  const { logout, user, signinOpen, setSigninOpen, setTabChange, TabChange } =
    useUserAuth();
  const [show, setShow] = React.useState(false);
  const [navbarShow, setNavbarShow] = React.useState(false);

  console.log("signinOpen", signinOpen);

  const handleClose = () => {
    setShow(false);
    setOpenForm(true);
    setSigninOpen(!signinOpen);
    setTabChange(false);
  };
  const handleShow = () => {
    setShow(true);
    setOpenForm(true);
    handleNavbarClose();
  };

  const handleNavbarClose = () => {
    setNavbarShow(false);
  };
  const handleNavbarShow = () => {
    setNavbarShow(true);
  };

  const handleShowform = () => {
    setOpenForm(!openForm);
  };

  useEffect(() => {
    if (signinOpen) {
      handleShowform();
      handleShow();
    }
  }, [signinOpen]);

  const handleLogout = () => {
    logout();
    handleNavbarClose();
  };
  const isActiveNav = {
    borderBottom: "2px solid #414146",
    color: "#414146",
    textDecoration: "none",
    paddingBottom: "10px",
  };
  const notActiveNav = {
    color: "#414146",
    textDecoration: "none",
  };
  console.log("user?.tokenHHH", user);
  return (
    <ThemeProvider theme={theme}>
      <Navbar
        style={{ backgroundColor: "#fff", display: "block", paddingTop: "0px" }}
        expand="lg"
        sticky="top"
        // bg="light"
      >
        <Box>
          <Toolbar
            sx={{
              justifyContent: "space-between",
              height: "auto",
              borderBottom: "1px solid #ececec",
              minHeight: "50px !important",
              paddingTop: "10px",
              paddingBottom: "10px",
              background: "#76B757",
              mb: 1,
            }}
          >
            <Typography
              sx={{
                color: "#ffffff",
                fontSize: { md: "16px", sm: "12px", xs: "12px" },
              }}
            >
              <EmailIcon fontSize="small" /> Info@doctorsplaza.in
            </Typography>
            <Nav.Link
              href="tel:+918929280230"
              style={{ textDecoration: "none" }}
            >
              <Typography
                sx={{
                  color: "#ffffff",
                  fontSize: { md: "16px", sm: "12px", xs: "12px" },
                }}
              >
                <PhoneInTalkIcon fontSize="small" /> +91 8929280230
              </Typography>
            </Nav.Link>
          </Toolbar>
        </Box>
        <Container fluid>
          <Navbar.Brand>
            <NavLink to="/">
              <img
                src={headerlogo}
                className="d-inline-block align-top"
                alt="Doctorsplaza logo"
                width="150"
                height="40"
              />
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={handleNavbarShow}
            aria-controls={`offcanvasNavbar-expand-${"sm"}`}
          />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${"sm"}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${"sm"}`}
            placement="end"
            show={navbarShow}
            onHide={handleNavbarClose}
          >
            <Offcanvas.Header
              style={{
                background: "transparent",
                borderBottom: "1px solid #969ba1",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "nowrap",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <NavLink to="/">
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                      <img
                        src={headerlogo}
                        className="d-inline-block align-top"
                        alt="Doctorsplaza logo"
                        width="150"
                        height="40"
                        onClick={handleNavbarClose}
                      />
                    </Offcanvas.Title>
                  </NavLink>
                  <Nav.Link
                    href="tel:+918929280230"
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      sx={{ color: "#fff", mt: 1 }}
                      variant="contained"
                      color="secondary"
                    >
                      +91 8929280230
                    </Button>
                  </Nav.Link>
                </Box>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"sm"}`}>
                  <CloseIcon
                    sx={{ color: "rgba(0, 0, 0, 0.4)", cursor: "pointer" }}
                    color="inherit"
                    onClick={handleNavbarClose}
                  />
                </Offcanvas.Title>
              </Box>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="me-auto">
                <Nav.Link
                  onClick={handleNavbarClose}
                  style={{ color: "#414146" }}
                >
                  <NavLink
                    to="/find-doctor"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    Our Doctors
                  </NavLink>
                </Nav.Link>
                <Nav.Link
                  onClick={handleNavbarClose}
                  style={{ color: "#414146" }}
                >
                  <NavLink
                    to="/video-consult"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    Online Consult
                  </NavLink>
                </Nav.Link>

                <Nav.Link onClick={handleNavbarClose}>
                  <NavLink
                    to="/physiotherapy"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    Physiotherapy
                  </NavLink>
                </Nav.Link>

                <Nav.Link onClick={handleNavbarClose}>
                  <NavLink
                    to="/surgeries"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    Surgeries
                  </NavLink>
                </Nav.Link>

                <Nav.Link onClick={handleNavbarClose}>
                  <NavLink
                    to="/home-care"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    Home Care
                  </NavLink>
                </Nav.Link>
                <Nav.Link onClick={handleNavbarClose}>
                  <NavLink
                    to="/blood-test"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    Blood Test
                  </NavLink>
                </Nav.Link>
              </Nav>
              <Nav>
                {/* <Nav.Link onClick={handleNavbarClose} href="https://doctonet.in/" target={"_blank"} style={{ color: "#414146" }}>
                  For Doctors
                </Nav.Link> */}
                <Nav.Link
                  onClick={handleNavbarClose}
                  style={{ color: "#414146" }}
                >
                  <NavLink
                    to="/doctorsQuery"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    For Doctors
                  </NavLink>
                </Nav.Link>
                <Nav.Link
                  onClick={handleNavbarClose}
                  style={{ color: "#414146" }}
                >
                  <NavLink
                    to="/corporate"
                    style={({ isActive }) =>
                      isActive ? isActiveNav : notActiveNav
                    }
                  >
                    For Corporate
                  </NavLink>
                </Nav.Link>
                <Nav.Link
                  onClick={() =>
                    user && user?.token ? handleLogout() : handleShow()
                  }
                  disabled={false}
                >
                  <Button
                    sx={{ borderRadius: "22px" }}
                    variant="outlined"
                    color="secondary"
                  >
                    <span>
                      {user && user?.token ? "Logout" : "Login / Signup"}
                    </span>
                  </Button>
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          {/* <Navbar.Brand to="#" style={{ color: "#414146", height: '100%', width: '100%',    textDecoration: 'none', cursor: 'pointer' }}> */}

          {/* </Navbar.Brand> */}
        </Container>
      </Navbar>
      <Offcanvas placement={"end"} show={show} onHide={handleClose}>
        <Offcanvas.Header
          onClick={handleClose}
          className="p-2"
          style={{ border: "none" }}
        >
          <Offcanvas.Title style={{ textAlign: "end", width: "100%" }}>
            <CloseIcon
              sx={{ color: "rgba(0, 0, 0, 0.4)", cursor: "pointer" }}
              color="inherit"
              onClick={handleNavbarClose}
            />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Header className="p-0" style={{ border: "none" }}>
          <Offcanvas.Title>
            <Card
              className="py-2"
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "transparent",
                width: "400px",
                borderRadius: 0,
                borderTop: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
            >
              <Container>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    width: "360px",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ marginLeft: 10 }}>
                    <img
                      src={headerlogo}
                      className="d-inline-block align-top"
                      alt="Doctorsplaza logo"
                      width="170"
                      height="60"
                    />
                  </div>
                  <div>
                    <img src={img3} alt="" />
                  </div>
                </div>
              </Container>
            </Card>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {openForm ? (
            <FrontSignin
              TabChange={TabChange}
              setOtpForm={setShow}
              openForm={openForm}
              onClick={() => handleShowform()}
            />
          ) : (
            <FrontSignup
              setOtpForm={setShow}
              openForm={openForm}
              onClick={() => handleShowform()}
            />
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </ThemeProvider>
  );
}

export default NavigationBar;

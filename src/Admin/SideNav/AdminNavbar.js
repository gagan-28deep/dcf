import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import docImage from "../../Assets/images/admin/81.png";
import "./Sidenav.css";
import { Badge, Box, IconButton } from "@mui/material";
import Form from "react-bootstrap/Form";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { replace } from "formik";
import { useSnackbar } from "../../provider/snackbar";
import { apiAdminConfig } from "../../utils/api";

function AdminNavbar(props) {
  let snackbar = useSnackbar();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    type: "",
  });
  useEffect(() => {
    setUser((prevState) => ({
      ...prevState,
      name: localStorage.getItem("name"),
      email: localStorage.getItem("email"),
      type: localStorage.getItem("user_type"),
    }));
  }, []);

  const handlesignOut = () => {
    localStorage.clear();
    snackbar({
      message: "Sign out successfully.",
      severity: "success",
    });
    setTimeout(() => {
      window.location.pathname === "/master/dashboard"
        ? window.location.reload()
        : navigate(`/master/dashboard`, { replace: true });
    }, 1000);
  };

  const fetchdata = async () => {
    await apiAdminConfig
      .get(`notificationsmanagment/getall`)
      .then((response) => {
        let apidata = response.data.data;
        setPosts(apidata);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  useEffect(() => {
    fetchdata();
  }, [navigate])

  return (
    <>
      <Navbar expand="lg" variant="light" className="">
        <Container fluid>
          <Navbar.Brand className="justify-content-center w-25" href="/master/dashboard">
            <div>
              <img
                // src="https://www.doctorsplaza.in/assets/img/drplazanew.png"
                src="/static/media/drplazanew.4676b1446028ae3ba8d8.png"
                width="150"
                height="40"
                className="d-inline-block align-top"
                alt="Doctorsplaza logo"
              />
            </div>
          </Navbar.Brand>{" "}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <IconButton
              sx={{
                height: "100%",
                marginRight: 2
              }}
            >
              <Badge onClick={() => navigate('/master/notificationmanagement')} color="primary" badgeContent={posts.length}>
                <NotificationsIcon color="action" />
              </Badge>
            </IconButton>
            <Card style={{ width: "23rem", marginRight: "1%" }}>
              <Card.Body>
                <Row>
                  <Col md={2}>
                    <Image src={docImage} roundedCircle />
                  </Col>
                  <Col lg={10} style={{ textAlign: "left" }}>
                    <Card.Text style={{ fontSize: "15px" }}>
                      {user.name} <br />
                      {user.email}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Form.Select
              style={{ width: "12%" }}
              aria-label="Default select example"
              onChange={(e) => {
                console.log(e.target.value);
                switch (e.target.value) {
                  case "1":
                    break;
                  case "2":
                    handlesignOut();
                    break;
                  default:
                    break;
                }
              }}
            >
              <option value="0">
                {user.type === "admin" ? "Admin" : "Sub Admin"}
              </option>
              <option value="1">Settings</option>
              <option value="2">Sign Out</option>
            </Form.Select>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default AdminNavbar;

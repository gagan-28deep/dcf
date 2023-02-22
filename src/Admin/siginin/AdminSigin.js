import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import bannerimage from "../../Assets/images/admin/medicine_illustration.png";
import Logo from "../../Assets/images/logo.jpeg";
import { useNavigate } from "react-router-dom";
import "./adminsignin.css";
import { apiAdminConfig } from "../../utils/api";
import { useSnackbar } from "../../provider/snackbar";

const theme = createTheme();

function Login() {
  let navigate = useNavigate();
  const snackbar = useSnackbar();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let api = {};
    if (data.get("email") === "doctorsplaza.pb@gmail.com") {
      api.path = "adminlogin";
      api.body = { email: data.get("email"), pass: data.get("password") };
    } else {
      api.path = "master/loginstaff";
      api.body = { email: data.get("email"), password: data.get("password") };
    }

    await apiAdminConfig
      .post(`${api.path}`, api.body)
      .then((response) => {
        if (response) {
          let userdata = response.data.data;
          if (response.status === 200) {
            localStorage.setItem("_id", userdata._id);
            localStorage.setItem(
              "name",
              userdata.staff_id ? userdata.user_name : userdata.fullName
            );
            localStorage.setItem("email", userdata?.email);
            localStorage.setItem("auth_token", userdata?.auth_token);
            localStorage.setItem("employee_id", userdata?.employee_id);
            localStorage.setItem("roles", userdata?.roles);
            localStorage.setItem("staff_id", userdata?.staff_id);
            localStorage.setItem(
              "user_type",
              userdata.staff_id ? "subadmin" : "admin"
            );
            snackbar({
              message: "Login Successfully.",
              severity: "success",
            });
            setTimeout(() => {
              navigate("../master/dashboard", { replace: true });
            }, 1000);
          } else {
            snackbar({
              title: "Error",
              message: `${response.message}`,
              severity: "error",
            });
          }
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid container spacing={2}>
          <CssBaseline />
          <Grid
            item
            xs={0}
            sm={12}
            md={7}
            display={{ xs: "none", sm: "block" }}
          >
            <Box
              sx={{
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                // position: "relative",
                display: "flex",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
              }}
            >
              <img
                src={bannerimage}
                className="adminloginbanner"
                alt="medicine_illustration.png"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            sx={{
              borderRadius: "50px 0px 0px 50px",
            }}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                display: "flex",
                // flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "left",
              }}
            >
              <Box
                sx={{
                  justifyContent: "left",
                }}
              >
                <Box
                  sx={{
                    justifyContent: "left",
                    alignItems: "center",
                    display: "flex",
                    marginBottom: "30px",
                  }}
                >
                  <img
                    src={Logo}
                    width="180"
                    height="60"
                    // className="d-inline-block align-left"
                    alt="Doctorsplaza logo"
                  />
                </Box>
                <Typography
                  style={{ margin: "20px 10px", fontWeight: 600 }}
                  component="h2"
                  variant="h5"
                  align="left"
                >
                  Login
                </Typography>
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{ mt: 1 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    color="success"
                  />
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    color="success"
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <Link underline="none" style={{ color: "#000000" }} href="#">
                    <Typography sx={{ textAlign: "right" }} variant="body2">
                      Forgot password?
                    </Typography>
                  </Link>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: "#76B757", borderRadius: "8px" }}
                    sx={{ mt: 3, mb: 2, bordeRadius: "8px" }}
                  >
                    Log In
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  );
}

export default function AdminSignin() {
  return (
    // <div className="adminpageloginpage">
    //   <Card border="light" className="logindiv">
    //     <Card.Body className="logincardbody">
    <Login />
    //     </Card.Body>
    //   </Card>
    // </div>
  );
}

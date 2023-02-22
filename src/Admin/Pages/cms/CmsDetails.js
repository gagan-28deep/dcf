import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import http from "../../../Config/HTTP_request";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import "../../admin.css";
import { Link } from "react-router-dom";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import moment from "moment";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const TableDetail = (props) => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell>{row.meta_data}</TableCell>
        <TableCell>{row.metaTitle}</TableCell>
        <TableCell>{row.metaKeys}</TableCell>
        <TableCell>
          {moment(row.createdAt).format("MMM DD,YYYY, HH:mm:ss A")}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Descriptions
              </Typography>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                      >
                        Description
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                      >
                        Short Description
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                      >
                        Meta Description
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableCell component="th" scope="row">
                      {row.description}
                    </TableCell>
                    <TableCell>{row.short_description}</TableCell>
                    <TableCell>{row.metaDesc}</TableCell>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const Contant = () => {
  // let navigate = useNavigate();
  const theme = createTheme();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [post, setPost] = useState({});
  const fetchdata = async (value) => {
    setLoader(true);
    const api = {
      path: `cmsView/${value}`,
      method: "GET",
    };
    let response = await http(api);
    console.log("response", response);
    if (response.response) {
      if (response.response.data.status === 400) {
        setLoader(false);
      }
    } else {
      if (response.status === 200) {
        console.log("response", response.data);
        setPost((prevState) => ({
          ...prevState,
          ...response.data.data[0],
        }));
      }
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchdata(id);
  }, [id]);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>CMS Details</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Link to={`/master/cms/`} style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="success">
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
          <div className="adminContant">
            <ThemeProvider theme={theme}>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                        component="th"
                        scope="row"
                      >
                        Title
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                        align="left"
                      >
                        Meta Data
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                        align="left"
                      >
                        Meta Title
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                        align="left"
                      >
                        Meta Keywords
                      </TableCell>
                      <TableCell
                        sx={{ fontWeight: 600, fontFamily: "system-ui" }}
                        align="left"
                      >
                        Created On
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableDetail row={post} />
                  </TableBody>
                </Table>
              </TableContainer>
            </ThemeProvider>
          </div>
        </>
      )}
    </>
  );
};

class CmsDetails extends Component {
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

export default CmsDetails;

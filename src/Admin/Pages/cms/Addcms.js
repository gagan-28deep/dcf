import React, { useEffect, Component, useState } from "react";
import Button from "@mui/material/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import http from "../../../Config/HTTP_request";
import "../../admin.css";
import { Link } from "react-router-dom";
import Sidebar from "../../SideNav/sideBar";
import Loader from "../../../Components/Loader/Loader";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import QuillComponent from "../../../Components/reactquill/QuillComponent";

const Contant = () => {
  let navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [postdata, setPostdata] = useState({
    title: "",
    content: "",
    description: "",
    meta_data: "",
    metaDesc: "",
    metaKeys: "",
    metaTitle: "",
    short_description: "",
  });
  const [loader, setLoader] = useState(false);
  const [selected, setSelected] = useState([]);
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
  const [error, setError] = useState({
    userName: "",
    employeeId: "",
    email: "",
    password: "",
  });

  const fetchdata = async (value) => {
    setLoader(true);
    const api = {
      path: "cmsCreate",
      method: "POST",
      body: { ...value },
    };

    let response = await http(api);
    console.log("response", response);
    if (response.response) {
      if (response.response.data.status === 400) {
        setError(true);
        setError((prevState) => ({
          ...prevState,
        }));
        setLoader(false);
      }
    } else {
      if (response.status === 200) {
        datanull();
        setLoader(false);
      }
    }
  };

  const datanull = () => {
    setPostdata({
      title: "",
      content: "",
      description: "",
      meta_data: "",
      metaDesc: "",
      metaKeys: "",
      metaTitle: "",
      short_description: "",
    });
    setSelected([]);
  };

  const handleChange = (e) => {
    setPostdata({ ...postdata, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, []);
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <Row className="mt-4">
            <Col md={6} style={{ textAlign: "left" }}>
              <h3 style={{ height: "40px" }}>Add CMS</h3>
            </Col>
            <Col md={4}></Col>
            <Col md={2} style={{ textAlign: "left" }}>
              <Link to={`/master/cms`} style={{ textDecoration: "none" }}>
                <Button variant="outlined" color="success">
                  Back
                </Button>
              </Link>
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
                        controlId="title"
                      >
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.title}
                          name="title"
                          onChange={handleChange}
                          placeholder="Enter Title"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="short_description"
                      >
                        <Form.Label>Short Description</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.short_description}
                          name="short_description"
                          onChange={handleChange}
                          placeholder="Enter Short Description"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="description"
                      >
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.description}
                          name="description"
                          onChange={handleChange}
                          placeholder="Enter Description"
                          className="mb-3"
                          isInvalid={error.email}
                        />
                        <Form.Control.Feedback type="invalid">
                          {error.email}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="meta_data"
                      >
                        <Form.Label>Meta Data</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.meta_data}
                          name="meta_data"
                          onChange={handleChange}
                          //   placeholder="Enter password"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="metaTitle"
                      >
                        <Form.Label>Meta Title</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.metaTitle}
                          name="metaTitle"
                          onChange={handleChange}
                          //   placeholder="Enter password"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="metaDesc"
                      >
                        <Form.Label>Meta Description</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.metaDesc}
                          name="metaDesc"
                          onChange={handleChange}
                          //   placeholder="Enter metaDesc"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="metaKeys"
                      >
                        <Form.Label>Meta Keywords</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          value={postdata.metaKeys}
                          name="metaKeys"
                          onChange={handleChange}
                          as="textarea"
                          rows={3}
                          placeholder="Enter Keywords"
                          className="mb-3"
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} md={12} lg={12}>
                      <Form.Group
                        style={{ textAlign: "left" }}
                        controlId="content"
                      >
                        <Form.Label>Content</Form.Label>
                        <QuillComponent
                          change={(val) => {
                            setPostdata((prevState) => ({
                              ...prevState,
                              content: val,
                            }));
                          }}
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
                      Submit
                    </Button>{" "}
                    <Button
                      style={{
                        borderColor: "#76B757",
                        color: "#76B757",
                      }}
                      variant="outlined"
                      className="rounded"
                      onClick={datanull}
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

class Addcms extends Component {
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

export default Addcms;

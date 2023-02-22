import React, { useEffect, useState } from 'react';
import Button from "@mui/material/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import moment from 'moment';
import DateSelect from "../../Components/Datepicker/Dateselect";
import { useSnackbar } from "../../provider/snackbar";

export default function DateSelectModal(props) {
  const snackbar = useSnackbar();
  const [show, setShow] = useState(false);
  const handleClose = () => { setShow(false); setStartTime(""); setEndTime(""); setTitle("") };
  const handleShow = () => setShow(true);
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  useEffect(() => {
    if (props && props.value.open === true) {
      handleShow();
    } else {
      handleClose();
    }
  }, [props]);


  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Select Time Interval</Modal.Title>
        </Modal.Header>
        <Modal.Body>Select Start Time and End Time for which you want to generate invoice.
          <div style={{ width: "100%", margin: "10px auto" }}>
            <Row style={{ minHeight: "50px" }}>
              <Col
                lg={12}
                md={12}
                sm={12}
                xs={12}
                style={{ marginTop: 10, marginBottom: 10 }}
              >
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Title :</Form.Label>
                    <Form.Control type="text" onChange={(e) => {
                      setTitle(e.target.value);
                    }} placeholder="Enter" />
                  </Form.Group>
                </Form>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                xs={12}
                style={{ marginTop: 10, marginBottom: 10 }}
                className={"adminContent-1"}
              >
                <DateSelect
                  place="Start Date"
                  select={(value) => {
                    setStartTime(moment(value).format("YYYY-MM-DD"));
                  }}
                />
              </Col>
              <Col
                lg={6}
                md={6}
                sm={6}
                xs={12}
                style={{ marginTop: 10, marginBottom: 10 }}
                className={"adminContent-1"}
              >
                <DateSelect
                  place="End Date"
                  select={(value) => {
                    setEndTime(moment(value).format("YYYY-MM-DD"));
                  }}
                />
              </Col>
            </Row>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            style={{ backgroundColor: "#76B757" }}
            onClick={() => {
              if (startTime === "" || endTime === "") {
                snackbar({
                  message: "Start Date or End Date Can't be empty!",
                  severity: "error",
                });
              } else if (title === "") {
                snackbar({
                  message: "Title Can't be empty!",
                  severity: "error",
                });
              }
              else {
                props.handleSubmit({ status: true, id: props.value.id, start_time: startTime, end_time: endTime, title: title });
                handleClose()
              }
            }}>
            Submit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Modal from "react-bootstrap/Modal";

export default function ModalCustom(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
          <Modal.Title>{props.value.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.value.message}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="contained"
            style={{ backgroundColor: "#76B757" }}
            onClick={() => {
              props.handelDelete({ status: true, id: props.value.id, type: props.value.type });
              
            }}
          >
            {props.value.type && props.value.type.toUpperCase() === "DELETE"
              ? "Delete"
              : props.value.type}
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            {props.value.type && props.value.type.toUpperCase() === "DELETE"
              ? "cancel"
              : "close"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

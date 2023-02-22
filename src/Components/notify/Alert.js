import React, { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";

function CustomAlert(props) {
  console.log("CustomAlert ", props);
  const [data, setData] = useState({
    status: "",
    message: "",
  });
  useEffect(() => {
    if (props) {
      setData((prevState) => ({
        ...prevState,
        status: props.value.status,
        message: props.value.message,
      }));
    }
  }, [props]);
  return (
    <>
      <Alert variant={data.status}>{data.message}</Alert>{" "}
    </>
  );
}

export default CustomAlert;

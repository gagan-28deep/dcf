import React, { useState } from "react";
import "./docPagetest.css";
import { Nav } from "react-bootstrap";
import Image from "./WhatsApp Image 2023-02-22 at 3.20.20 PM.jpeg";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";
const BloodHeader = () => {
  const [docName, setDocName] = useState("");
  const [docLocation, setDocLocation] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [show, setShow] = useState(false);

  const snakBar = useSnackbar();
  const handleSubmit = async () => {
    let subButton = document.querySelector(".submit-btn");
    // subButton.style.display = "none";
    try {
      let values = {
        name: docName,
        location: docLocation,
        number: docNumber,
      };
      let res = await apiAdminConfig.post("createbloodtest", values);
      if (res.status === 200) {
        // console.log("Values are ", values);
        snakBar({
          title: "Success",
          message: res?.data?.msg,
          severity: "success",
        });
        let docDetailsForm = document.querySelectorAll(".doc-details");
        docDetailsForm[0].value = "";
        docDetailsForm[1].value = "";
        docDetailsForm[2].value = "";
        setShow(true);
        // console.log("Data Registered", res);
      } else {
        if (res.status === 400) {
          snakBar({
            title: "Error",
            message: res?.data?.msg,
            severity: "error",
          });
        }
        if (res.status === 500) {
          snakBar({
            title: "Error",
            message: res?.data?.msg,
            severity: "error",
          });
        }
      }
    } catch (err) {
      if (err) {
        console.log("error is ", err);
        let values = {
          name: docName,
          location: docLocation,
          number: docNumber,
        };
        // let docDetailsForm = document.querySelectorAll(".doc-details");
        // docDetailsForm.value = "";
        // let subButton = document.querySelector(".submit-btn");
        // subButton.style.display = "inline-block";
      }
      // if (err.message == "Request failed with status code 400") {
      //   alert("Please Fill all the fields");
      // }
      // if (err.message == "Request failed with status code 409") {
      //   alert("User already Exists");
      // }
      // if (err.message == "Request failed with status code 404") {
      //   alert("Not Found");
      // }
      // if (err.message === "Request failed with status code 500") {
      //   alert("Internal Server Error");
      // }

      console.log("error while registering doc", err);
    }

    // console.log("Hello from doc panel");
  };
  return (
    <div>
      <div className="test-wrapper">
        <img className="test-doctor" src={Image} alt="test" />
        <div className="test-header">
          A Hassle Free Option{" "}
          <p style={{ position: "relative", right: "7rem" }}>To Practice</p>
        </div>
        <div className="test-desc">
          {" "}
          We Provide Fully Furnished, Air Conditioned{" "}
          <p style={{ position: "relative", right: "2rem" }}>
            & Serviced Clinic for Doctors at Very{" "}
            <p style={{ position: "relative", right: "7rem" }}>
              Economical Price
            </p>
          </p>
        </div>
        <Nav.Link href="tel:+918929280230">
          <button className="btn-class">Call Now</button>
        </Nav.Link>
        {/* <button className="btn-class">Call Now</button> */}
        <div className="num">+91 8929280230</div>
        {/* <form className="doctor-form">Book Your Test Today</form> */}
        <input
          className="doc-details"
          type="text"
          placeholder="Name"
          value={docName}
          onChange={(e) => {
            setDocName(e.target.value);
          }}
        />
        <input
          className="doc-details"
          type="text"
          placeholder="Street Address"
          value={docLocation}
          onChange={(e) => {
            setDocLocation(e.target.value);
          }}
        />
        <input
          className="doc-details"
          type="number"
          placeholder="Number"
          value={docNumber}
          onChange={(e) => {
            setDocNumber(e.target.value);
          }}
        />
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default BloodHeader;

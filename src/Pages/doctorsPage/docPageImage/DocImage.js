import React, { useState } from "react";
import "./docPageImage.css";
import { Nav } from "react-bootstrap";
import Image from "../WhatsApp Image 2023-01-27 at 12.23.11 PM.jpeg";
import { apiAdminConfig } from "../../../utils/api";
import { useSnackbar } from "../../../provider/snackbar";

const DocImage = () => {
  const [docName, setDocName] = useState("");
  const [docLocation, setDocLocation] = useState("");
  const [docNumber, setDocNumber] = useState("");
  const [docSpeciality, setDocSpeciality] = useState("");

  const snakbar = useSnackbar();
  const [show, setShow] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let subButton = document.querySelector(".submit-btn");
    // subButton.style.display = "none";
    try {
      // if (!docName || !docLocation || !docNumber || !docSpeciality) {
      //   // alert("Please fill all  the fields");
      //   snakbar({
      //     title: "Error",
      //     // message: err?.msg,
      //     severity: "error",
      //   });
      // }
      let values = {
        name: docName,
        location: docLocation,
        contactNumber: docNumber,
        specialization: docSpeciality,
      };
      let res = await apiAdminConfig.post("createdoctorquery", values);
      // console.log("res", res);
      if (res.status === 200) {
        // console.log("Values are ", values);
        snakbar({
          title: "Success",
          message: res?.data?.msg,
          severity: "success",
        });
        let docDetailsForm = document.querySelectorAll(".doc-details");
        // console.log("Form data -> ", docDetailsForm);
        docDetailsForm[0].value = "";
        docDetailsForm[1].value = "";
        docDetailsForm[2].value = "";
        docDetailsForm[3].value = "";
        // docDetailsForm.forEach((element) => {
        //   docDetailsForm[element].values = "";
        // });
        setShow(true);
        // console.log("Data Registered", res);
      } else {
        if (res.status === 400) {
          snakbar({
            title: "Error",
            message: res?.data?.msg,
            severity: "error",
          });
        }
        if (res.status === 409) {
          snakbar({
            title: "Error",
            message: res?.data?.msg,
            severity: "error",
          });
        }
        if (res.status === 500) {
          snakbar({
            title: "Error",
            message: res?.data?.msg,
            severity: "error",
          });
        }
      }
    } catch (err) {
      console.log("error is ", err);
      snakbar({
        title: "Error",
        message: err?.msg,
        severity: "error",
      });
      // console.log("error while registering doc", err);
      let docDetailsForm = document.querySelectorAll(".doc-details");
      // console.log("Form data -> ", docDetailsForm);
      // let subButton = document.querySelector(".submit-btn");
      // subButton.style.display = "inline-block";
      // // if (err.message === "Request failed with status code 400") {
      //   alert("Please Fill all the fields");
      // }
      // if (err.message === "Request failed with status code 409") {
      //   alert("User already Exists");
      // }
      // if (err.message === "Request failed with status code 404") {
      //   alert("Not Found");
      // }
      // if (err.message === "Request failed with status code 500") {
      //   alert("Internal Server Error");
      // }
    }

    // console.log("Hello from doc panel");
  };
  return (
    <div>
      <div className="image-wrapper">
        <img className="image-doctor" src={Image} alt="Image" />
        <div className="image-header">
          A Hassle Free Option{" "}
          <p style={{ position: "relative", right: "7rem" }}>To Practice</p>
        </div>
        <div className="image-desc">
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
        {/* <form className="doctor-form">Doctor Information</form> */}
        <input
          className="doc-details"
          type="text"
          placeholder="Doctor Name"
          value={docName}
          onChange={(e) => {
            setDocName(e.target.value);
          }}
        />
        <input
          className="doc-details"
          type="text"
          placeholder="Location"
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
        <input
          className="doc-details"
          type="text"
          placeholder="Speciality"
          value={docSpeciality}
          onChange={(e) => {
            setDocSpeciality(e.target.value);
          }}
        />
        <button onClick={handleSubmit} className="submit-btn">
          Submit
        </button>
      </div>
    </div>
  );
};

export default DocImage;

import React from "react";
import "./headerstyle.css";
import Image from "./Blood Collection Board-01.jpg"
import { Card } from "react-bootstrap";
const BloodTestHeader = () => {
  return (
    <div>
      <img
        className="header-image"
        src="https://redcliffelabs.com/myhealth/wp-content/uploads/2022/07/5.-Thyroid-Blood-Tests.jpg"
        // src={Image}
        alt="Image"
      />
      <h2 className="blood-header-title">The Results You Can Trust</h2>
      <div className="header-text">To Book Lab Tests Call +918928280230</div>
      <div className="blood-content-wrapper">
        <div className="blood-content">Accurate Results</div>
        <div className="blood-content">Home Sample Collection</div>
      </div>
      <div className="blood-content-wrapper">
        <div className="blood-content">Accurate Results</div>
        <div className="blood-content">Home Sample Collection</div>
      </div>
      <form action="" className="input-form">
        <input className="input-content" type="text" placeholder="Full Name" />
        <input className="input-content" type="text" placeholder="City" />
        <input
          className="input-content"
          type="number"
          placeholder="Contact Number"
        />
      </form>
      <button className="blood-header-btn">Call Us</button>
    </div>
  );
};

export default BloodTestHeader;

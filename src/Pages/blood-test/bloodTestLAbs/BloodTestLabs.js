import React from "react";
import "./bloodLabs.css";
import CRl from "./CRL.jpeg";
import lifeline from "./lifeline.jpeg";
import oncquest from "./oncquest.jpeg";
import mahajan from "./mahajan.jpeg";
import core from "./core.jpeg";

const BloodTestLabs = () => {
  return (
    <div>
      <div className="labs-wrapper">
        <h2 className="labs-header">Featured Labs</h2>
        <div className="labs">
          <div className="labs-content">
            <img className="labs-image" src={CRl} alt="" />
            <div className="labs-text">CRL DIAGNOSTICS</div>
          </div>
          <div className="labs-content">
            <img className="labs-image" src={lifeline} alt="" />
            <div className="labs-text">LIFELINE</div>
          </div>
          <div className="labs-content">
            <img className="labs-image" src={oncquest} alt="" />
            <div className="labs-text">ONCQUEST LAB</div>
          </div>
        </div>
        <div className="labs">
          <div className="labs-content">
            <img className="labs-image" src={mahajan} alt="" />
            <div className="labs-text" style={{marginRight : "0.5rem"}}>MAHAJAN IMAGING & LABS</div>
          </div>
          <div className="labs-content">
            <img className="labs-image" src={core} alt="" />
            <div className="labs-text">CORE DIAGNOSTICS</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodTestLabs;

import React from 'react'
import { Nav } from "react-bootstrap";
import "./multiImage.css"
const MultiImages = () => {
  return (
    <div>
        <div className="multi-image-wrapper">
        <img
          className="img-wrapper"
          src="https://doctonet.in/wp-content/uploads/2022/09/Doctors-Plaza-Clinic-IMG-6.jpg"
          alt=""
        />
        <img
          className="img-wrapper"
          src="https://doctonet.in/wp-content/uploads/2022/09/Doctors-Plaza-Clinic-IMG-2.jpg"
          alt=""
        />
        <img
          className="img-wrapper"
          src="https://doctonet.in/wp-content/uploads/2022/09/Doctors-Plaza-Clinic-IMG-5.jpg"
          alt=""
        />
      </div>
      <div
        className="multi-image-wrapper"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <img
          className="img-wrapper"
          src="https://doctonet.in/wp-content/uploads/2022/09/Doctors-Plaza-Clinic-IMG-3.jpg"
          alt=""
        />
        <img
          className="img-wrapper"
          src="https://doctonet.in/wp-content/uploads/2022/09/Doctors-Plaza-Clinic-IMG-4.jpg"
          alt=""
        />
        <p className="text-multi-image">
          Our PLUG & PLAY model gives an{" "}
          <p className="text-multi-image">instant start to your own practice</p>
          <p className="text-multi-image">
            without any capital expenditure with
          </p>{" "}
          <p className="text-multi-image">
            the option to EASY and NO COST EXIT
          </p>
          <Nav.Link href="tel:+918929280230">
            <button className="text-btn">Call now</button>
          </Nav.Link>
          <p className='p-text'>+918929280230</p>
        </p>
      </div>
    </div>
  )
}

export default MultiImages
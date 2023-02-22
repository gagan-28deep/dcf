import React from 'react'
import DocPageVideo from './DocPageVideo'
import DoctorSlider from './DoctorSlider'
import "./docFooter.css"
const DoctorFooter = () => {
  return (
    <div>
      <div className="doctors-wrapper">
        <h2 className="doctor-header">Our Partner Doctor</h2>
        <DocPageVideo/>
        {/* <DoctorSlider /> */}
      </div>
    </div>
  )
}

export default DoctorFooter
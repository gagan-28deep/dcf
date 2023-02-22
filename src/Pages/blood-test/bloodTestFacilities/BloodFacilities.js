import React from "react";
import "./bloodFacilities.css";

const BloodFacilities = () => {
  return (
    <div>
      <div className="facility-blood-wrapper">
        <h2 className="facility-blood-header">More Facilities at Doctors Plaza</h2>
        <div className="facilities">
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Furnished.png"
              alt=""
            />
            <div className="facility-blood-text">
              Fully Furnished With Modern Amenities
            </div>
          </div>
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Clean-Dust-Proof.png"
              alt=""
            />
            <div className="facility-blood-text">
              Clean Dust Proof Clinic Flooring
            </div>
          </div>
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Waiting-Lounge.png"
              alt=""
            />
            <div className="facility-blood-text">Comfortable Waiting Launge</div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Cabin-Washbasin.png"
              alt=""
            />
            <div className="facility-blood-text">Washbasin In Clinic</div>
          </div>
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/air-conditioner.png"
              alt=""
            />
            <div className="facility-blood-text">Air Conditioned</div>
          </div>
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/toilet.png"
              alt=""
            />
            <div className="facility-blood-text">Clean Washroom</div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/clipboard.png"
              alt=""
            />
            <div className="facility-blood-text">X - Ray Viewing Light Box</div>
          </div>
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/hospital-bed.png"
              alt=""
            />
            <div className="facility-blood-text">Examination Bed With Curtain</div>
          </div>
          <div className="facility-blood-content">
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/blood-tube.png"
              alt=""
            />
            <div className="facility-blood-text">In House Blood Test Collection</div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility-blood-content" style={{marginBottom : "5rem"}}>
            <img
              className="facility-blood-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/receptionist.png"
              alt=""
            />
            <div className="facility-blood-text">
              Receptionist To Monitor Your Appointments & Fees Collection etc
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodFacilities;

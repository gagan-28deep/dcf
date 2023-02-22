import React from "react";
import "./docImageFacilities.css"

const DocFacilities = () => {
  return (
    <div>
      <div className="facility-wrapper">
        <h2 className="facility-header">Facilities at Doctors Plaza</h2>
        <div className="facilities">
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Furnished.png"
              alt=""
            />
            <div className="facility-text">
              Fully Furnished With Modern Amenities
            </div>
          </div>
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Clean-Dust-Proof.png"
              alt=""
            />
            <div className="facility-text">
              Clean Dust Proof Clinic Flooring
            </div>
          </div>
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Waiting-Lounge.png"
              alt=""
            />
            <div className="facility-text">Comfortable Waiting Launge</div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/Cabin-Washbasin.png"
              alt=""
            />
            <div className="facility-text">Washbasin In Clinic</div>
          </div>
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/air-conditioner.png"
              alt=""
            />
            <div className="facility-text">Air Conditioned</div>
          </div>
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/toilet.png"
              alt=""
            />
            <div className="facility-text">Clean Washroom</div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/clipboard.png"
              alt=""
            />
            <div className="facility-text">X - Ray Viewing Light Box</div>
          </div>
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/hospital-bed.png"
              alt=""
            />
            <div className="facility-text">Examination Bed With Curtain</div>
          </div>
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/blood-tube.png"
              alt=""
            />
            <div className="facility-text">In House Blood Test Collection</div>
          </div>
        </div>
        <div className="facilities">
          <div className="facility-content">
            <img
              className="facility-image"
              src="https://doctonet.in/wp-content/uploads/2022/09/receptionist.png"
              alt=""
            />
            <div className="facility-text">
              Receptionist To Monitor Your Appointments & Fees Collection etc
              ...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocFacilities;

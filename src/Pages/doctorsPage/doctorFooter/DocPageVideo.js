import React from "react";
import YoutubeEmbed from "./YoutubeEmbed";
import "./docVideo.css";

const DocPageVideo = () => {
  return (
    <div>
      <div className="video-wrapper">
        <h2 className="managing-header">
          This is what our{" "}
          <h2 style={{ fontWeight: "bold", fontSize: "2rem" }}>
            Doctors says about us !
          </h2>
        </h2>
        {/* <div className="managing-text">
          Doctors Plaza is a Coworking Medical Space
        </div>
        <div className="managing-text">
          which offers a 'One Stop' for all your medical
        </div>
        <div className="managing-text">
          needs. It is a hub of specialists who are
        </div>
        <div className="managing-text">
          determined to treat you with the best of
        </div>
        <div className="managing-text">their abilities.</div> */}
        <div className="managing-text">
          "Our doctors believe in providing the highest quality of care to each
          and every one of our
          <p>
            patients. With years of training and experience, they are dedicated
            to improving the health{" "}
          </p>
          <p>
            and well-being of our community. Trust us to deliver compassionate,
            expert medical{" "}
          </p>
          <p>treatment and guidance."</p>
        </div>
        <YoutubeEmbed embedId="sfE1B3xvoQ4" />
      </div>
    </div>
  );
};

export default DocPageVideo;

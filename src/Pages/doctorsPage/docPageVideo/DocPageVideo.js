import React from 'react'
import YoutubeEmbed from "./YoutubeEmbed";
import "./docVideo.css"

const DocPageVideo = () => {
  return (
    <div>
        <div className="video-wrapper">
        <h2 className="managing-header">
          Meet With Our <h2 style={{ fontWeight: "bold" , fontSize : "2rem" }}>Managing Dirctor</h2>
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
          Doctors Plaza is a Coworking Medical Space
          <p>which offers a 'One Stop' for all your medical</p>
          <p>needs. It is the hub of specialists who are</p>
          <p>determined to treat you with the best of</p>
          <p>their abilities.</p>
          <p>_________________________________________________</p>
          <p style={{ fontStyle: "italic" }}>Harman Singh Sachdeva</p>
        </div>
        <YoutubeEmbed embedId="R6pRmXsnR5Y" />
      </div>
    </div>
  )
}

export default DocPageVideo
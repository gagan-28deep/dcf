import React from "react";
import Image from "react-bootstrap/Image";
import nodata from "../../Assets/images/Nodata.png";

const Nodata = () => {
  return (
    <>
      <Image width="300" height="300" src={nodata} alt="nodata.png" />
      <p>No data found...</p>
    </>
  );
};

export default Nodata;

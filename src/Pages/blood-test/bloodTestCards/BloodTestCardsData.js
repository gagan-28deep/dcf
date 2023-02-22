import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./bloodTest.css";

// const bloodTest = require("./bloodTestData")
import { bloodTestData } from "./bloodTestData";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const blood = bloodTestData.results;
const blood1 = blood.slice(0, 3);
const blood2 = blood.slice(3, blood.length);

const BloodTestCardsData = () => {
  return (
    <div>
      <h2 className="blood-heading">Our Popular Packages</h2>
      <div className="blood-list">
        {blood1.map((el) => (
          <div className="card blood-card">
            <h5 className="card-title blood-title"> {el.title}</h5>
            <h5 className="card-title blood-tests">* {el.numberOfTests}</h5>
            <h5 className="card-title blood-price">{el.price}</h5>
            <h5 className="card-title blood-discount">{el.discountPrice}</h5>
          </div>
        ))}
      </div>
      <div className="blood-list">
        {blood2.map((el) => (
          <div className="card blood-card">
            <h5 className="card-title blood-title"> {el.title}</h5>
            <h5 className="card-title blood-tests">* {el.numberOfTests}</h5>
            <h5 className="card-title blood-price">{el.price}</h5>
            <h5 className="card-title blood-discount">{el.discountPrice}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BloodTestCardsData;

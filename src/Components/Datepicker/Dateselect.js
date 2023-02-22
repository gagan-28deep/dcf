import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./dateselect.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const DateSelect = (props) => {
  const [startDate, setStartDate] = useState("");
  return (
    <>
      <DatePicker
        className={`selectdate ${props.type === "error" ? "error" : "success"} text-left`}
        placeholderText={
          props.value ? moment(props.value).format("DD/MM/yyyy") : props.place
        }
        selected={props.value === "" ? props.value : startDate}
        dateFormat="dd/MM/yyyy"
        minDate={!props.minDate ? moment().toDate() : ""}
        // excludeDates={[new Date()]}
        maxDate={props.maxDate ? moment().toDate() : ""}
        onChange={(date) => {
          setStartDate(date);
          props.select(date);
        }}
      />
      <p
        style={{
          marginBootm: "0",
          display: `${props.type === "error" ? "block" : "none"}`,
          color: `${props.type === "error" ? "#DC3545" : "#b3b9bc"}`,
        }}
      >
        Date is required
      </p>
    </>
  );
};

export default DateSelect;

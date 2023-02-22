import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "./dateselect.css";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
const Timeselect = (props) => {
  const [date, setDate] = useState("");
  const [placeholder, setPlaceholder] = useState();

  const fetchtime = (time) => {
    let date = new Date(
      "2000",
      "01",
      "01",
      props.value.split(":")[0],
      props.value.split(":")[1]
    );
    setPlaceholder(date);
  };
  useEffect(() => {
    if (props.value) {
      fetchtime(props.value);
    }
  }, [props]);
  return (
    <>
      <DatePicker
        className={`selectdate ${props.type === "error" ? "error" : "success"}`}
        selected={props.value === "" ? props.value : date}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={60}
        timeCaption="Time"
        dateFormat="h:mm aa"
        onChange={(date) => {
          setDate(date);
          props.changetime(date);
        }}
        placeholderText={
          props.value ? moment(placeholder).format("h:mm a") : "00:00"
        }
      />
      <p
        style={{
          marginBootm: "0",
          display: `${props.type === "error" ? "block" : "none"}`,
          color: `${props.type === "error" ? "#DC3545" : "#b3b9bc"}`,
        }}
      >
        Time is required
      </p>
    </>
  );
};

export default Timeselect;

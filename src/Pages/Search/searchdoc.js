import React from "react";
import { Container } from "react-bootstrap";
import "./searchdoc.css";
import Searchbar from "../../Components/Home/SearchBar";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useLocation } from "react-router-dom";
import Consult from "../consult";

const SearchDoc = () => {
  const location = useLocation();
  const value = location?.state?.value;
  const locationData = location?.state?.location
  console.log('valuevaluevaluevalue', value)
  return (
    <>
      <div className="searchpage">
        <Container className="searchpageconatianer">
          <Container className="cardcontainter">
            <Searchbar variant={"outline-secondary"} />
          </Container>
        </Container>
        <Consult locationData={locationData} value={value} />
      </div>
    </>
  );
};

export default SearchDoc;

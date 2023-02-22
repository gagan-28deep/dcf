import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import HTTPrequest from "../../Config/HTTP_request";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
// import { Collapse } from "react-bootstrap";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import './slickdot.css';
import { useSearchProvider } from "../../provider/searchProvider";

// function CustomToggle({ children, eventKey }) {
//   const decoratedOnClick = useAccordionButton(eventKey, () =>
//     console.log("totally custom!")
//   );

//   return (
//     <button
//       type="button"
//       style={{
//         backgroundColor: "",
//         width: "15%",
//         margin: "auto",
//       }}
//       onClick={decoratedOnClick}
//     >
//       {children}
//     </button>
//   );
// }

//   return (
//     <button
//       type="button"
//       style={{
//         backgroundColor: "",
//         width: "15%",
//         margin: "auto",
//       }}
//       onClick={decoratedOnClick}
//     >
//       {children}
//     </button>
//   );
// }

const SpecializationSection = (props) => {
  const { toggle } = props;
  const navigate = useNavigate();
  const { formik } = useSearchProvider();

  const settings = {
    className: "",
    centerMode: false,
    infinite: true,
    dots: true,
    centerPadding: "60px",
    slidesToShow: 5,
    slidesToScroll: 5,
    speed: 500,
    autoplay: true,
    rtl: false,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 959,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ]
  };
  const api = {
    path: "specialization",
    method: "GET",
  };
  const [speciality, setSpeciality] = useState([]);

  const fetchData = async () => {
    const api = {
      path: "specialization",
      method: "GET",
    };
    const data = await HTTPrequest(api);
    if (data && data.data.status === 200) {
      console.log("SpecializationSection", data.data.data);
      setSpeciality(data.data.data);
    } else if (data && data.data.status === 401) {
      console.log("unauthorized user...");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid>
      <Slider {...settings}>
        {speciality.map((el, id) => {
          console.log('elelelelel', el)
          return (
            <Box key={`Speciality${id}`} sx={{ height: '100%' }}>
              <Box sx={{ padding: 1 }}>
                <Card style={{ cursor: 'pointer', border: 'none' }} onClick={() => {
                  formik.setFieldValue('name', el.name)
                  formik.handleSubmit()
                  // navigate(`/doctor/search?specialization=${el.name}`, { state: { name: el?.name.trim() } })
                  }}>
                  <Card.Img variant="top" width={'100%'} src={el.image} />
                  <Card.Body>
                    <Card.Text
                      style={{
                        fontSize: "0.9rem",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      {el.name}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Box>
            </Box>
          );
        })}
      </Slider>
    </Container>
  );
};
export default SpecializationSection;

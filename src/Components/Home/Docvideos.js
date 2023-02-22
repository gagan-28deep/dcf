import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Videofram from "./Videofram";
import { apiAdminConfig } from "../../utils/api";
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./homecomponent.css";
import { useMediaQuery, useTheme } from "@mui/material";
const Docvideos = () => {
  const [lgShow, setLgShow] = useState(false);
  const [video, setvideo] = useState([]);
  const [videoId, setVideoid] = useState("");
  const theme = useTheme();
  const mediaquery = useMediaQuery(theme.breakpoints.up('sm'))
  console.log('mediaquery', mediaquery)
  const fetchData = async (obj) => {
    await apiAdminConfig
      .get(`doctorsprescribedVideos`)
      .then((response) => {
        console.log("response", response);
        if (response.data.status === 200) {
          setvideo(response.data.data);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const [slides, setSlides] = useState(0);
  useEffect(() => {
    fetchData();
    if (window.innerWidth < 740) {
      setSlides(1);
    } else if (window.innerWidth >= 740 && window.innerWidth < 1080) {
      setSlides(2);
    } else {
      setSlides(3);
    }
  }, []);
  const settings = {
    className: "",
    centerMode: false,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 500,
    autoplay: mediaquery,
    autoplaySpeed: 3000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ]
  };
  return (
    <div>
      <Slider {...settings}>
        {video.map((el, id) => {
          return (
            <div key={id}>
              <Card
                // onClick={() => {
                //   setVideoid(el.video_id);
                //   setLgShow(true);
                // }}
                style={{ margin: "10px" }}
              >
                <Videofram id={el.video_id} />
                {/* <Card.Img variant="top" src={el.thumbnail} /> */}
                <Card.Body style={{ padding: "5px", paddingTop: '15px' }}>
                  <Card.Title
                    style={{
                      fontSize: "1rem",
                      textAlign: "center",
                      marginLeft: "1%",
                      height: "20px",
                      overflow: 'hidden!important',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {el.title}
                  </Card.Title>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </Slider >

      {/* <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Body>
          <Videofram id={videoId} />
        </Modal.Body>
      </Modal> */}
    </div >
  );
};

export default Docvideos;

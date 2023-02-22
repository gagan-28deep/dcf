import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import img1 from "../../Assets/images/home page/category-1.png";
import img2 from "../../Assets/images/home page/category-2.png";
import img3 from "../../Assets/images/home page/category-3.png";
import img4 from "../../Assets/images/home page/category-4.png";
import img5 from "../../Assets/images/home page/category-5.png";
import './doctorPlazaFeatures.css';
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Modal } from "react-bootstrap";

const DocplazaFeatures = (url) => {
  const navigate = useNavigate();
  const FeatureData = [
    {
      id: 1,
      title: 'Connect with the best doctors near you',
      subtitle: 'With Doctors Plaza, finding the best clinic nearby is now simple. In just a few minutes, get in touch with the top doctors in the region.We strive to be a one- stop solution for all your medical needs.Your search for a specialist doctor ends here.',
      img: img1
    },
    {
      id: 2,
      title: 'Find Doctors Near You',
      subtitle: "Can't travel because of a health issue? Take solace! Book an appointment with a highly experienced specialist doctor online in just a few steps.",
      img: img2
    },
    {
      id: 3,
      title: "Physiotherapy near you",
      subtitle: "When you can receive physiotherapy at home, why go see your therapist? Call the best physiotherapist in Delhi right away! We provide both In-Clinic and At-Home physiotherapy sessions.",
      img: img3
    },
    {
      id: 4,
      title: "Lab test",
      subtitle: "Now, lab testing is simpler since our professionals can collect your sample from home, and you will receive a report as soon as possible. We offer ease of booking blood tests from home.",
      img: img5
    },
    {
      id: 5,
      title: "Surgical guidance",
      subtitle: "Get guidance about surgery from our skilled and reliable surgeons who are associated with prestigious hospitals in India.",
      img: img4
    }
  ]
  const [open, setOpen] = useState({
    open: false,
    item: {}
  });

  const handleClose = () => {
    setOpen({ open: false, item: {} })
  }


  const handleOpen = (item) => {
    setOpen({ open: true, item: item })
  }

  return (
    <ThemeProvider theme={theme}>
      <Row xs={2} sm={2} md={3} lg={5} className="g-4 mt-2">
        {FeatureData && FeatureData.map((item, index) => {
          return (
            <Col key={`FeatureData${index}`}>
              {/* <Card onClick={() => navigate('/video-consult')} className="featurecards" border="light"> */}
              <Card className="featurecards" border="light">
                <Card.Header style={{ position: 'relative', padding: '0px', paddingLeft: '0px', backgroundColor: '#377196' }}>
                  <Card.Img className="feature_img" variant="top" src={item.img} />
                </Card.Header>
                <Card.Body>
                  <Card.Title style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'initial',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '10px',
                    textAlign: 'left', fontSize: '20px', fontWeight: 500, color: '#131416',
                  }}>
                    {item.title}
                  </Card.Title>
                  <Card.Text style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'initial',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '0px',
                    textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
                  }}>
                    {item.subtitle}
                  </Card.Text><Card.Text style={{ textAlign: 'left', fontSize: '14px', color: '#76B757', width: '100%' }}
                    onClick={() => handleOpen(item)}
                  >read more</Card.Text>
                  {/* <Card.Footer style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderTop: '0px solid',
                    background: 'transparent'
                  }}>
                    <Button onClick={() => handleOpen(item)} variant="contained" color="primary">
                      Read More
                    </Button>
                  </Card.Footer> */}
                </Card.Body>
              </Card>
            </Col>
          )
        })}
        <Modal
          show={open?.open}
          onHide={() => handleClose()}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              {open?.item?.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {open?.item?.subtitle}
            </p>
          </Modal.Body>
        </Modal>
        {/* <Col>
          <Card onClick={() => navigate('/find-doctor')} className="featurecards" border="light">
            <Card.Header style={{ position: 'relative', paddingBottom: '0px', backgroundColor: '#0074C3' }}>
              <Card.Img className="feature_img" variant="top" src={img2} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{
                textAlign: 'left', fontSize: '20px', fontWeight: 500, color: '#131416',
              }}>
                Find Doctors Near You
              </Card.Title>
              <Card.Text style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'initial',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                marginBottom: '10px',
                textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
              }}>
                Can't travel because of a health issue? Take solace! Book an appointment with a highly
                experienced specialist doctor online in just a few steps.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => navigate('/physiotherapy')} className="featurecards" border="light">
            <Card.Header style={{ position: 'relative', paddingBottom: '0px', backgroundColor: '#00B6A9' }}>
              <Card.Img className="feature_img" variant="top" src={img3} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: 'left', fontSize: '20px', fontWeight: 500, color: '#131416', }}>
                Physiotherapy near you
              </Card.Title>
              <Card.Text style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'initial',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                marginBottom: '10px',
                textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
              }}>
                When you can receive physiotherapy at home, why go see your therapist? Call the best
                physiotherapist in Delhi right away! We provide both In-Clinic and At-Home physiotherapy
                sessions.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => navigate('/corporate')} className="featurecards" border="light">
            <Card.Header style={{ position: 'relative', paddingBottom: '0px', paddingLeft: '0px', backgroundColor: '#8EC0C2' }}>
              <Card.Img className="feature_img" variant="top" src={img5} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: 'left', fontSize: '20px', fontWeight: 500, color: '#131416', }}>
                Lab test
              </Card.Title>
              <Card.Text style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'initial',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                marginBottom: '10px',
                textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
              }}>
                Now, lab testing is simpler since our professionals can collect your sample from home, and you
                will receive a report as soon as possible. We offer ease of booking blood tests from home.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card onClick={() => navigate('/home-care')} className="featurecards" border="light">
            <Card.Header style={{ position: 'relative', paddingBottom: '0px', backgroundColor: '#10BA91' }}>
              <Card.Img className="feature_img" variant="top" src={img4} />
            </Card.Header>
            <Card.Body>
              <Card.Title style={{ textAlign: 'left', fontSize: '20px', fontWeight: 500, color: '#131416', }}>
                Surgical guidance
              </Card.Title>
              <Card.Text style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'initial',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                marginBottom: '10px',
                textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
              }}>
                Get guidance about surgery from our skilled and reliable surgeons who are associated with
                prestigious hospitals in India.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
    </ThemeProvider>
  );
};
export default DocplazaFeatures;

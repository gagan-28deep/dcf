import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import img1 from "../../Assets/images/home page/consult-1.png";
import img2 from "../../Assets/images/home page/consult-2.png";
import img3 from "../../Assets/images/home page/consult-3.png";
import img4 from "../../Assets/images/home page/consult-4.png";
import img5 from "../../Assets/images/home page/consult-5.png";
import img6 from "../../Assets/images/home page/consult-6.png";

const ClinicConsultation = (url) => {
  return (
    <Row xs={1} md={6} className="g-4 ">
      <Col>
        <Card border="light" style={{ border: 'none', padding: '0px' }}>
          <Card.Img variant="top" style={{ width: '100', height: '90%' }} src={img1} />
        </Card>
      </Col>
      <Col>
        <Card border="light" style={{ border: 'none', padding: '0px' }}>
          <Card.Img variant="top" style={{ width: '100', height: '90%' }} src={img2} />
        </Card>
      </Col>
      <Col>
        <Card border="light" style={{ border: 'none', padding: '0px' }}>
          <Card.Img variant="top" style={{ width: '100', height: '90%' }} src={img3} />
        </Card>
      </Col>
      <Col>
        <Card border="light" style={{ border: 'none', padding: '0px' }}>
          <Card.Img variant="top" style={{ width: '100', height: '90%' }} src={img4} />
        </Card>
      </Col>
      <Col>
        <Card border="light" style={{ border: 'none', padding: '0px' }}>
          <Card.Img variant="top" style={{ width: '100', height: '90%' }} src={img5} />
        </Card>
      </Col>
      <Col>
        <Card border="light" style={{ border: 'none', padding: '0px' }}>
          <Card.Img variant="top" style={{ width: '100', height: '90%' }} src={img6} />
        </Card>
      </Col>
    </Row>
  );
};
export default ClinicConsultation;

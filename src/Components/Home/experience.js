import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import img1 from "../../Assets/images/home page/exp-1.png";
import img2 from "../../Assets/images/home page/exp-2.png";
import img3 from "../../Assets/images/home page/exp-3.png";

const Experience = (url) => {
    return (
        <Row xs={1} md={3} className="g-4 ">
            <Col>
                <Card border="light" style={{ border: 'none', padding: '0px' }}>
                    <Card.Img variant="top" style={{ width: '100', height: '180px' }} src={img1} />
                </Card>
            </Col>
            <Col>
                <Card border="light" style={{ border: 'none', padding: '0px', backgroundColor: '#000' }}>
                    <Card.Img variant="top" style={{ width: '100', height: '180px' }} src={img2} />
                </Card>
            </Col>
            <Col>
                <Card border="light" style={{ border: 'none', padding: '0px', backgroundColor: '#000' }}>
                    <Card.Img variant="top" style={{ width: '100', height: '180px' }} src={img3} />
                </Card>
            </Col>
        </Row>
    );
};
export default Experience;

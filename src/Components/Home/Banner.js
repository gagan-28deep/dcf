import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import img1 from "../../Assets/images/home page/Banner.png";
const Banner = (url) => {
    return (
        <Row xs={1} md={1} className="g-4 ">
            <Col>
                <Card border="light" style={{ border: 'none', padding: '0px' }}>
                    <Card.Img variant="top" style={{ width: '100', height: '100%' }} src={img1} />
                </Card>
            </Col>
        </Row>
    );
};
export default Banner;

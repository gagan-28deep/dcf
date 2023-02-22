import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import img1 from "../../Assets/images/home page/dental-1.png";
import img2 from "../../Assets/images/home page/dental-2.png";
import img3 from "../../Assets/images/home page/dental-3.png";
import img4 from "../../Assets/images/home page/dental-4.png";
import './doctorPlazaFeatures.css';

const BookAppointment = (url) => {
    return (
        <Row xs={2} md={2} sm={2} lg={4} className="g-4 ">
            <Col>
                <Card border="light" style={{ border: 'none' }}>
                    <Card.Img className="book_img" variant="top" src={img1} />
                    <Card.Title style={{ marginTop: '10px', textAlign: 'left', fontSize: '16px', fontWeight: 700, color: '#131416', }}>
                        Dentist
                    </Card.Title>
                    <Card.Text style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'initial',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
                    }}>
                        By making a phone call or scheduling an appointment online, you may consult the best dental
                        clinic in Delhi. With Doctor's Plaza, it's simple to put dental issues behind you.
                    </Card.Text>
                </Card>
            </Col>
            <Col>
                <Card border="light" style={{ border: 'none' }}>
                    <Card.Img className="book_img" variant="top" src={img2} />
                    <Card.Title style={{ marginTop: '10px', textAlign: 'left', fontSize: '16px', fontWeight: 700, color: '#131416', }}>
                        Gynaecologist/Obstetrician
                    </Card.Title>
                    <Card.Text style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'initial',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
                    }}>
                        Discover the best gynaecologist near you for women's health, pregnancy, and infertility
                        treatments.
                    </Card.Text>
                </Card>
            </Col>
            <Col>
                <Card border="light" style={{ border: 'none' }}>
                    <Card.Img className="book_img" variant="top" src={img3} />
                    <Card.Title style={{ marginTop: '10px', textAlign: 'left', fontSize: '16px', fontWeight: 700, color: '#131416', }}>
                        Dietitian/Nutrition
                    </Card.Title>
                    <Card.Text style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'initial',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
                    }}>
                        Want to change the way you eat? Why not get advice from the best nutritionist in Delhi
                        regarding healthy eating, weight control, and sports nutrition?

                    </Card.Text>
                </Card>
            </Col>
            <Col>
                <Card border="light" style={{ border: 'none' }}>
                    <Card.Img className="book_img" variant="top" src={img4} />
                    <Card.Title style={{ marginTop: '10px', textAlign: 'left', fontSize: '16px', fontWeight: 700, color: '#131416', }}>
                        Physiotherapist
                    </Card.Title>
                    <Card.Text style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'initial',
                        display: '-webkit-box',
                        WebkitLineClamp: '2',
                        WebkitBoxOrient: 'vertical',
                        textAlign: 'left', fontSize: '14px', fontWeight: 400, color: '#858F94',
                    }}>
                        Do you have a muscle pull or strain? Why not have the most qualified and skilled
                        physiotherapist treat it?
                    </Card.Text>
                </Card>
            </Col>
        </Row>
    );
};
export default BookAppointment;

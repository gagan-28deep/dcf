import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import "./homecomponent.css";

const Docplazasteps = () => {
  const stepsdata = [
    {
      title: "Register at Doctors Plaza",
      text: `Simple Sign-In steps can be found on our app. Your basic details like name, phone number,
      Gender and Date of Birth are all we need.`,
      color: "#76B757",
      background: "#CCDEC3",
    },
    {
      title: "Choose your Doctor",
      text: `Lacking the time to visit your preferred doctor? Don't be concerned! Simply look for your doctor
      or clinic to schedule an appointment or contact our customer care to book an appointment on
      call with your preferred medical practitioners.
      `,
      color: "#F27A20",
      background: "#F0CEB4",
    },
    {
      title: "Schedule a Consultation",
      text: `A streamlined encounter that provides you access to well-chosen services and clear options.
      Choose a time slot and meet your specialist without waiting in long lines. Find multiple specialist
      under one roof for you and loved ones.`,
      color: "#131416",
      background: "#F0F1F2",
    },
    {
      title: "Electronic Prescription",
      text: `A digital prescription will be given to you each time you visit the doctor. You can save your
      prescriptions on highly encrypted cloud servers. Never lose a prescription again.`,
      color: "#2D9CDB",
      background: "#CCF0FB",
    },
  ];
  return (
    <>
      <Row xs={1} md={2} className="g-4">
        {stepsdata.map((item, id) => {
          return (
            <Col key={id}>
              <Card
                border="light"
                style={{ backgroundColor: `${item.background}` }}
                className="stepcard"
              >

                <Card.Body style={{ paddingTop: 0 }}>
                  <div
                    className="stepcardnumber"
                    style={{ backgroundColor: `${item.color}` }}
                  >
                    <h5 style={{
                      padding: '0px',
                      height: "28px",
                      top: '50%',
                      left: '50%',
                      marginBottom: '0px',
                      lineHeight: 1.4,
                      position: 'absolute',
                      transform: 'translate(-50%, -50%)'
                    }}>{id + 1}</h5>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', paddingTop: '4vh' }}>
                    <div>
                      <Card.Title
                        style={{
                          color: `${item.color}`,
                          fontSize: "1rem",
                        }}
                      >
                        {item.title}
                      </Card.Title>
                      <Card.Text
                        style={{
                          fontSize: "0.75rem",
                          textAlign: "justify",
                        }}
                      >
                        {item.text}
                      </Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};
export default Docplazasteps;

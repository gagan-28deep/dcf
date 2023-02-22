import React from "react";
import "./footer.css";
import facbook from "../../Assets/images/home page/fb.png";
import instagram from "../../Assets/images/home page/insta.png";
import twitter from "../../Assets/images/home page/twitter.png";
import footerologo from "../../Assets/images/drplazanew.png";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="row">
          <ul>
            <li>
              <a href="/">
                <img
                  src={footerologo}
                  className="d-inline-block align-top"
                  alt="Doctorsplaza logo"
                  width="150"
                  height="40"
                />
              </a>
            </li>
          </ul>
        </div>
        <div className="row">
          <ul>
            <li>
              <a href="https://www.facebook.com/doctorsplazaofficial" target={'_blank'} rel="noreferrer">
                <img src={facbook} alt="doctorsplaza_facebook.png" />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/PlazaDoctors" target={'_blank'} rel="noreferrer">
                <img src={twitter} alt="doctorsplaza_facebook.png" />
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/doctorsplaza_/" target={'_blank'} rel="noreferrer">
                <img src={instagram} alt="doctorsplaza_facebook.png" />
              </a>
            </li>
          </ul>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="/aboutus">About us</a>
            </li>
            <li>
              <a href="/termsandcondition">Terms & Conditions</a>
            </li>
            <li>
              <a href="/privacy">Privacy Policy</a>
            </li>
            {/* <li>
              <a href="#">Refund Policy</a>
            </li>
            <li>
              <a href="#">Doctor Features</a>
            </li>
            <li>
              <a href="#">Doctor Sign in</a>
            </li> */}
          </ul>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="#">Email: Info@doctorsplaza.in</a>
            </li>
            <li>
              <a href="#">|</a>
            </li>
            <li>
              <a href="tel:+918929280230">Phone: +91 8929280230</a>
            </li>
          </ul>
        </div>

        <div className="row">
          <ul>
            <li>
              <a href="#">Address: 63, West Avenue Road, West Punjabi Bagh.</a>
            </li>
            <li>
              <a href="#">F-39, East of Kailash, New Delhi-110065.</a>
            </li>
            <li>
              <a href="#">16, Gagan Vihar, Krishna Nagar, New Delhi-110051.</a>
            </li>
          </ul>
        </div>
        <div className="row">
          <ul>
            <li>
              <a href="https://g.co/kgs/4f5QwE" target={'_blank'} rel="noreferrer">
                Address: Arogya Neuro Clinic- Dr. Alok Gupta (Neurosurgeon)
                <br />
                Shahid Bhagat Singh Marg, Nehru Ground New Industrial Twp
                <br />
                1, New Industrial Twp, Faridabad, Haryana 121001
              </a>
            </li>
          </ul>
        </div>

        {/* <div className="row">
          <ul>
            <li>
              <a >https://g.co/kgs/4f5QwE</a>
            </li>
          </ul>
        </div> */}

        <div className="row">
          <ul>
            <li>Copyright © 2022 Docto Net Private Limited.</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

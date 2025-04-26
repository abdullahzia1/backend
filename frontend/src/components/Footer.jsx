import React, { useRef } from "react";
import logo from "../assets/logo.png";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";

// Footer component definition
const Footer = () => {
  // Get current year
  const currentYear = new Date().getFullYear();

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_c1wwssh", "template_ujsy74a", form.current, {
        publicKey: "2BV6mEm3MQBmzT6n5",
      })
      .then(
        () => {
          console.log("Email Sent");
        },
        (error) => {
          console.log("FAILED to sent email...", error.text);
        }
      );
  };

  return (
    // Footer section
    <footer style={{ background: "#F0F0F0", marginTop: "140px" }}>
      <Container>
        {/* Subscribe section */}
        <Card
          style={{
            position: "relative",
            bottom: "70px",
            background: "#000000",
            boxShadow:
              "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
            borderRadius: "30px",
          }}
        >
          <Row>
            <Col lg={8} md={7} sm={12} xs={12}>
              {/* Title */}
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "25px",
                  fontWeight: "600",
                  color: "#ffffff",
                  margin: "60px 0px",
                }}
              >
                STAY UPTO DATE ABOUT OUR LATEST OFFERS
              </h1>
            </Col>
            {/* Form section */}
            <Col
              lg={4}
              md={5}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <form ref={form} onSubmit={sendEmail}>
                  <div className="mt-2">
                    {/* Email input field */}
                    <input
                      name="user_email"
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="✉ Enter your email address"
                      style={{
                        borderRadius: "20px",
                        width: "250px",
                        background: "#ffffff",
                      }}
                    />
                  </div>
                  {/* Subscribe button */}
                  <Button
                    type="submit"
                    value="Send"
                    onClick={sendEmail}
                    style={{
                      width: "250px",
                      fontSize: "15px",
                      fontWeight: "500",
                      color: "#000000",
                      textAlign: "center",
                      border: "1px Solid black",
                      background: "#ffffff",
                      borderRadius: "200px",
                      margin: "10px 0px",
                      padding: "10px 25px",
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                  >
                    Subscribe to Newsletter
                  </Button>
                </form>
              </div>
            </Col>
          </Row>
        </Card>

        {/* Logo and links section */}
        <Row>
          {/* Logo */}
          <Col lg={6} md={6} sm={3} xs={6}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <img src={logo} alt="CheezBaich" style={{ width: "60px" }} />
              <h1
                style={{
                  fontSize: "30px",
                  fontWeight: "800",
                  color: "#000000",
                  margin: "10px 0px",
                }}
              >
                CHEEZ BAICH
              </h1>
            </Link>
          </Col>
          {/* Company links */}
          <Col lg={2} md={2} sm={3} xs={6}>
            <h5
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#000000",
                margin: "10px 0px",
              }}
            >
              Company
            </h5>
            <ul className="nav flex-column">
              <Link
                to={`/About`}
                style={{ textDecoration: "none", color: "#495057" }}
              >
                <li className="nav-item mb-2">About</li>
                <li className="nav-item mb-2">Contact Us </li>
              </Link>
            </ul>
          </Col>
          {/* Help links */}
          <Col lg={2} md={2} sm={3} xs={6}>
            <h5
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#000000",
                margin: "10px 0px",
              }}
            >
              Help
            </h5>
            <ul className="nav flex-column">
              <Link
                to={`/Help`}
                style={{ textDecoration: "none", color: "#495057" }}
              >
                <li className="nav-item mb-2">Manage Shipping</li>
                <li className="nav-item mb-2">Customer Support</li>
              </Link>
            </ul>
          </Col>
          {/* FAQ links */}
          <Col lg={2} md={2} sm={3} xs={6}>
            <h5
              style={{
                fontSize: "20px",
                fontWeight: "500",
                color: "#000000",
                margin: "10px 0px",
              }}
            >
              FAQ
            </h5>
            <ul className="nav flex-column">
              <Link
                to={`/FAQ`}
                style={{ textDecoration: "none", color: "#495057" }}
              >
                <li className="nav-item mb-2">Terms & Conditions</li>
                <li className="nav-item mb-2">Return Policy</li>
              </Link>
            </ul>
          </Col>
        </Row>

        {/* Copyright */}
        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 mt-4 border-top">
          <p>© {currentYear} Company, Inc. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

// Export Footer component
export default Footer;

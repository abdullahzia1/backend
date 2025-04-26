import React from "react";
import { Accordion, Container } from "react-bootstrap";

const AboutScreen = () => {
  return (
    <>
      <Container>
        <div className="p-3">
          <h1
            style={{
              textAlign: "start",
              fontSize: "45px",
              fontWeight: "600",
              color: "#000000",
              margin: "60px 0px",
            }}
          >
            Company
          </h1>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h5
                  className="card-title"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  About US
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  className="card-text"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#0000009c",
                  }}
                >
                  Welcome to <strong>Cheez Baich</strong> , your ultimate
                  destination for affordable electronics online. At{" "}
                  <strong>Cheez Baich</strong> , we believe that everyone
                  deserves access to high-quality electronics without breaking
                  the bank. That's why we've curated a wide range of gadgets,
                  devices, and accessories at prices that won't leave a dent in
                  your wallet. With a passion for technology and a commitment to
                  customer satisfaction, we strive to bring you the latest and
                  greatest electronic products from leading brands. Whether
                  you're in need of a new smartphone, laptop, gaming console, or
                  any other electronic gadget, <strong>Cheez Baich</strong> has
                  got you covered. Our mission is simple: to provide our
                  customers with a seamless shopping experience, unbeatable
                  prices, and top-notch customer service. We're constantly
                  updating our inventory to offer you the best deals on the
                  market, so you can shop with confidence knowing that you're
                  getting the best value for your money. So why wait? Explore
                  our collection of electronics today and discover why{" "}
                  <strong>Cheez Baich</strong> is the go-to destination for
                  affordable tech essentials. Happy shopping!
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5
                  className="card-title"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Contact US
                </h5>
              </Accordion.Header>
              <Accordion.Body>
                <p
                  className="card-text"
                  style={{
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "#0000009c",
                  }}
                >
                    <ul>
                        <li><strong>Email:</strong>  CheezBaich@shop.com</li>
                        <li><strong>Contact Number:</strong>  03333300300</li>
                    </ul>
                  
                  
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </>
  );
};

export default AboutScreen;

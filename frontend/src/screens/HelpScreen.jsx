import React from "react";
import { Accordion, Container } from "react-bootstrap";

const HelpScreen = () => {
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
            Help
          </h1>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h5
                  className="card-title"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Manage Shipping
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
                    <li>We offer free delivery in all cities of Pakistan.</li>
                    <li>
                      The delivery time for products termed as&nbsp;“In
                      Stock”&nbsp;is as per the following schedule.
                    </li>
                    <li>
                      The above-mentioned duration may differ in case the
                      product is shipped from another city due to its
                      non-availability in the specified city.
                    </li>
                    <li>
                      The deliveries are made between 9:00 am to 8:00 pm, Monday
                      through Saturday.
                    </li>
                    <li>
                      We also provide services like&nbsp; Open box Delivery
                      &nbsp;and&nbsp; Self Pick Up &nbsp;in the cities of
                      Islamabad, Rawalpindi, Lahore, and Karachi.
                    </li>
                    <li>
                      PKR 300 is added to your order if you select Open Parcel
                      as your delivery method.
                    </li>
                    <li>
                      For other cities, a video of your product being packaged
                      is sent through SMS/email. This is to ensure and give your
                      confidence that you would be getting what you have
                      ordered.
                    </li>
                    <li>
                      You can now view the order packaging video once your order
                      is in transit by visiting your Priceoye.pk Account. Click
                      the Order ID to view the desired video.&nbsp;
                    </li>
                    <li>
                      We share tracking ID through SMS on your registered
                      number, once your order is shipped to help you track your
                      parcel’s journey. You can track your order now by logging
                      into your PriceOye Account.&nbsp;
                    </li>
                    <li>
                      To ensure foolproof and secure transactions, payment
                      gateways require to hold deliveries for 24 hours. As soon
                      as we get a confirmation from the gateway, we dispatch the
                      products immediately.
                    </li>
                    <li>
                      Recipients are required to provide a picture of their CNIC
                      to our Rider as a proof to ensure the security of the
                      package and order delivery.
                    </li>
                    <li>
                      Upon receiving the parcel, the authorized/intended
                      recipient will be required to sign the delivery document
                      upon the delivery of the package with their ID card
                      detail.
                    </li>
                  </ul>
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5
                  className="card-title"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Customer Support
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
                    <li>
                      {" "}
                      At Cheez Baich, we take pride in providing exceptional
                      customer care to ensure your shopping experience is smooth
                      and satisfying. Our dedicated customer care team is here
                      to assist you with any questions, concerns, or issues you
                      may encounter.
                    </li>
                    <li>
                      Whether you need help finding the right product, tracking
                      your order, or resolving an issue with your purchase, our
                      friendly and knowledgeable customer care representatives
                      are ready to assist you promptly and effectively.
                    </li>
                    <li>
                      You can reach our customer care team through multiple
                      channels, including email, phone, and live chat support.
                      We're available to assist you during our business hours,
                      and we strive to respond to all inquiries in a timely
                      manner.
                    </li>
                    <li>
                      Your satisfaction is our priority, and we're committed to
                      going above and beyond to ensure you have a positive
                      shopping experience with Cheez Baich. So don't hesitate to
                      reach out to our customer care team whenever you need
                      assistance—we're here to help!
                    </li>
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

export default HelpScreen;

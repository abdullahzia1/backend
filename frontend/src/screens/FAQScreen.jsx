import React from "react";
import { Accordion, Container } from "react-bootstrap";

const FAQScreen = () => {
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
            FAQ
          </h1>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <h5
                  className="card-title"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  WARRANTY TERMS AND CONDITIONS
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
                  All the products that are uploaded on our website have their
                  warranty period clearly displayed on the product page. Whether
                  it be local or international warranty, we will help you claim
                  it through our offices in Karachi, Lahore & Islamabad. So
                  don't worry, we will be committed with you throughout the
                  warranty period of your product.
                </p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <h5
                  className="card-title"
                  style={{ fontSize: "20px", fontWeight: "600" }}
                >
                  Returns
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
                  Regarding returns, we can only entertain you if there is a
                  real defect in a few days of your purchase for which the
                  chances are extremely slim. You can avail our 7 day return
                  policy subject to terms and conditions. Our products are
                  genuine and authentic. We highly recommend our customers to
                  visit our offices in Karachi, Lahore or Islamabad and check
                  your product before paying for your own satisfaction.
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </>
  )
}

export default FAQScreen
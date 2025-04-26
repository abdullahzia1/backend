import { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1
        style={{
          textAlign: "start",
          fontSize: "45px",
          fontWeight: "700",
          color: "#000000",
          margin: "60px 0px",
        }}
      >
        Payment Method
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label
            as="legend"
            style={{
              textAlign: "start",
              fontSize: "24px",
              fontWeight: "700",
              color: "#000000",
            }}
          >
            Select Method
          </Form.Label>
          <Col>
            <Form.Check
              className="my-2"
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          style={{
            fontSize: "20px",
            fontWeight: "300",
            color: "#ffff",
            textAlign: "center",
            border: "1px Solid black",
            background: "black",
            borderRadius: "200px",
            margin: "20px 0px",
            padding: "10px 25px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          }}
        >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;

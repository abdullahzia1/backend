import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      {/* <CheckoutSteps step1 step2 /> */}
      <h1
        style={{
          textAlign: "start",
          fontSize: "45px",
          fontWeight: "700",
          color: "#000000",
          margin: "60px 0px",
        }}
      >
        Shipping
      </h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="address">
          <Form.Label>
            <h6
              style={{
                textAlign: "start",
                fontSize: "20px",
                fontWeight: "600",
                color: "#000000",
              }}
            >
              Address
            </h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="city">
          <Form.Label>
            <h6
              style={{
                textAlign: "start",
                fontSize: "20px",
                fontWeight: "600",
                color: "#000000",
              }}
            >
              City
            </h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="postalCode">
          <Form.Label>
            <h6
              style={{
                textAlign: "start",
                fontSize: "20px",
                fontWeight: "600",
                color: "#000000",
              }}
            >
              Postal Code
            </h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="country">
          <Form.Label>
            <h6
              style={{
                textAlign: "start",
                fontSize: "20px",
                fontWeight: "600",
                color: "#000000",
              }}
            >
              Country
            </h6>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
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

export default ShippingScreen;

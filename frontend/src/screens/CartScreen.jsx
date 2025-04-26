import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Tesseract from "tesseract.js";
import { useState } from "react";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const [image, setImage] = useState(null);
  const [pin, setPin] = useState("");
  const [checkoutEnabled, setCheckoutEnabled] = useState(false);

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
    // navigate("/login?redirect=/shipping");
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    setImage(file);
    const {
      data: { text },
    } = await Tesseract.recognize(file, "eng", {
      // logger: (m) => console.log(m),
    });
    const pinRegex = /(\d{5}-\d{7}-\d{1})/;
    const extractedPin = text.match(pinRegex);
    if (extractedPin) {
      setPin(extractedPin[0]);
      setCheckoutEnabled(true);
    } else {
      setPin("");
      setCheckoutEnabled(false);
    }
  };

  return (
    <>
      <Container className="p-0">
        <Row>
          <h1
            style={{
              textAlign: "start",
              fontSize: "45px",
              fontWeight: "600",
              color: "#000000",
              margin: "60px 0px",
            }}
          >
            Your Cart
          </h1>
          <Col className="my-3" lg={7} md={7} sm={12}>
            <Card>
              {cartItems.length === 0 ? (
                <div>
                  <h1
                    style={{
                      textAlign: "start",
                      fontSize: "45px",
                      fontWeight: "600",
                      color: "#000000",
                      margin: "60px 0px",
                    }}
                  >
                    Your cart is empty
                  </h1>
                  <Link
                    to="/"
                    style={{
                      textDecoration: "none",
                      fontSize: "35px",
                      fontWeight: "600",
                      color: "#000000",
                      margin: "60px 0px",
                      textAlign: "center",
                    }}
                  >
                    <Button
                      style={{
                        fontSize: "18px",
                        fontWeight: "300",
                        color: "#ffff",
                        textAlign: "center",
                        border: "1px Solid black",
                        background: "black",
                        borderRadius: "200px",
                        padding: "10px 25px",
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                        width: "70%",
                        margin: "60px auto",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      Go Home Page
                    </Button>
                  </Link>
                </div>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => (
                    <ListGroup.Item key={item._id}>
                      <Row style={{ minHeight: "180px", padding: "0px" }}>
                        <Col lg={4} md={6} sm={5} xs={6} style={{}}>
                          <Link to={`/product/${item._id}`}>
                            <Card.Img
                              src={item.image}
                              alt={item.name}
                              variant="top"
                              style={{
                                background: "#F0EEED",
                                borderRadius: "15px",
                                width: "100%",
                                height: "100%",
                                objectFit: "fill",
                                margin: "auto",
                                boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                              }}
                            />
                          </Link>
                        </Col>
                        <Col
                          lg={8}
                          md={6}
                          sm={7}
                          xs={6}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignContent: "center",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignContent: "flex-start",
                              height: "100%",
                            }}
                          >
                            <Link
                              to={`/product/${item._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <h3
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  color: "#000000",
                                }}
                              >
                                {item.name}
                              </h3>
                            </Link>
                            <h3
                              style={{
                                fontSize: "20px",
                                fontWeight: "700",
                                color: "#000000",
                              }}
                            >
                              Rs. {item.price}
                            </h3>
                          </div>

                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              alignContent: "flex-start",
                              height: "100%",
                            }}
                          >
                            <FaTrash
                              style={{
                                color: "red",
                                margin: "0 auto",
                              }}
                              type="button"
                              variant="light"
                              onClick={() => removeFromCartHandler(item._id)}
                            />
                            {/* </Button> */}
                            <Form.Control
                              as="select"
                              value={item.qty}
                              onChange={(e) =>
                                addToCartHandler(item, Number(e.target.value))
                              }
                              style={{
                                border: "1px solid gray",
                                width: "40px",
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 15px",
                                background: "rgb(0 0 0 / 0.9%)",
                                borderRadius: "15px",
                                margin: "0 auto",
                              }}
                            >
                              {[...Array(item.countInStock).keys()].map((x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              ))}
                            </Form.Control>
                          </div>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Card>
          </Col>
          <Col className="my-3" lg={5} md={5} sm={12}>
            <Card className="container">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1
                    style={{
                      textAlign: "start",
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#000000",
                      margin: "20px 0px",
                    }}
                  >
                    Order Summary
                  </h1>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      margin: "10px 0px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "rgb(0 0 0 / 60%)",
                      }}
                    >
                      Subtotal (
                      {cartItems.reduce((acc, item) => acc + item.qty, 0)}):
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h3>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      margin: "10px 0px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "rgb(0 0 0 / 60%)",
                      }}
                    >
                      Delivery Fee:
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. 0
                    </h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      margin: "10px 0px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "rgb(0 0 0 / 60%)",
                      }}
                    >
                      Discount:
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. 0
                    </h3>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignContent: "center",
                      margin: "10px 0px",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Total:
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. {cartItems
                        .reduce((acc, item) => acc + item.qty * item.price, 0)
                        .toFixed(2)}
                    </h3>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  {image && (
                    <div>
                      <img src={URL.createObjectURL(image)} alt="Uploaded" style={{ width: '50%'}} />
                      {pin ? (
                        <p>Extracted Pin: {pin}</p>
                      ) : (
                        <p>No Pin extracted</p>
                      )}
                    </div>
                  )}

                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0 || !checkoutEnabled}
                    onClick={checkoutHandler}
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
                      width: "100%",
                    }}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CartScreen;

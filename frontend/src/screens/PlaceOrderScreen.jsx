import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Card,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/shipping");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const dispatch = useDispatch();
  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      {/* <CheckoutSteps step1 step2 step3 step4 /> */}
      <Container>
        <Row>
          <Col className="my-3" lg={7} md={12} sm={12} xs={12}>
            <Card className="container">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2
                    style={{
                      textAlign: "start",
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#000000",
                      margin: "20px 0px",
                    }}
                  >
                    Shipping
                  </h2>
                  <p>
                    <strong
                      style={{
                        textAlign: "start",
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#000000",
                      }}
                    >
                      Address:
                    </strong>
                    {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                    {cart.shippingAddress.postalCode},{" "}
                    {cart.shippingAddress.country}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2
                    style={{
                      textAlign: "start",
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#000000",
                      margin: "20px 0px",
                    }}
                  >
                    Payment Method
                  </h2>
                  <p>
                    <strong
                      style={{
                        textAlign: "start",
                        fontSize: "20px",
                        fontWeight: "500",
                        color: "#000000",
                      }}
                    >
                      Method:{" "}
                    </strong>
                    {cart.paymentMethod}
                  </p>
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2
                    style={{
                      textAlign: "start",
                      fontSize: "30px",
                      fontWeight: "700",
                      color: "#000000",
                      margin: "20px 0px",
                    }}
                  >
                    Order Items
                  </h2>
                  {cart.cartItems.length === 0 ? (
                    <Message>
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
                    </Message>
                  ) : (
                    <ListGroup variant="flush">
                      {cart.cartItems.map((item, index) => (
                        <ListGroup.Item key={index}>
                          <Row style={{ minHeight: "180px", padding: "0px" }}>
                            <Col lg={4} md={6} sm={6} xs={7}>
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
                                    objectFit: "contain",
                                    margin: "auto",
                                    boxShadow:
                                      "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                                  }}
                                />
                              </Link>
                            </Col>
                            <Col lg={8} md={6} sm={6} xs={4}>
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-around",
                                  alignItems: "start",
                                  height: "100%",
                                }}
                              >
                                <Link
                                  to={`/product/${item.product}`}
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
                                    fontWeight: "500",
                                    color: "rgb(0 0 0 / 60%)",
                                  }}
                                >
                                  {item.qty} x Rs. {item.price} = 
                                  Rs. {(item.qty * (item.price * 100)) / 100}
                                </h3>
                              </div>
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>

          <Col className="my-3" lg={5} md={12} sm={12} xs={12}>
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
                      Items
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. {cart.itemsPrice}
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
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "rgb(0 0 0 / 60%)",
                      }}
                    >
                      Shipping
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. {cart.shippingPrice}
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
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "rgb(0 0 0 / 60%)",
                      }}
                    >
                      Tax
                    </h3>
                    <h3
                      style={{
                        fontSize: "22px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Rs. {cart.taxPrice}
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
                      Rs. {cart.totalPrice}
                    </h3>

                    {error && (
                      <Message variant="danger">{error.data.message}</Message>
                    )}
                  </div>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cart.cartItems === 0}
                    onClick={placeOrderHandler}
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
                    Place Order
                  </Button>
                  {isLoading && <Loader />}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PlaceOrderScreen;

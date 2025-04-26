import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Container,
} from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPaypalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPaypalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPaypalScript();
        }
      }
    }
  }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Order is paid");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    });
  }

  function onError(err) {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error.data.message}</Message>
  ) : (
    <>
      <Container>
        <h1
          style={{
            textAlign: "start",
            fontSize: "40px",
            fontWeight: "700",
            color: "#000000",
            margin: "60px 0px",
          }}
        >
          Order: "{order && order._id.slice(0, 6)}"
        </h1>
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
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Name:{" "}
                    </strong>{" "}
                    {order.user.name}
                  </p>
                  <p>
                    <strong
                      style={{
                        textAlign: "start",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Email:{" "}
                    </strong>{" "}
                    <a href={`mailto:${order.user.email}`}>
                      {order.user.email}
                    </a>
                  </p>
                  <p>
                    <strong
                      style={{
                        textAlign: "start",
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      Address:
                    </strong>
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.city}{" "}
                    {order.shippingAddress.postalCode},{" "}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">
                      Delivered on {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant="danger">Not Delivered Yet</Message>
                  )}
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
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant="success">Paid on {order.paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not Paid Yet</Message>
                  )}
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
                  {order.orderItems.length === 0 ? (
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
                      {order.orderItems.map((item, index) => (
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
                                  {item.qty} x Rs. {item.price} = Rs. {(item.qty * (item.price * 100)) / 100}
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
                      Rs. {order.itemsPrice}
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
                      Rs. {order.shippingPrice}
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
                      Rs. {order.taxPrice}
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
                      Rs. {order.totalPrice}
                    </h3>
                  </div>
                </ListGroup.Item>
                {!order.isPaid && (
                  <>
                    {loadingPay && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {loadingDeliver && <Loader />}

                {userInfo &&
                  userInfo.isAdmin &&
                  order.isPaid &&
                  !order.isDelivered && (
                    <ListGroup.Item>
                      <Button
                        type="button"
                        className="btn btn-block"
                        onClick={deliverHandler}
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
                        Mark As Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderScreen;

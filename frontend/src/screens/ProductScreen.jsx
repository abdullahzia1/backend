import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Tabs,
  Tab,
  Accordion,
} from "react-bootstrap";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { addToCart } from "../slices/cartSlice";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import HTMLReactParser from "html-react-parser";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  // eslint-disable-next-line
  const navigate = useNavigate();

  const { pageNumber, keyword } = useParams();

  const { data } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
  };

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <div className="container">
            <Meta
              title={product.name}
              description={product.description}
              key={productId}
            />
            <Row className="d-flex gap-2 mt-3">
              <Col lg={4} md={4} sm={6}>
                <Image
                  src={product.image}
                  variant="top"
                  className="mb-3"
                  fluid
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "contain",
                  }}
                />
              </Col>
              <Col lg={7} md={7} sm={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3
                      style={{
                        fontSize: "40px",
                        fontWeight: "700",
                        color: "#000000",
                      }}
                    >
                      {product.name}
                    </h3>
                    <div style={{ fontSize: "20px" }}>
                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "30px",
                        fontWeight: "900",
                        color: "#000000",
                      }}
                    >
                      Rs.{product.price}
                    </p>

                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "300",
                        color: "rgb(0 0 0 / 62%)",
                      }}
                    >
                      {product.miniDescription &&
                        product.miniDescription
                          .split(" ")
                          .slice(0, 23)
                          .join(" ")}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#000000",
                        marginRight: "10px",
                      }}
                    >
                      Status:
                    </p>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "500",
                        color: "#000000",
                      }}
                    >
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </p>
                  </ListGroup.Item>

                  {/* Qty Select */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className="d-flex gap-2">
                        <Col lg={3} md={4} sm={12}>
                          <p
                            style={{
                              fontSize: "18px",
                              fontWeight: "500",
                              color: "#000000",
                              marginRight: "10px",
                            }}
                          >
                            Qty:
                          </p>
                          <Form.Control
                            style={{
                              border: "1px solid gray",
                              width: "100px",
                              boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 15px",
                              background: "rgb(0 0 0 / 0.9%)",
                              borderRadius: "15px",
                            }}
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(Number(e.target.value))}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>

                        <Col lg={7} md={8} sm={12}>
                          <Button
                            className="btn-block"
                            type="button"
                            disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                            style={{
                              fontSize: "20px",
                              fontWeight: "300",
                              color: "#ffff",
                              textAlign: "center",
                              border: "1px Solid black",
                              background: "black",
                              borderRadius: "200px",
                              margin: "20px 0px",
                              padding: "10px 20px",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          >
                            Add To Cart
                          </Button>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Col>
            </Row>

            <hr className="hr hr-blurry" />

            <Tabs
              defaultActiveKey="Product Details"
              variant="underline"
              className="mb-3"
              fill
            >
              <Tab
                eventKey="Product Details"
                title={
                  <span
                    style={{
                      textAlign: "start",
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#000000",
                    }}
                  >
                    Product Details
                  </span>
                }
              >
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
                    Product Details
                  </h1>
                  <p
                    style={{
                      fontSize: "20px",
                      fontWeight: "300",
                      color: "rgb(0 0 0 / 62%)",
                    }}
                  >
                    {HTMLReactParser(product.description)}
                  </p>
                </div>
              </Tab>
              <Tab
                eventKey="Review"
                title={
                  <span
                    style={{
                      textAlign: "start",
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#000000",
                    }}
                  >
                    Review
                  </span>
                }
              >
                <div className="p-3">
                  <Row className="review">
                    <h1
                      style={{
                        textAlign: "start",
                        fontSize: "45px",
                        fontWeight: "600",
                        color: "#000000",
                        margin: "60px 0px",
                      }}
                    >
                      All Reviews
                    </h1>
                    {product.reviews.length === 0 && (
                      <Message>No Reviews</Message>
                    )}
                    {product.reviews.map((review) => (
                      <Col className="d-flex gap-2 my-2" lg={3} md={6} sm={12}>
                        <ListGroup.Item
                          key={review.id}
                          className="card"
                          style={{
                            width: "100%",
                            padding: "10px 5px",
                            boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
                            borderRadius: "30px",
                            marginBottom: "10px",
                          }}
                        >
                          <Rating value={review.rating} />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              style={{ fontSize: "18px", fontWeight: "600" }}
                            >
                              {review.name}
                            </h5>
                            <p
                              className="card-text"
                              style={{
                                fontSize: "14px",
                                fontWeight: "500",
                                color: "#0000009c",
                              }}
                            >
                              {review.comment}
                            </p>
                            <p
                              className="card-text"
                              style={{
                                fontSize: "12px",
                                fontWeight: "300",
                                color: "#0000009c",
                              }}
                            >
                              Posted on: {review.createdAt.substring(0, 10)}
                            </p>
                          </div>
                        </ListGroup.Item>
                      </Col>
                    ))}
                    <hr className="hr hr-blurry mt-3" />

                    <h1
                      style={{
                        textAlign: "start",
                        fontSize: "45px",
                        fontWeight: "600",
                        color: "#000000",
                        margin: "60px 0px",
                      }}
                    >
                      Write a Customer Review
                    </h1>
                    <ListGroup.Item>
                      {loadingProductReview && <Loader />}

                      {userInfo ? (
                        <Form onSubmit={submitHandler}>
                          <Form.Group className="" controlId="rating">
                            <Form.Label
                              style={{
                                textAlign: "start",
                                fontSize: "25px",
                                fontWeight: "600",
                                color: "#000000",
                              }}
                            >
                              Rating
                            </Form.Label>
                            <Form.Control
                              style={{
                                border: "1px solid gray",
                                width: "200px",
                                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 15px",
                                background: "rgb(0 0 0 / 0.9%)",
                                borderRadius: "15px",
                              }}
                              as="select"
                              required
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group className="my-2" controlId="comment">
                            <Form.Label
                              style={{
                                textAlign: "start",
                                fontSize: "25px",
                                fontWeight: "600",
                                color: "#000000",
                              }}
                            >
                              Comment
                            </Form.Label>
                            <Form.Control
                              as="textarea"
                              maxLength={200}
                              row="3"
                              required
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            >
                              <small className="text-muted">
                                Remaining characters: {200 - comment.length}
                              </small>
                            </Form.Control>
                          </Form.Group>
                          <Button
                            disabled={loadingProductReview}
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
                              padding: "10px 20px",
                              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                            }}
                          >
                            Submit
                          </Button>
                        </Form>
                      ) : (
                        <Message>
                          Please <Link to="/login">sign in</Link> to write a
                          review
                        </Message>
                      )}
                    </ListGroup.Item>
                  </Row>
                </div>
              </Tab>
              <Tab
                eventKey="FQA"
                title={
                  <span
                    style={{
                      textAlign: "start",
                      fontSize: "20px",
                      fontWeight: "500",
                      color: "#000000",
                    }}
                  >
                    FQA
                  </span>
                }
              >
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
                    Frequently Questioned Answers
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
                          All the products that are uploaded on our website have
                          their warranty period clearly displayed on the product
                          page. Whether it be local or international warranty,
                          we will help you claim it through our offices in
                          Karachi, Lahore & Islamabad. So don't worry, we will
                          be committed with you throughout the warranty period
                          of your product.
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
                          Regarding returns, we can only entertain you if there
                          is a real defect in a few days of your purchase for
                          which the chances are extremely slim. You can avail
                          our 7 day return policy subject to terms and
                          conditions. Our products are genuine and authentic. We
                          highly recommend our customers to visit our offices in
                          Karachi, Lahore or Islamabad and check your product
                          before paying for your own satisfaction.
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Tab>
            </Tabs>

            <hr className="hr hr-blurry" />

            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              You might also like
            </h1>
            <Row>
              {data.products.slice(0, 4).map((product) => (
                <Col
                  className="newArrivalResponsive"
                  // key={product._id}
                  sm={12}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "60px 0px",
              }}
            >
              <Link to="/product" style={{ color: "#000000" }}>
                <Button
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
                  View All
                </Button>
              </Link>
            </div>

            <hr className="hr hr-blurry" />
          </div>
        </>
      )}
    </>
  );
};

export default ProductScreen;

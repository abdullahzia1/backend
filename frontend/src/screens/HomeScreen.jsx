import { Row, Col, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import ShopButton from "../components/ShopButton";
import Category from "../components/Category";
import ReviewHomepage from "../components/ReviewHomepage";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      <ProductCarousel />

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Container>
            <Meta />
            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              New Arrivals
            </h1>
            <Row>
              {data.products.slice(0, 4).map((product) => (
                <Col
                className="newArrivalResponsive"
                  key={product._id}
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
              <ShopButton />
            </div>

            <hr className="hr hr-blurry" />

            <div style={{ margin: "60px 0px" }}>
              <Category />
            </div>
            <h1
              style={{
                textAlign: "center",
                fontSize: "45px",
                fontWeight: "600",
                color: "#000000",
                margin: "60px 0px",
              }}
            >
              OUR HAPPY CUSTOMERS
            </h1>
            <ReviewHomepage />
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </Container>
        </>
      )}
    </>
  );
};

export default HomeScreen;

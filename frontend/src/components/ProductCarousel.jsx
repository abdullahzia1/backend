// Import necessary dependencies
import Message from "./Message"; // Component for displaying error messages
import { useGetTopProductsQuery } from "../slices/productsApiSlice"; // Custom hook for fetching top products
import banner1 from "../assets/images/banner1.png"; // Import product banner images
import banner2 from "../assets/images/banner2.png";
import banner3 from "../assets/images/banner3.png";
import banner4 from "../assets/images/banner4.png";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import "swiper/css"; // Import Swiper CSS
import "swiper/css/pagination"; // Import Swiper pagination CSS
import "../assets/styles/swiper.css"; // Import custom Swiper styles
import { Autoplay, Navigation, Pagination } from "swiper/modules"; // Import Swiper modules for autoplay, navigation, and pagination
import ShopButton from "./ShopButton"; // Import button component for shopping

// Define ProductCarousel component
const ProductCarousel = () => {
  // Fetch top products using custom hook
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  // Render loading spinner, error message, or carousel
  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <>
      {/* Render Swiper carousel */}
      <div style={{ height: "84vh", backgroundColor: "#F2F0F1" }}>
        {/* Initialize Swiper component with specified configurations */}
        <Swiper
          style={{ width: "100%", height: "100%" }}
          slidesPerView={"auto"}
          spaceBetween={30}
          centeredSlides={true}
          effect={"creative"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          speed={1000}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="mySwiper"
        >
          {/* Render individual slides for each product */}
          <SwiperSlide>
            {/* Content of the first slide */}
            <div className="container text-center">
              <div className="row">
                {/* Product information */}
                <div className="col-lg-6 col-md-12 col-sm-12 my-auto animate-from-top">
                  {/* Product heading */}
                  <p
                    className="headingbanner"
                    style={{
                      fontSize: "70px",
                      fontWeight: "900",
                      color: "#000",
                      marginTop: "20px",
                      textAlign: "start",
                    }}
                  >
                    Laptop Collection
                  </p>
                  {/* Additional product details */}
                  <p
                    className="secondbanner"
                    style={{
                      fontSize: "40px",
                      fontWeight: "300",
                      color: "#ffff",
                      textAlign: "center",
                      border: "1px Solid black",
                      background: "black",
                      display: "inline-block",
                      padding: "0px 10px",
                    }}
                  >
                    New PC Collection
                  </p>
                  {/* Description */}
                  <p
                    className="thirdbanner"
                    style={{
                      fontSize: "26px",
                      fontWeight: "300",
                      color: "#000",
                      textAlign: "start",
                    }}
                  >
                    An exciting place for the whole family! to shop.
                  </p>
                  {/* Button for shopping */}
                  <ShopButton />
                </div>
                {/* Product banner image */}
                <div className="col-lg-6 col-md-12 col-sm-12  animate-from-bottom">
                  <img
                    src={banner1}
                    alt=""
                    style={{ objectFit: "fit", width: "70%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 my-auto animate-from-top">
                  <p
                    className="headingbanner"
                    style={{
                      fontSize: "70px",
                      fontWeight: "900",
                      color: "#000",
                      marginTop: "20px",
                      textAlign: "start",
                    }}
                  >
                    New collection
                  </p>
                  <p
                    className="secondbanner"
                    style={{
                      fontSize: "40px",
                      fontWeight: "300",
                      color: "#ffff",
                      textAlign: "center",
                      border: "1px Solid black",
                      background: "black",
                      display: "inline-block",
                      padding: "0px 10px",
                    }}
                  >
                    New Headphone collection
                  </p>
                  <p
                    className="thirdbanner"
                    style={{
                      fontSize: "26px",
                      fontWeight: "300",
                      color: "#000",
                      textAlign: "start",
                    }}
                  >
                    An exciting place for the whole family! to shop.
                  </p>
                  <ShopButton />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12  animate-from-bottom">
                  <img
                    src={banner2}
                    alt=""
                    style={{ objectFit: "fit", width: "70%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 my-auto animate-from-top">
                  <p
                    className="headingbanner"
                    style={{
                      fontSize: "70px",
                      fontWeight: "900",
                      color: "#000",
                      marginTop: "20px",
                      textAlign: "start",
                    }}
                  >
                    Flash Sale
                  </p>
                  <p
                    className="secondbanner"
                    style={{
                      fontSize: "40px",
                      fontWeight: "300",
                      color: "#ffff",
                      textAlign: "center",
                      border: "1px Solid black",
                      background: "black",
                      display: "inline-block",
                      padding: "0px 10px",
                    }}
                  >
                    New Accessories collection
                  </p>
                  <p
                    className="thirdbanner"
                    style={{
                      fontSize: "26px",
                      fontWeight: "300",
                      color: "#000",
                      textAlign: "start",
                    }}
                  >
                    An exciting place for the whole family! to shop.
                  </p>
                  <ShopButton />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12  animate-from-bottom">
                  <img
                    src={banner3}
                    alt=""
                    style={{ objectFit: "fit", width: "70%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="container text-center">
              <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 my-auto animate-from-top">
                  <p
                    className="headingbanner"
                    style={{
                      fontSize: "70px",
                      fontWeight: "900",
                      color: "#000",
                      marginTop: "20px",
                      textAlign: "start",
                    }}
                  >
                    New collection
                  </p>
                  <p
                    className="secondbanner"
                    style={{
                      fontSize: "40px",
                      fontWeight: "300",
                      color: "#ffff",
                      textAlign: "center",
                      border: "1px Solid black",
                      background: "black",
                      display: "inline-block",
                      padding: "0px 10px",
                    }}
                  >
                    New EarBuds Collection
                  </p>
                  <p
                    className="thirdbanner"
                    style={{
                      fontSize: "26px",
                      fontWeight: "300",
                      color: "#000",
                      textAlign: "start",
                    }}
                  >
                    An exciting place for the whole family! to shop.
                  </p>
                  <ShopButton />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12  animate-from-bottom">
                  <img
                    src={banner4}
                    alt=""
                    style={{ objectFit: "fit", width: "70%", height: "100%" }}
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default ProductCarousel;

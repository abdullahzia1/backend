import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Rating from "./Rating";

const ReviewHomepage = () => {
  return (
    <>
      <Swiper
        style={{
          width: "100%",
          height: "100%",
          margin: "20px 0px",
        }}
        slidesPerView={3}
        spaceBetween={20}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          310: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        className="mySwiper"
        modules={[Navigation, Autoplay, Pagination]}
      >
        {/* Your slides go here */}

        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={5} text={`10 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Usman Ali
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "These headphones are incredible! Amazing sound quality,
                comfortable fit, and stylish design. Perfect for music lovers on
                the go."
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Additional slides go here */}
        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={4} text={`24 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Hamza Hassan
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "Impressive earphones! Great sound, snug fit, and tangle-free
                cord. Perfect for workouts and daily commutes."
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={4} text={`20 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Manahil Saif
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "Love these earphones! Clear audio, comfortable to wear, and durable build.
                Ideal for music on the move."
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={5} text={`30 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Amna Ismail
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "Outstanding laptop! Lightning-fast performance, stunning display, and sleek design. Perfect for work and play."
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={3} text={`10 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Eishal Abbas
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "So beautiful so elegant just looking like a Wow! These headphones are a game-changer. Clear sound, comfy fit"
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={4} text={`20 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Naila Faraz
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "Outstanding laptop! Lightning-fast performance, stunning display, and sleek design. Perfect for work and play."
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide style={{ backgroundColor: "#ffffff" }}>
          <div
            className="card"
            style={{
              width: "500px",
              padding: "15px 5px",
              boxShadow: "rgba(0, 0, 0, 0.09) 0px 3px 12px",
              borderRadius: "30px",
            }}
          >
            <Rating value={5} text={`12 reviews`} />
            <div className="card-body">
              <h5
                className="card-title"
                style={{ fontSize: "20px", fontWeight: "600" }}
              >
                Sarah M.
              </h5>
              <p
                className="card-text"
                style={{
                  fontSize: "13px",
                  fontWeight: "300",
                  color: "#0000009c",
                }}
              >
                "I'm blown away by the quality and style of the clothes I
                received from Shop.co.”
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ReviewHomepage;

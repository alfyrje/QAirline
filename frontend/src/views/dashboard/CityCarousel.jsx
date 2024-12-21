import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import "./cityCarousel.css";
const CityCarousel = () => {
  const navigate = useNavigate();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 0,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 0,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 0,
    },
  };

  const newsItems = [
    { id: 1, title: "Tokyo", image: "/images_new/1.jpg" },
    { id: 2, title: "Osaka", image: "/images_new/2.jpg" },
    { id: 3, title: "Hiroshima", image: "/images_new/3.jpg" },
    { id: 4, title: "Nagoya", image: "/images_new/4.jpg" },
    { id: 5, title: "Sendai", image: "/images_new/5.jpg" },
  ];

  return (
    <>
      <div className="cityCarouselContainer">
        <div className="cityCarouselTextIntroduction">Khám phá</div>
        <div
          style={{
            // margin: "0 auto",
            // marginTop: "10rem",
            // marginBottom: "10rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            padding: "0px",
            width: "100%",
          }}
        >
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={3000}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            removeArrowOnDeviceType={["tablet", "mobile"]}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            partialVisible={true}
          >
            {newsItems.map((item) => (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/dashboard/cityIntroduction/${item.title}`)
                } // Navigate dynamically
                style={{
                  background: "#f5f5f5",
                  borderRadius: "8px",
                  padding: "1rem",
                  textAlign: "center",
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "20rem",
                    borderRadius: "8px",
                    marginBottom: "1rem",
                  }}
                />
                <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
                  {item.title}
                </h3>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default CityCarousel;

import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useNavigate } from "react-router-dom";


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
    { 
      id: 1, 
      title: "Kyoto", 
      description: "Brief description for news item 1", 
      image: "/images_new/1.jpg" ,
      link: "/cityIntroduction/Kyoto"
      
    },
    { 
      id: 2, 
      title: "Osaka", 
      description: "Brief description for news item 2", 
      image: "/images_new/2.jpg" ,
      link: "./cityIntroduction/Osaka"
    },
    { 
      id: 3, 
      title: "Hiroshima", 
      description: "Brief description for news item 3", 
      image: "/images_new/3.jpg" ,
      link: "./cityIntroduction/Hiroshima"
    },
    { 
      id: 4, 
      title: "Nagoya", 
      description: "Brief description for news item 4", 
      image: "/images_new/4.jpg" ,
      link: "./cityIntroduction/Nagoya"
    },
    { 
      id: 5, 
      title: "Sendai", 
      description: "Brief description for news item 5", 
      image: "/images_new/5.jpg" ,
      link: "./cityIntroduction/Sendai"
    },
  ];

  return (
    <div
      style={{
        margin: "0 auto",
        marginTop: "10rem",
        marginBottom: "10rem",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        maxWidth: "80rem",
        padding: "0px",
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
            onClick={() => navigate(item.link)}
            style={{
              background: "#f5f5f5",
              borderRadius: "8px",
              padding: "1rem",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
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
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>{item.title}</h3>
            <p style={{ fontSize: "1rem", color: "#666" }}>{item.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CityCarousel;

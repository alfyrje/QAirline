import React from 'react';
import ReactCardSlider from 'react-card-slider-component';

const CardSlider = () => {
  const slides = [
    {
      image: "https://picsum.photos/200/300",
      title: "This is a title",
      description: "This is a description",
      clickEvent: () => console.log("Card 1 clicked"),
    },
    {
      image: "https://picsum.photos/600/500",
      title: "This is a second title",
      description: "This is a second description",
      clickEvent: () => console.log("Card 2 clicked"),
    },
    {
      image: "https://picsum.photos/700/600",
      title: "This is a third title",
      description: "This is a third description",
      clickEvent: () => console.log("Card 3 clicked"),
    },
    {
      image: "https://picsum.photos/500/400",
      title: "This is a fourth title",
      description: "This is a fourth description",
      clickEvent: () => console.log("Card 4 clicked"),
    },
    {
      image: "https://picsum.photos/200/300",
      title: "This is a fifth title",
      description: "This is a fifth description",
      clickEvent: () => console.log("Card 5 clicked"),
    },
    {
      image: "https://picsum.photos/800/700",
      title: "This is a sixth title",
      description: "This is a sixth description",
      clickEvent: () => console.log("Card 6 clicked"),
    },
    {
      image: "https://picsum.photos/300/400",
      title: "This is a seventh title",
      description: "This is a seventh description",
      clickEvent: () => console.log("Card 7 clicked"),
    },
  ];
  return (
    <div style={{ 
      margin: "0 auto",
      marginTop: "10rem",
      marginBottom: "10rem",
      display: "flex",
      justifyContent: "center", 
      alignItems: "center",    
      flexDirection: "column",
      maxWidth: "85rem", 
      padding: "0px" }}>
      <ReactCardSlider slides={slides} />
    </div>
  );
};

export default CardSlider;

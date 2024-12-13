import React from "react";
import "./promoteCard.css";

const PromoteCard = ({ image, title, subtitle, buttonText }) => {
  return (
    <div className="promo-card">
      <img src={image} alt={title} className="promo-card-image" />
      <div className="promo-card-content">
        <h2 className="promo-title">{title}</h2>
        <p className="promo-subtitle">{subtitle}</p>
      </div>
    </div>
  );
};

export default PromoteCard;

import React from "react";
import "./promoteCard.css";

const PromoteCard = ({ image, title, subtitle, buttonText }) => {
  return (
    <div className="promo-card">
      <div className="promo-image-container">
        <img src={image} alt={title} className="promo-card-image" />
      </div>
      <div className="promo-content-container">
        <div className="promo-title">{title}</div>
        <span>
        <span className="voucher-text">Mã giảm: </span>
        <span className = 'promo-subtitle'>{subtitle} </span>
        </span>
      </div>
    </div>
  );
};

export default PromoteCard;

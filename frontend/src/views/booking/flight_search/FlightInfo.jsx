import React from 'react';
import './FlightInfo.css';

const FlightInfo = () => {
  return (
    <div className="flight-info-card">
      <div className="route">
        <span className="airport">HAN</span>
        <span className="arrow">✈</span>
        <span className="airport">SGN</span>
      </div>
      <div className="details">
        <div>
          <span className="label">Khởi hành</span>
          <span>CN, 17 thg 11</span>
        </div>
        <div>
          <span className="label">Trở về</span>
          <span>Th 4, 18 thg 12</span>
        </div>
        <div>
          <span className="label">Hành khách</span>
          <span>1 🧑</span>
        </div>
      </div>
    </div>
  );
};

export default FlightInfo;
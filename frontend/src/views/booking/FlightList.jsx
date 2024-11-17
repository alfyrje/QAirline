import React from 'react';
import './FlightCard.css';

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const day = date.getDate(); 
  const month = date.getMonth(); 
  const year = date.getFullYear().toString().slice(2);
  const hours = date.getHours().toString().padStart(2, '0'); 
  const minutes = date.getMinutes().toString().padStart(2, '0'); 

  return `${hours}:${minutes}`;
};

const formatDuration = (durationInSeconds) => {
  const days = Math.floor(durationInSeconds / (24 * 3600));
  const hours = Math.floor((durationInSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);

  let formattedDuration = '';
  if (days > 0) {
    formattedDuration += `${days} ngày `;
  }
  if (hours > 0) {
    formattedDuration += `${hours} giờ `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes} phút`;
  }

  if (formattedDuration === '') {
    formattedDuration = `${minutes} phút`;
  }

  return formattedDuration.trim();
};

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-details">
        <div className="flight-info">
          <div className="location-time">
            <div className="time">{formatDate(flight.start_time)}</div>
            <div className="location">{flight.start_location}</div>
          </div>
          <span>Bay thẳng</span>
          <div className="location-time">
            <div className="time">{formatDate(flight.end_time)}</div>
            <div className="location">{flight.end_location}</div>
          </div>
        </div>
        <div className="additional-info">
          <p>⏱ Thời gian bay: {formatDuration(flight.duration)}</p>
          <p>✈️ Số hiệu: {flight.code} </p>
        </div>
      </div>

      <div className="prices">
        <div className="price economy">
          <span>{flight.economic_seats_left} chỗ còn lại</span>
          <p>Economy</p>
          <p>từ {formatPrice(flight.economic_price)}</p>
        </div>
        <div className="price business">
          <span>{flight.business_seats_left} chỗ còn lại</span>
          <p>Business</p>
          <p>từ {formatPrice(flight.business_price)}</p>
        </div>
      </div>
    </div>
  );
};

const FlightList = ({ flights }) => {
  if (flights.length === 0) {
    return (
      <p>
        No flights available.
      </p>
    )
  }
  return (
    <div className="flight-list">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
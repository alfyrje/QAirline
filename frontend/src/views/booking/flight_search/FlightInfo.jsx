import React from 'react';
import './FlightInfo.css';

const formatDate = (dateStr) => {
  if (!dateStr) return 'Invalid date';

  const date = new Date(dateStr);
  if (isNaN(date)) {
    console.error(`Invalid date value: ${dateStr}`);
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('vi-VN', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  }).format(date);
};

const FlightInfo = ({ flight }) => {
  return (
    <div className="flight-info-card">
      <div className="route">
        <span className="airport">{flight.start_location}</span>
        <span className="arrow">✈</span>
        <span className="airport">{flight.end_location}</span>
      </div>
      <div className="details">
        <div>
          <span className="label">Khởi hành</span>
          <span>{formatDate(flight.start_time)}</span>
        </div>
        {flight.return_time &&
          (<div>
            <span className="label">Trở về</span>
            <span>{formatDate(flight.return_time)}</span>
          </div>)}
        <div>
          <span className="label">Hành khách</span>
          <span>{flight.passengers_no} 🧑</span>
        </div>
        {flight.seat_class &&
          (<div>
            <span className="label">Hạng</span>
            <span>{flight.seat_class === 'E' ? 'Phổ thông' : flight.seat_class === 'B' ? 'Thương gia' : 'Khác'}</span>
          </div>)}
      </div>
    </div>
  );
};

export default FlightInfo;
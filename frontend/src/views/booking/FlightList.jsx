import React from 'react';
import './FlightCard.css';

const flights = [
  {
    id: 1,
    startTime: '06:35',
    endTime: '08:45',
    startLocation: 'HAN',
    endLocation: 'SGN',
    duration: '2h 10min',
    flightNumber: 'QH 203',
    airline: 'Bamboo Airways',
    economyPrice: '1,732,000 VND',
    businessPrice: '4,051,000 VND',
    economySeatsLeft: 1,
    businessSeatsLeft: 1,
  },
];

const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-details">
        <div className="time">
          <p>{flight.startTime}</p>
          <span>Bay thẳng</span>
          <p>{flight.endTime}</p>
        </div>
        <div className="locations">
          <p>{flight.startLocation}<br />Nhà ga 1</p>
          <p>{flight.endLocation}<br />Nhà ga 1</p>
        </div>
        <div className="additional-info">
          <p>⏱ Thời gian bay {flight.duration}</p>
          <p>✈️ {flight.flightNumber} được {flight.airline} khai thác</p>
          <a href="#">Xem chi tiết hành trình</a>
        </div>
      </div>

      <div className="prices">
        <div className="price economy">
          <span>{flight.economySeatsLeft} chỗ còn lại</span>
          <p>Economy</p>
          <p>từ {flight.economyPrice}</p>
        </div>
        <div className="price business">
          <span>{flight.businessSeatsLeft} chỗ còn lại</span>
          <p>Business</p>
          <p>từ {flight.businessPrice}</p>
        </div>
      </div>
    </div>
  );
};

const FlightList = () => {
  return (
    <div className="flight-list">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingInfo.css";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import FlightInfo from "../flight_search/FlightInfo";
import "../flight_search/FlightInfo.css";
import ProgressBar from "../ProgressBar";
import ImageSeparator from "../../partials/ImageSeparator";

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return "Invalid date";
  const date = new Date(dateStr);
  if (isNaN(date)) {
    console.error(`Invalid date value: ${dateStr}`);
    return "Invalid date";
  }
  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(date);
};

const formatDuration = (durationInSeconds) => {
  const days = Math.floor(durationInSeconds / (24 * 3600));
  const hours = Math.floor((durationInSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);

  let formattedDuration = "";
  if (days > 0) {
    formattedDuration += `${days} ngày `;
  }
  if (hours > 0) {
    formattedDuration += `${hours} giờ `;
  }
  if (minutes > 0) {
    formattedDuration += `${minutes} phút`;
  }

  if (formattedDuration === "") {
    formattedDuration = `${minutes} phút`;
  }

  return formattedDuration.trim();
};

const BookingCard = ({ flight, seatClass }) => {
  return (
    <div className="booking-card">
      <div className="flight-details">
        <div className="flight-info">
          <div className="location-time">
            <div className="time">{formatTime(flight.start_time)}</div>
            <div className="location">{flight.start_location}</div>
          </div>
          <span>Bay thẳng</span>
          <div className="location-time">
            <div className="time">{formatTime(flight.end_time)}</div>
            <div className="location">{flight.end_location}</div>
          </div>
        </div>
        <div className="additional-info">
          <p>
            {formatDate(flight.start_time)} - {formatDate(flight.end_time)}
          </p>
          <p>⏱ Thời gian bay: {formatDuration(flight.duration)}</p>
          <p>✈️ Số hiệu: {flight.code}</p>
        </div>
      </div>
      <div
        className={
          seatClass === "E" ? "selected-seat economy" : "selected-seat business"
        }
      >
        <p>Chỗ ngồi đã chọn: {seatClass === "E" ? "Economy" : "Business"}</p>
        <p>
          Giá:{" "}
          {seatClass === "E"
            ? formatPrice(flight.economic_price)
            : formatPrice(flight.business_price)}
        </p>
      </div>
    </div>
  );
};

const BookingInfo = () => {
  const { state } = useLocation();
  const selectedFlights = state?.selectedFlights || [];
  const flight = state?.flight;
  const navigate = useNavigate();
  const calculateIndividualPrice = () => {
    return selectedFlights.reduce((total, selectedFlight) => {
      const price =
        selectedFlight.seatClass === "E"
          ? selectedFlight.flight.economic_price
          : selectedFlight.flight.business_price;
      return total + price;
    }, 0);
  };
  const totalPrice = calculateIndividualPrice() * flight.passengers_no;
  const handleNavigate = () => {
    navigate("/seat-select", {
      state: { selectedFlights: selectedFlights, flight: flight },
    });
  };

  return (
    <>
      <Header />
      <ImageSeparator imagePath="/images/gigapixel-bg3(1).png"/>
      <div className="booking-info-container">
        <ProgressBar currentStep="info" />
        <div className="booking-header">
          <h1>Các chuyến bay của bạn</h1>
          <div className="booking-info-btn-primary-wrapper">
            <button className="btn btn-primary" onClick={() => navigate(-1)}>
              Quay lại
            </button>
          </div>
        </div>
        <div className="booking-info-wrapper">
          <FlightInfo flight={flight} />
          <div className="booking-cards">
            {selectedFlights.map((flight, index) => {
              const seatClass = flight.seatClass;
              return (
                <BookingCard
                  key={index}
                  flight={flight.flight}
                  seatClass={seatClass}
                />
              );
            })}
          </div>
          <div className="total-price-section">
            <p className="total-price">Tổng giá: {formatPrice(totalPrice)}</p>
            <button className="btn btn-primary" onClick={handleNavigate}>
              Chọn chỗ ngồi
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingInfo;

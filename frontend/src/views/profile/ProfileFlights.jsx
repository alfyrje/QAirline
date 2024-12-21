import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./profile.css";
import "./profile2.css";

const formatDateTime = (djangoDateTime) => {
  const date = new Date(djangoDateTime);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day}/${month}/${year}`;
};

const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffInHours = (end - start) / (1000 * 60 * 60);
  return Math.round(diffInHours);
};

function ProfileFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/flights/tickets-history/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tickets history");
        }
        return response.json();
      })
      .then((data) => {
        setFlights(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  const handleCancel = async (ticketId, startTime) => {
    const currentTime = new Date();
    const departureTime = new Date(startTime);
    const timeDifference = (departureTime - currentTime) / (1000 * 60 * 60);

    if (timeDifference < 2) {
      Swal.fire({
        icon: "error",
        title: "Không thể hủy vé",
        text: "Bạn chỉ có thể hủy vé tối đa 2 giờ trước khi chuyến bay khởi hành.",
      });
      return;
    }

    Swal.fire({
      title: "Bạn có chắc chắn muốn hủy vé không?",
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, hủy vé!",
      cancelButtonText: "Không, giữ lại",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8000/flights/tickets-history/`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              },
              credentials: "include", // Important for CSRF
              body: JSON.stringify({
                action: "cancel",
                ticketId: ticketId,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to cancel ticket");
          }

          // Remove the cancelled ticket from UI
          setFlights((prevFlights) =>
            prevFlights.filter((flight) => flight.id !== ticketId)
          );

          // Show success message and navigate
          Swal.fire({
            icon: "success",
            title: "Hủy vé thành công!",
            text: "Vé của bạn đã được hủy thành công.",
          }).then(() => {
            navigate("/cancellation-success");
          });
        } catch (error) {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Đã xảy ra lỗi khi hủy vé. Vui lòng thử lại.",
          });
        }
      }
    });
  };

  const toggleDetails = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="profile-content">
        <div className="profile-flights-header">Danh sách vé đã đặt</div>
        <div className="profile-flights-content">
          <div className="flight-cards-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              flights.map((ticket, index) => (
                <div key={index} className="flight-card">
                  <div className="flight-header">
                    <div className="flight-code">Vé #{ticket.ticket_code}</div>
                    <div className="flight-status">
                      Hoãn: {ticket.flight.delay_status} giờ
                    </div>
                  </div>

                  <div className="flight-details">
                    <div className="time-location-container">
                      <div className="departure">
                        <div className="time">
                          {formatDateTime(ticket.flight.start_time)}
                        </div>
                        <div className="location">
                          {ticket.flight.start_location}
                        </div>
                      </div>

                      <div className="flight-duration">
                        <div className="duration-line">
                          <span className="duration-text">
                            Thời gian bay:{" "}
                            {calculateDuration(
                              ticket.flight.start_time,
                              ticket.flight.end_time
                            )}{" "}
                            giờ
                          </span>
                        </div>
                      </div>

                      <div className="arrival">
                        <div className="time">
                          {formatDateTime(ticket.flight.end_time)}
                        </div>
                        <div className="location">
                          {ticket.flight.end_location}
                        </div>
                      </div>
                    </div>

                    <div className="flight-info-profile">
                      <div className="passenger-details">
                        <div className="info-group">
                          <span className="label">Họ tên:</span>
                          <span className="value">
                            {ticket.passenger_info.first_name}{" "}
                            {ticket.passenger_info.last_name}
                          </span>
                        </div>
                        <div className="info-group">
                          <span className="label">CCCD:</span>
                          <span className="value">
                            {ticket.passenger_info.citizen_id}
                          </span>
                        </div>
                        <div className="info-group">
                          <span className="label">Ghế:</span>
                          <span className="value">{ticket.seat}</span>
                        </div>
                        <div className="info-group">
                          <span className="label">Hạng vé:</span>
                          <span className="value">{ticket.ticket_class}</span>
                        </div>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button
                        className="details-button"
                        onClick={() => toggleDetails(index)}
                      >
                        {expandedCards[index] ? "Ẩn chi tiết" : "Xem chi tiết"}
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() =>
                          handleCancel(ticket.id, ticket.flight.start_time)
                        }
                      >
                        Hủy vé
                      </button>
                    </div>
                    {expandedCards[index] && (
                      <div className="expanded-details">
                        <div className="expanded-details-content">
                          <div className="passenger-info-section">
                            <h3>Thông tin hành khách</h3>
                            <div className="info-grid">
                              <div className="info-item">
                                <span className="info-label">Họ tên:</span>
                                <span className="info-value">
                                  {ticket.passenger_info.first_name}{" "}
                                  {ticket.passenger_info.last_name}
                                </span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Ngày sinh:</span>
                                <span className="info-value">
                                  {ticket.passenger_info.date_of_birth}
                                </span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">CCCD:</span>
                                <span className="info-value">
                                  {ticket.passenger_info.citizen_id}
                                </span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Quốc tịch:</span>
                                <span className="info-value">
                                  {ticket.passenger_info.nationality}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="expanded-details-content">
                          <h3>Thông tin vé</h3>
                          <div className="info-grid">
                            <div className="info-item">
                              <span className="info-label">
                                Mã chuyến bay:{" "}
                              </span>
                              <span className="info-value">
                                {ticket.flight.code}
                              </span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Giá vé: </span>
                              <span className="info-value">
                                {ticket.price} đồng
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileFlights;

import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import "./profile.css";

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
        "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load tickets history");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
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

    const timeDifference = (departureTime - currentTime) / (1000 * 60 * 60); // Convert to hours
    if (timeDifference < 2) {
      alert(
        "Bạn chỉ có thể hủy vé tối đa 2 giờ trước khi chuyến bay khởi hành."
      );
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8000/flights/tickets-history/",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            action: "cancel",
            ticketId: ticketId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to cancel ticket");
      }
      setFlights(flights.filter((flight) => flight.ticket_id !== ticketId));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const confirmCancel = (ticketId, startTime) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn hủy vé không?',
      text: "Bạn sẽ không thể hoàn tác hành động này!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Có, hủy vé!',
      cancelButtonText: 'Không, giữ lại'
    }).then((result) => {
      if (result.isConfirmed) {
        handleCancel(ticketId, startTime);
        Swal.fire(
          'Đã hủy!',
          'Vé của bạn đã được hủy.',
          'success'
        )
      }
    })
  };

  const toggleDetails = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  return (
    <>
      <div className="profile-content">
        <div className="profile-flights-header">Lịch sử chuyến bay</div>
        <div className="profile-flights-content">
          <div className="flight-cards-container">
            {loading ? (
              <p>Loading...</p>
            ) : (
              flights.map((ticket, index) => (
                <div key={index} className="flight-card">
                  <div className="flight-header">
                    <div className="flight-code">Vé số #{ticket.flight.code}</div>
                    <div className="flight-status">{ticket.flight.delay_status}</div>
                  </div>
                  
                  <div className="flight-details">
                    <div className="time-location-container">
                      <div className="departure">
                        <div className="time">{ticket.flight.start_time}</div>
                        <div className="location">{ticket.flight.start_location}</div>
                      </div>

                      <div className="flight-duration">
                        <div className="duration-line">
                          <span className="duration-text">7h</span>
                        </div>
                      </div>

                      <div className="arrival">
                        <div className="time">{ticket.flight.end_time}</div>
                        <div className="location">{ticket.flight.end_location}</div>
                      </div>
                    </div>

                    <div className="flight-info">
                      <div className="passenger-details">
                        <div className="info-group">
                          <span className="label">Họ tên:</span>
                          <span className="value">{ticket.passenger_info.first_name} {ticket.passenger_info.last_name}</span>
                        </div>
                        <div className="info-group">
                          <span className="label">CCCD:</span>
                          <span className="value">{ticket.passenger_info.citizen_id}</span>
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
                        {expandedCards[index] ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                      </button>
                      <button 
                        className="cancel-button"
                        onClick={() => confirmCancel(ticket.ticket_id, ticket.flight.start_time)}
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
                                <span className="info-value">{ticket.passenger_info.first_name} {ticket.passenger_info.last_name}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Số điện thoại:</span>
                                <span className="info-value">{ticket.passenger_info.tel_num}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Ngày sinh:</span>
                                <span className="info-value">{ticket.passenger_info.date_of_birth}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">CCCD:</span>
                                <span className="info-value">{ticket.passenger_info.citizen_id}</span>
                              </div>
                              <div className="info-item">
                                <span className="info-label">Quốc tịch:</span>
                                <span className="info-value">{ticket.passenger_info.nationality}</span>
                              </div>
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
};

export default ProfileFlights;

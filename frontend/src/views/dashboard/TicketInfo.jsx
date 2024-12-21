import React, { useState, useEffect } from "react";
import "./ticketInfo.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import ImageSeparator from "../partials/ImageSeparator";

const NewsCard = ({ title, content, createdAt }) => {
  return (
    <div className="news-card">
      <div className="news-card-content">
        <div className="news-card-subtitle">
          <span>{new Date(createdAt).toLocaleString()}</span>
        </div>
        <h2 className="news-card-title">{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
};
const formatDateTime = (djangoDateTime) => {
  const date = new Date(djangoDateTime);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  return `${hours}:${minutes} ${day}/${month}/${year}`;
};
const calculateDuration = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const diffInHours = (end - start) / (1000 * 60 * 60);
  return Math.round(diffInHours);
};
const TicketInfo = () => {
  const [searchParams, setSearchParams] = useState({
    ticket_code: "",
    flight_code: "",
  });
  const [ticketData, setTicketData] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [passengerData, setPassengerData] = useState(null);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/flights/search-tickets/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'same-origin',
          body: JSON.stringify(searchParams),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setTicketData(data[0]);
          setMessage("");
        } else {
          setTicketData(null);
          setMessage("Không tìm thấy vé với thông tin này");
        }
      } else {
        setTicketData(null);
        setMessage("Đã xảy ra lỗi khi tìm kiếm vé");
      }
    } catch (error) {
      setTicketData(null);
      setMessage("Đã xảy ra lỗi khi tìm kiếm vé");
    }
  };

  const handleCancel = async (ticketId, startTime) => {
    const currentTime = new Date();
    const departureTime = new Date(startTime);

    const timeDifference = (departureTime - currentTime) / (1000 * 60 * 60);
    if (timeDifference < 2) {
      alert("Bạn chỉ có thể hủy vé tối đa 2 giờ trước khi chuyến bay khởi hành.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/flights/initiate-cancel/${ticketId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": document.cookie.split('csrftoken=')[1]?.split(';')[0] || '',
          },
          credentials: 'include', // Important for CSRF
          body: JSON.stringify({ ticket_id: ticketId }),
        }
      );

      if (response.ok) {
        setMessage("Email xác nhận hủy vé đã được gửi tới mail của bạn.");
      } else {
        setMessage("Có lỗi xảy ra khi hủy vé.");
      }
    } catch (error) {
      setMessage("Đã có lỗi xảy ra khi hủy vé.");
    }
  };

  const toggleDetails = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };
  const fetchNews = async () => {
    try {
      const response = await fetch("http://localhost:8000/adminapp/api/news/");
      if (response.ok) {
        const data = await response.json();
        setNews(data);
      } else {
        console.error("Failed to fetch news");
      }
    } catch (error) {
      console.error("An error occurred while fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);
  const totalPages = Math.ceil(news.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = news.slice(startIndex, endIndex);

  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="ticket-info-container">
      <Header />
            <ImageSeparator imagePath="/separator/separator_travel_info.jpg" />
      
      <div className="ticket-info-wrapper">
        <div className="ticket-info-header">Tìm vé</div>
        <form className="ticket-info-form">
          <label htmlFor="flight-id">Mã chuyến bay:</label>
          <input
            type="text"
            id="flight-code"
            name="flight_code"
            onChange={handleChange}
          />

          <label htmlFor="ticket-code">Mã vé: </label>
          <input
            type="text"
            id="ticket-code"
            name="ticket_code"
            onChange={handleChange}
          />


          <button
            type="button"
            className="ticket-info-button"
            onClick={handleSearch}
          >
          </button>
        </form>

        {message && <div className="ticket-info-message">{message}</div>}

        {loading ? (
          <p>Loading...</p>
        ) : (
          ticketData && (
            <div className="flight-cards-container">
              <div className="flight-card">
                <div className="flight-header">
                  <div className="flight-code">Vé #{ticketData.ticket_code}</div>
                  <div className="flight-status">Hoãn: {ticketData.flight.delay_status} giờ</div>
                </div>
                
                <div className="flight-details">
                  <div className="time-location-container">
                    <div className="departure">
                      <div className="time">{formatDateTime(ticketData.flight.start_time)}</div>
                      <div className="location">{ticketData.flight.start_location}</div>
                    </div>

                    <div className="flight-duration">
                      <div className="duration-line">
                        <span className="duration-text">
                          Thời gian bay: {calculateDuration(ticketData.flight.start_time, ticketData.flight.end_time)} giờ
                        </span>
                      </div>
                    </div>

                    <div className="arrival">
                      <div className="time">{formatDateTime(ticketData.flight.end_time)}</div>
                      <div className="location">{ticketData.flight.end_location}</div>
                    </div>
                  </div>

                  <div className="flight-info-profile">
                    <div className="passenger-details">
                      <div className="info-group">
                        <span className="label">Họ tên:</span>
                        <span className="value">
                          {ticketData.passenger_info.first_name} {ticketData.passenger_info.last_name}
                        </span>
                      </div>
                      <div className="info-group">
                        <span className="label">CCCD:</span>
                        <span className="value">{ticketData.passenger_info.citizen_id}</span>
                      </div>
                      <div className="info-group">
                        <span className="label">Ghế:</span>
                        <span className="value">{ticketData.seat}</span>
                      </div>
                      <div className="info-group">
                        <span className="label">Hạng vé:</span>
                        <span className="value">{ticketData.ticket_class}</span>
                      </div>
                    </div>
                  </div>

                  <div className="action-buttons">
                    <button 
                      className="details-button"
                      onClick={() => toggleDetails(0)}
                    >
                      {expandedCards[0] ? 'Ẩn chi tiết' : 'Xem chi tiết'}
                    </button>
                    <button 
                      className="cancel-button"
                      onClick={() => handleCancel(ticketData.id, ticketData.flight.start_time)}
                    >
                      Hủy vé
                    </button>
                  </div>

                  {expandedCards[0] && (
                    <div className="expanded-details">
                      <div className="expanded-details-content">
                        <div className="passenger-info-section">
                          <h3>Thông tin hành khách</h3>
                          <div className="info-grid">
                            <div className="info-item">
                              <span className="info-label">Họ tên:</span>
                              <span className="info-value">
                                {ticketData.passenger_info.first_name} {ticketData.passenger_info.last_name}
                              </span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Ngày sinh:</span>
                              <span className="info-value">{ticketData.passenger_info.date_of_birth}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">CCCD:</span>
                              <span className="info-value">{ticketData.passenger_info.citizen_id}</span>
                            </div>
                            <div className="info-item">
                              <span className="info-label">Quốc tịch:</span>
                              <span className="info-value">{ticketData.passenger_info.nationality}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="expanded-details-content">
                        <h3>Thông tin vé</h3>
                        <div className="info-grid">
                          <div className="info-item">
                            <span className="info-label">Mã chuyến bay: </span>
                            <span className="info-value">{ticketData.flight.code}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Giá vé: </span>
                            <span className="info-value">{ticketData.price} đồng</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    
      {/* <div className="news-list">
          <h2>Thông báo về chuyến bay</h2>
          <div className="news-list-content">
          {currentItems.length > 0 ? (
            currentItems.map((newsItem) => (
              <NewsCard
                key={newsItem.id}
                title={newsItem.title}
                content={newsItem.content}
                createdAt={newsItem.created_at}
              />
            ))
          ) : (
            <p>No news available</p>
          )}
          </div>
        </div> */}
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
            <img src="/icons/previous.png" alt="Previous Page" />
          </button>
          <span>
            Trang {currentPage} of {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
            <img src="/icons/next.png" alt="Next Page" />
          </button>
        </div>
      <Footer />
    </section>
  );
};

export default TicketInfo;
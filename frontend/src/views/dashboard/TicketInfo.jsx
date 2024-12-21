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

const TicketInfo = () => {
  const [searchParams, setSearchParams] = useState({
    flight_code: "",
    citizen_id: "",
    seat: "",
    ticket_class: "",
  });
  const [ticketData, setTicketData] = useState(null);
  const [passengerData, setPassengerData] = useState(null);
  const [message, setMessage] = useState("");
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
          body: JSON.stringify(searchParams),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          const ticket = data[0].ticket_info; // Adjusted to match the nested structure
          const passenger = data[0].passenger_info; // Adjusted to match the nested structure
          const flight = data[0].flight; // You can use this if needed
          setTicketData(ticket);
          setPassengerData(passenger);
          setMessage("");
        } else {
          setTicketData(null);
          setPassengerData(null);
          setMessage("No ticket found");
        }
      } else if (response.status === 404) {
        setTicketData(null);
        setPassengerData(null);
        setMessage("No ticket found");
      } else {
        setTicketData(null);
        setPassengerData(null);
        setMessage("An error occurred while searching for the ticket");
      }
    } catch (error) {
      setTicketData(null);
      setPassengerData(null);
      setMessage("An error occurred while searching for the ticket");
    }
  };

  const handleCancel = async (ticketId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/flights/initiate-cancel/${ticketId}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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

        {ticketData && (
          <div className="ticket-result-list">
            <div className="ticket-result-list-header">
              <div className="ticket-column">Mã chuyến bay</div>
              <div className="ticket-column">Ghế ngồi</div>
              <div className="ticket-column">Hạng</div>
              <div className="ticket-column">Số CCCD</div>
            </div>
            <div className="ticket-result-list-body">
              <div className="ticket-result-row">
                <div className="ticket-column">{ticketData.seat}</div>
                <div className="ticket-column">{ticketData.ticket_class}</div>
                <div className="ticket-column">{`${passengerData.first_name} ${passengerData.last_name}`}</div>
                <div className="ticket-column">{passengerData.citizen_id}</div>
                <div className="ticket-column">
                  <button
                    className="ticket-info-cancel-button"
                    onClick={() => handleCancel(ticketData.id)}
                  >
                    Yêu cầu hủy vé
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    
      <div className="news-list">
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
        </div>
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
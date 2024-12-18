import React, { useState } from "react";
import "./ticketInfo.css";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
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
        console.log(data)
        console.log(data[0].ticket_info.id)
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
        setMessage("A confirmation email has been sent to your email address.");
      } else {
        setMessage("Failed to initiate cancellation.");
      }
    } catch (error) {
      setMessage("An error occurred while initiating the cancellation.");
    }
  };

  return (
    <section className="ticket-info-container">
      <Header />
      <div className="ticket-info-wrapper">
        <div className="ticket-info-header">Search for Tickets</div>
        <form className="ticket-info-form">
          <label htmlFor="flight-id">Flight ID:</label>
          <input
            type="text"
            id="flight-code"
            name="flight_code"
            onChange={handleChange}
          />

          <label htmlFor="citizen-id">Citizen ID:</label>
          <input
            type="text"
            id="citizen-id"
            name="citizen_id"
            onChange={handleChange}
          />

          <label htmlFor="seat">Seat:</label>
          <input type="text" id="seat" name="seat" onChange={handleChange} />

          <label htmlFor="ticket-class">Ticket Class:</label>
          <input
            type="text"
            id="ticket-class"
            name="ticket_class"
            onChange={handleChange}
          />

          <button
            type="button"
            className="ticket-info-button"
            onClick={handleSearch}
          ></button>
        </form>

        {message && <div className="ticket-info-message">{message}</div>}

        {ticketData && (
          <div className="ticket-result-list">
            <div className="ticket-result-list-header">
              <div className="ticket-column">Flight ID</div>
              <div className="ticket-column">Seat</div>
              <div className="ticket-column">Class</div>
              <div className="ticket-column">Passenger Name</div>
              <div className="ticket-column">Citizen ID</div>
              <div className="ticket-column">Actions</div>
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
                  ></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
};

export default TicketInfo;

import React, { useState } from "react";
import "./discount.css";

const TicketSearch = () => {
  const [searchParams, setSearchParams] = useState({
    flightName: "",
    passengerId: "",
    seat: "",
    ticketClass: "",
  });
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({ ...searchParams, [name]: value });
  };

  const handleSearch = () => {
    const mockTicketDatabase = [
      {
        flightName: "Flight 123",
        passengerId: "P001",
        seat: "12A",
        ticketClass: "Economy",
      },
      {
        flightName: "Flight 456",
        passengerId: "P002",
        seat: "5B",
        ticketClass: "Business",
      },
    ];

    const foundTicket = mockTicketDatabase.find(
      (t) =>
        t.flightName === searchParams.flightName &&
        t.passengerId === searchParams.passengerId &&
        t.seat === searchParams.seat &&
        t.ticketClass === searchParams.ticketClass
    );

    if (foundTicket) {
      setTicket(foundTicket);
      setMessage("");
    } else {
      setTicket(null);
      setMessage("No ticket found");
    }
  };

  const handleCancel = () => {
    setTicket(null);
    setMessage("Ticket canceled successfully");
  };

  return (
    <div className="ticket-search-container">
      <h2>Search and Cancel Ticket</h2>
      <div className="ticket-search-form">
        <input
          type="text"
          name="flightName"
          placeholder="Flight Name"
          value={searchParams.flightName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="passengerId"
          placeholder="Passenger ID"
          value={searchParams.passengerId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="seat"
          placeholder="Seat"
          value={searchParams.seat}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="ticketClass"
          placeholder="Ticket Class"
          value={searchParams.ticketClass}
          onChange={handleInputChange}
        />
        <button onClick={handleSearch} className="search-button">
          Search
        </button>
      </div>

      {message && <p className="message">{message}</p>}

      {ticket && (
        <div className="ticket-row">
          <p><strong>Flight Name:</strong> {ticket.flightName}</p>
          <p><strong>Passenger ID:</strong> {ticket.passengerId}</p>
          <p><strong>Seat:</strong> {ticket.seat}</p>
          <p><strong>Ticket Class:</strong> {ticket.ticketClass}</p>
          <button onClick={handleCancel} className="cancel-button">
            Cancel Ticket
          </button>
        </div>
      )}
    </div>
  );
};

export default TicketSearch;
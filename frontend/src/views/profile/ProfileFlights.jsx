import React, { useState, useEffect, useRef } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { useParams, Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../store/auth";
import { register } from "../../utils/auth";

import "./profile.css";

function ProfileFlights() {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/flights/tickets-history", {
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

    // Check if the difference between current time and departure time is less than 2 hours
    const timeDifference = (departureTime - currentTime) / (1000 * 60 * 60); // Convert to hours
    if (timeDifference < 2) {
      alert(
        "You can only cancel your ticket at least 2 hours before the flight starts."
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

  return (
    <>
      <div className="profile-content">
        <div className="profile-flights-header">Lịch sử chuyến bay</div>
        <div className="profile-flights-content">
          <div className="profile-flights-search">
            <div className="profile-flights-search-date">
              <label htmlFor="date">Từ ngày</label>
              <input type="date"></input>
            </div>
            <div className="profile-flights-search-date">
              <label htmlFor="date">Đến ngày</label>
              <input type="date"></input>
            </div>
            <div className="profile-flights-search-date">
              <label htmlFor="date">Đến ngày</label>
              <input type="date"></input>
            </div>
            <div className="profile-flights-search-date">
              <label htmlFor="date">Đến ngày</label>
              <input type="date"></input>
            </div>
            <button className="profile-flights-search-button"></button>
          </div>
          <div className="profile-flights-list">
            <div className="profile-flights-list-header">
              <div className="profile-flights-list-row">
                <div className="profile-flights-column departure-time">Thời gian xuất phát</div>
                <div className="profile-flights-column arrival-time">Thời gian đến</div>
                <div className="profile-flights-column departure-location">
                  Địa điểm xuất phát
                </div>
                <div className="profile-flights-column arrival-location">Địa điểm đến</div>
                <div className="profile-flights-column passenger-info">Thông tin người bay</div>
                <div className="profile-flights-column ticket-info">Thông tin vé</div>
                <div className="profile-flights-column status">Trạng thái</div>
                <div className="profile-flights-column cancel">Hủy vé</div>

              </div>
            </div>
            <div className="profile-flights-list-body">
              {flights.map((ticket, index) => (
                <div key={index} className="profile-flights-list-row">
                  <div className="profile-flights-column departure-time">
                    {ticket.flight.start_time}
                  </div>
                  <div className="profile-flights-column arrival-time">
                    {ticket.flight.end_time}
                  </div>
                  <div className="profile-flights-column departure-location">
                    {ticket.flight.start_location}
                  </div>
                  <div className="profile-flights-column arrival-location">
                    {ticket.flight.end_location}
                  </div>
                  <div className="profile-flights-column passenger-info">
                    <p>
                      <strong>Name:</strong> {ticket.passenger_info.first_name}{" "}
                      {ticket.passenger_info.last_name}
                    </p>
                    <p>
                      <strong>Phone:</strong> {ticket.passenger_info.tel_num}
                    </p>
                    <p>
                      <strong>Date of Birth:</strong>{" "}
                      {ticket.passenger_info.date_of_birth}
                    </p>
                    <p>
                      <strong>Citizen ID:</strong>{" "}
                      {ticket.passenger_info.citizen_id}
                    </p>
                    <p>
                      <strong>Nationality:</strong>{" "}
                      {ticket.passenger_info.nationality}
                    </p>
                  </div>
                  <div className="profile-flights-column ticket-info">{`Ghế ${ticket.seat}, ${ticket.ticket_class}`}</div>
                  <div className="profile-flights-column status">{ticket.flight.delay_status}</div>
                  <div className="profile-flights-column cancel">
                    <button className="profile-flights-cancel-ticket-button"onClick={() => handleCancel(ticket.ticket_id, ticket.flight.start_time)}>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ProfileFlights;

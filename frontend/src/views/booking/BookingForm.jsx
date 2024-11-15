import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [seat, setSeat] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/tickets/', {
        booker: selectedPassenger.passenger_id,
        flight: selectedFlight.flight_id,
        seat,
        ticket_class: selectedFlight.class, // Assuming selectedFlight has class
      });
      alert('Ticket booked successfully');
    } catch (error) {
      console.error('Error booking ticket:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Booking for {selectedPassenger.first_name} {selectedPassenger.last_name}</h3>
      <label>
        Seat:
        <input
          type="text"
          value={seat}
          onChange={(e) => setSeat(e.target.value)}
          placeholder="Enter seat number"
        />
      </label>
      <button type="submit">Book Ticket</button>
    </form>
  );
};

export default BookingForm;
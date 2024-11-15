import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FlightSearchForm() {
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [date, setDate] = useState('');
  const [classType, setClassType] = useState('E');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const navigate = useNavigate();

    try {
      const response = await axios.get('http://localhost:8000/api/flights/', {
        params: {
          start_location: startLocation,
          end_location: endLocation,
          date: date,
          class: classType,
        },
      });
      setAvailableFlights(response.data);
      console.log(response)
      navigate('/select-passengers/');
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Start Location:
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
      </label>
      <label>
        End Location:
        <input
          type="text"
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Class:
        <select
          value={classType}
          onChange={(e) => setClassType(e.target.value)}
        >
          <option value="E">Economy</option>
          <option value="B">Business</option>
        </select>
      </label>
      <button type="submit">Search Flights</button>
    </form>
  );
};

export default FlightSearchForm;
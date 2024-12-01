import { useState } from 'react';

const FlightSearchForm = ({ onSearch, roundTrip }) => {
  const [form, setForm] = useState({
    start_location: '',
    end_location: '',
    start_time: '',
    return_time: '',
    passengers_no: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="start_location" value={form.start_location} onChange={handleChange} placeholder="Start Location" />
      <input name="end_location" value={form.end_location} onChange={handleChange} placeholder="End Location" />
      <input name="start_time" type="date" value={form.start_time} onChange={handleChange} />
      {roundTrip === true && (<input name="return_time" type="date" value={form.return_time} onChange={handleChange} />)}
      <input name="passengers_no" type="number" value={form.passengers_no} onChange={handleChange} />
      <button type="submit">Search Flights</button>
    </form>
  );
};

export default FlightSearchForm;
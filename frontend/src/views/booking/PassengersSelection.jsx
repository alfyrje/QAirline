import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PassengersSelection() {
  const [passengers, setPassengers] = useState([]);
  const [selectedPassenger, setSelected] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  useEffect(() => {
    const fetchPassengers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/passengers/?user_id=${userId}`);
        setPassengers(response.data);
        navigate('/book-ticket/');
      } catch (error) {
        console.error('Error fetching passengers:', error);
      }
    };

    if (!isAddingNew) {
      fetchPassengers();
    }
  }, [userId, isAddingNew]);

  const handlePassengerSelect = (passenger) => {
    setSelected(passenger);
    setSelectedPassenger(passenger);
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleNewPassengerSubmit = async (e) => {
    e.preventDefault();
    const newPassenger = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      date_of_birth: e.target.date_of_birth.value,
      gender: e.target.gender.value,
      // Include other required fields
    };
    try {
      const response = await axios.post('http://localhost:8000/api/passengers/create/', newPassenger);
      setSelected(response.data);
      setSelectedPassenger(response.data);
      setIsAddingNew(false); // Close the form
    } catch (error) {
      console.error('Error adding new passenger:', error);
    }
  };

  return (
    <div>
      {isAddingNew ? (
        <form onSubmit={handleNewPassengerSubmit}>
          <input name="first_name" placeholder="First Name" required />
          <input name="last_name" placeholder="Last Name" required />
          <input type="date" name="date_of_birth" required />
          <select name="gender" required>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
          <button type="submit">Save New Passenger</button>
        </form>
      ) : (
        <>
          <h3>Select Existing Passenger</h3>
          <ul>
            {passengers.map((passenger) => (
              <li key={passenger.passenger_id}>
                <button onClick={() => handlePassengerSelect(passenger)}>
                  {passenger.first_name} {passenger.last_name}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleAddNew}>Add New Passenger</button>
        </>
      )}
    </div>
  );
};

export default PassengersSelection;
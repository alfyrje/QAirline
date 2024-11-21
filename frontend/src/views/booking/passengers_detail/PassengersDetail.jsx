import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './PassengersDetail.css';

const PassengersDetail = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const passengersNo = state?.flight.passengers_no || 1;
    const selectedFlights = state?.selectedFlights || [];
    const [passengers, setPassengers] = useState(
        Array.from({ length: passengersNo }, () => ({
            firstName: '',
            lastName: '',
            telNum: '',
            dateOfBirth: '',
            citizenId: '',
            nationality: '',
            gender: 'O',
        }))
    );

    const handleChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedFlights = selectedFlights.map(obj => ({
            flightId: obj.flight.id, 
            seatClass: obj.seatClass  
        }));

        try {
            const response = await fetch('http://localhost:8000/flights/create-tickets/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    passengers: passengers,
                    flights: formattedFlights,
                }),
            });
            console.log(response)
            if (!response.ok) {
                throw new Error('Failed to create tickets');
            }

            //navigate('/confirmation');
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="passenger-details">
            <h1>Nhập thông tin hành khách</h1>
            <form onSubmit={handleSubmit}>
                {passengers.map((passenger, index) => (
                    <div key={index} className="passenger-form">
                        <h2>Hành khách {index + 1}</h2>
                        <input
                            type="text"
                            placeholder="Tên"
                            value={passenger.firstName}
                            onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Họ"
                            value={passenger.lastName}
                            onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            value={passenger.telNum}
                            onChange={(e) => handleChange(index, 'telNum', e.target.value)}
                            required
                        />
                        <input
                            type="date"
                            placeholder="Ngày sinh"
                            value={passenger.dateOfBirth}
                            onChange={(e) => handleChange(index, 'dateOfBirth', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="CMND/CCCD"
                            value={passenger.citizenId}
                            onChange={(e) => handleChange(index, 'citizenId', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Quốc tịch"
                            value={passenger.nationality}
                            onChange={(e) => handleChange(index, 'nationality', e.target.value)}
                            required
                        />
                        <select
                            value={passenger.gender}
                            onChange={(e) => handleChange(index, 'gender', e.target.value)}
                        >
                            <option value="M">Nam</option>
                            <option value="F">Nữ</option>
                            <option value="O">Khác</option>
                        </select>
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">Xác nhận</button>
            </form>
        </div>
    );
};

export default PassengersDetail;
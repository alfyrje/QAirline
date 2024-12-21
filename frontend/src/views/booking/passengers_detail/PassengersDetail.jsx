import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PassengersDetail.css";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import FlightInfo from "../flight_search/FlightInfo";
import Swal from "sweetalert2";
import ProgressBar from "../ProgressBar";

const PassengersDetail = () => {
    const { state } = useLocation();
    const flight = state?.flight;
    const passengersNo = state?.flight.passengers_no || 1;
    const selectedFlights = state?.selectedFlights || [];
    const navigate = useNavigate();

    const [passengers, setPassengers] = useState(
        Array.from({ length: passengersNo }, () => ({
            first_name: "",
            last_name: "",
            qr_email: "",
            date_of_birth: "",
            citizen_id: "",
            nationality: "",
            gender: "O",
            seats: selectedFlights.map(flightObj => ({
                flight_id: flightObj.flight.id,
                seat: ""
            }))
        }))
    );

    const [expandedCards, setExpandedCards] = useState(
        Array.from({ length: passengersNo }, () => true)
    );

    const handleChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const handleSeatChange = (passengerIndex, flight_id, seat) => {
        const updatedPassengers = [...passengers];
        const seatIndex = updatedPassengers[passengerIndex].seats.findIndex(s => s.flight_id === flight_id);
        if (seatIndex !== -1) {
            updatedPassengers[passengerIndex].seats[seatIndex].seat = seat;
        }
        setPassengers(updatedPassengers);
    };

    const toggleCard = (index) => {
        const updatedExpandedCards = [...expandedCards];
        updatedExpandedCards[index] = !updatedExpandedCards[index];
        setExpandedCards(updatedExpandedCards);
    };

    const allSeatsSelected = passengers.every(passenger =>
        passenger.seats.every(seat => seat.seat)
    );

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!allSeatsSelected) {
            Swal.fire({
                icon: "warning",
                title: "Chưa chọn đủ chỗ ngồi",
                text: "Vui lòng chọn đủ chỗ ngồi cho tất cả hành khách trước khi tiếp tục.",
            });
            return;
        }

        const formattedFlights = selectedFlights.map((obj) => ({
            flightId: obj.flight.id,
            seatClass: obj.seatClass,
        }));

        try {
            const response = await fetch("http://localhost:8000/flights/create-tickets/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    passengers: passengers,
                    flights: formattedFlights,
                    token: localStorage.getItem("access_token"),
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create tickets");
            }

            Swal.fire({
                icon: "success",
                title: "Thành công!",
                text: "Vé đã được tạo thành công!",
            }).then(() => {
                navigate("/dashboard");
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Thất bại!",
                text: "Không thể tạo vé. Vui lòng thử lại.",
            });
            console.error("Error:", error);
        }
    };

    const getSelectedSeats = (flight_id) => {
        return passengers.flatMap(passenger =>
            passenger.seats.filter(seat => seat.flight_id === flight_id && seat.seat).map(seat => seat.seat)
        );
    };

    const renderSeatButtons = (flight_id, passengerIndex) => {
        const seats = selectedFlights.find(flightObj => flightObj.flight.id === flight_id).selectedSeats;
        const selectedSeats = getSelectedSeats(flight_id);

        return seats.map(seat => {
            const isSelectedByCurrentPassenger = passengers[passengerIndex].seats.find(s => s.flight_id === flight_id)?.seat === seat;
            return (
                <button
                    key={seat}
                    type="button"
                    className={`seat-button ${isSelectedByCurrentPassenger ? 'selected' : ''}`}
                    disabled={selectedSeats.includes(seat) && !isSelectedByCurrentPassenger}
                    onClick={() => handleSeatChange(passengerIndex, flight_id, isSelectedByCurrentPassenger ? '' : seat)}
                >
                    {seat}
                </button>
            );
        });
    };

    return (
        <>
            <Header />
            <div className="passenger-details-container">
                <ProgressBar currentStep="passengers" />
                <div className="container passenger-details">

                    <div className="passenger-details">
                        <div className="booking-header">
                            <h1>Nhập thông tin hành khách</h1>
                            
                            <button className="btn btn-primary" onClick={() => navigate(-1)}>
                                Quay lại
                            </button>
                        </div>
                        <FlightInfo flight={flight} />
                        <form onSubmit={handleSubmit}>
                            {passengers.map((passenger, index) => (
                                <div key={index} className="passenger-form">
                                    <div
                                        className="passenger-header"
                                        onClick={() => toggleCard(index)}
                                    >
                                        <h2>Hành khách {index + 1}</h2>
                                        <button type="button">
                                            {expandedCards[index] ? "−" : "+"}
                                        </button>
                                    </div>
                                    <div
                                        className={`passenger-body ${expandedCards[index] ? "active" : ""}`}
                                    >
                                        <fieldset className="gender-group">
                                            <legend>Giới tính*</legend>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`gender_${index}`}
                                                    value="M"
                                                    checked={passenger.gender === 'M'}
                                                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                                                />
                                                Nam
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`gender_${index}`}
                                                    value="F"
                                                    checked={passenger.gender === 'F'}
                                                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                                                />
                                                Nữ
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    name={`gender_${index}`}
                                                    value="O"
                                                    checked={passenger.gender === 'O'}
                                                    onChange={(e) => handleChange(index, 'gender', e.target.value)}
                                                />
                                                Khác
                                            </label>
                                        </fieldset>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id={`first_name_${index}`}
                                                placeholder=""
                                                value={passenger.first_name}
                                                onChange={(e) =>
                                                    handleChange(index, "first_name", e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor={`first_name_${index}`}>Tên*</label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id={`last_name_${index}`}
                                                placeholder=""
                                                value={passenger.last_name}
                                                onChange={(e) =>
                                                    handleChange(index, "last_name", e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor={`last_name_${index}`}>Họ*</label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id={`qr_email_${index}`}
                                                placeholder=""
                                                value={passenger.qr_email}
                                                onChange={(e) =>
                                                    handleChange(index, "qr_email", e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor={`qr_email_${index}`}>Email*</label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="date"
                                                id={`date_of_birth_${index}`}
                                                placeholder=""
                                                value={passenger.date_of_birth}
                                                onChange={(e) =>
                                                    handleChange(index, "date_of_birth", e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor={`date_of_birth_${index}`}>Ngày sinh*</label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id={`citizen_id_${index}`}
                                                placeholder=""
                                                value={passenger.citizen_id}
                                                onChange={(e) =>
                                                    handleChange(index, "citizen_id", e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor={`citizen_id_${index}`}>CMND/CCCD*</label>
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                id={`nationality_${index}`}
                                                placeholder=""
                                                value={passenger.nationality}
                                                onChange={(e) =>
                                                    handleChange(index, "nationality", e.target.value)
                                                }
                                                required
                                            />
                                            <label htmlFor={`nationality_${index}`}>Quốc tịch*</label>
                                        </div>
                                        {selectedFlights.map(({ flight }) => (
                                            <div key={flight.id} className="seat-selection">
                                                Chọn chỗ ngồi cho chuyến bay <b>{flight.code}</b>
                                                <div className="seat-buttons">
                                                    {renderSeatButtons(flight.id, index)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div className="submit-button">
                                <button type="submit" className="btn confirm">
                                    Khám phá 
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PassengersDetail;
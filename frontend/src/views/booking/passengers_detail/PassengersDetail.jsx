import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PassengersDetail.css";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import FlightInfo from "../flight_search/FlightInfo";
import Swal from "sweetalert2";

const PassengersDetail = () => {
    const { state } = useLocation();
    const flight = state?.flight;
    const passengersNo = state?.flight.passengers_no || 1;
    const selectedFlights = state?.selectedFlights || [];
    const navigate = useNavigate();

    // Initialize passengers state
    const [passengers, setPassengers] = useState(
        Array.from({ length: passengersNo }, () => ({
            first_name: "",
            last_name: "",
            // tel_num: "",
            date_of_birth: "",
            citizen_id: "",
            nationality: "",
            gender: "O",
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

    const toggleCard = (index) => {
        const updatedExpandedCards = [...expandedCards];
        updatedExpandedCards[index] = !updatedExpandedCards[index];
        setExpandedCards(updatedExpandedCards);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

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

    return (
        <>
            <Header />
            <div className="container passenger-details">
                <div className="passenger-details">
                    <FlightInfo flight={flight} />
                    <h1>Nhập thông tin hành khách</h1>
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
                                    className={`passenger-body ${expandedCards[index] ? "active" : ""
                                        }`}
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
                                            type="tel"
                                            id={`tel_num_${index}`}
                                            placeholder=""
                                            value={passenger.tel_num}
                                            onChange={(e) =>
                                                handleChange(index, "tel_num", e.target.value)
                                            }
                                            required
                                        />
                                        <label htmlFor={`tel_num_${index}`}>Số điện thoại*</label>
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
                                            id={`citized_id_${index}`}
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
                                </div>
                            </div>
                        ))}
                        <div className="submit-button">
                            <button type="submit" className="btn confirm">
                                Đặt vé
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PassengersDetail;
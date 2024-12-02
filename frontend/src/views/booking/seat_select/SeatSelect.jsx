import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import { useState, useEffect } from 'react';
import './SeatSelect.css';
import FlightInfo from '../flight_search/FlightInfo';
import SeatMap from './SeatMap';
import ProgressBar from '../ProgressBar';
import axios from 'axios';

const SeatSelect = () => {
    const { state } = useLocation();
    const flight = state?.flight;
    const passengersNo = Number(state?.flight.passengers_no) || 1;
    const selectedFlights = state?.selectedFlights || [];
    const navigate = useNavigate();

    const [selectedSeats, setSelectedSeats] = useState({});
    const [bookedSeats, setBookedSeats] = useState({});

    useEffect(() => {
        const fetchBookedSeats = async () => {
            try {
                const flightIds = selectedFlights.map(flightObj => flightObj.flight.id);
                const response = await axios.post('http://localhost:8000/flights/booked-seats/', { flight_ids: flightIds });
                setBookedSeats(response.data);
            } catch (error) {
                console.error('Error fetching booked seats:', error);
            }
        };

        fetchBookedSeats();
    }, [selectedFlights]);

    const handleSeatSelection = (flightId, seat) => {
        setSelectedSeats((prev) => {
            const currentFlightSeats = prev[flightId] || [];
            if (currentFlightSeats.includes(seat)) {
                console.log('unselecting seat', seat, flightId);
                return {
                    ...prev,
                    [flightId]: currentFlightSeats.filter((s) => s !== seat),
                };
            }
            if (currentFlightSeats.length < passengersNo && !bookedSeats[flightId]?.includes(seat)) {
                console.log('selecting seat', seat, flightId);
                return {
                    ...prev,
                    [flightId]: [...currentFlightSeats, seat],
                };
            }
            console.log('cannot select seat', seat, flightId);
            return prev;
        });
    };

    const allSeatsSelected = selectedFlights.every((flightObj, index) => {
        return (selectedSeats[flightObj.flight.id]?.length || 0) === passengersNo;
    });

    const handleNavigate = () => {
        const updatedSelectedFlights = selectedFlights.map((flightObj) => ({
            ...flightObj,
            selectedSeats: selectedSeats[flightObj.flight.id] || [],
        }));
        navigate("/passengers-detail", { state: { selectedFlights: updatedSelectedFlights, flight: flight } });
    };

    return (
        <>
            <Header />
            <div className='container seat-select'>
                <ProgressBar currentStep="seats" />
                <div className='booking-header'>
                    <h1>Lựa chọn ghế ngồi</h1>
                    <button className='btn btn-primary' onClick={() => navigate(-1)}>Quay lại</button>
                </div>
                <FlightInfo flight={flight} />
                <div className="seat-map-list">
                    {selectedFlights.map(({ flight, seatClass }, index) => (
                        <div className='seat-map-card' key={flight.id}>
                            <div className='flight-info-wrapper'>
                                <FlightInfo flight={{ ...flight, seat_class: seatClass, passengers_no: passengersNo }} />
                            </div>
                            <div className='seat-map'>
                                <SeatMap
                                    flightId={flight.id}
                                    seatClass={seatClass}
                                    passengersNo={passengersNo}
                                    onSeatSelect={handleSeatSelection}
                                    selectedSeats={selectedSeats[flight.id] || []}
                                    bookedSeats={bookedSeats[flight.id] || []}
                                />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='passengers-detail-navigation'>
                    <button
                        className="btn btn-primary"
                        onClick={handleNavigate}
                        disabled={!allSeatsSelected}>
                        Điền thông tin hành khách
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default SeatSelect;
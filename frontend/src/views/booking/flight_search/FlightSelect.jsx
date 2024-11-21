import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './FlightSelect.css'
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import FlightList from "./FlightList";
import FlightInfo from "./FlightInfo";

const FlightSelect = () => {
    const { state } = useLocation();
    const [flights, setFlights] = useState([]);
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [isReturnFlight, setIsReturnFlight] = useState(false);
    const navigate = useNavigate();
    const roundTrip = state?.roundTrip;
    const flight = state?.searchParams

    const handleSelectSeat = (selection) => {
        setSelectedFlights((prev) => [...prev, selection]);

        if (roundTrip && !isReturnFlight) {
            setIsReturnFlight(true);
          } else {
            navigate("/booking-info", { state: { selectedFlights: [...selectedFlights, selection], flight: flight } });
          }
    };

    useEffect(() => {
        if (!isReturnFlight && state?.searchParams) {
            axios
                .get("http://localhost:8000/flights/search-flights", {
                    params: state.searchParams,
                })
                .then((response) => setFlights(response.data))
                .catch((error) => console.error("Error fetching flights", error));
        } else if (isReturnFlight) {
            const returnParams = {
                start_location: state.searchParams.end_location,
                end_location: state.searchParams.start_location,
                start_time: state.searchParams.return_time,
            };

            axios
                .get("http://localhost:8000/flights/search-flights", {
                    params: returnParams,
                })
                .then((response) => setFlights(response.data))
                .catch((error) => console.error("Error fetching return flights", error));
        }
    }, [isReturnFlight, state]);

    return (
        <>
            <Header />
            <div className="container">
                <FlightInfo flight={state?.searchParams} />
                <FlightList flights={flights} onSelectSeat={handleSelectSeat} />
            </div>
            <Footer />
        </>
    );
};

export default FlightSelect;
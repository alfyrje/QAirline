import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './FlightSelect.css'
import FlightList from "./FlightList";

const FlightSelect = () => {
    const { state } = useLocation();
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        if (state?.searchParams) {
            axios.get("http://localhost:8000/flights/search-flights", { params: state.searchParams })
                .then(response => {setFlights(response.data); console.log(response)})
                .catch(error => console.error("Error fetching flights", error));
        }
    }, [state]);

    return (
        <>
            <div className="container">
                <FlightList flights={flights}/>
            </div>
        </>
    );
};

export default FlightSelect;
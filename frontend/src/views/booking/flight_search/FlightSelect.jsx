import { useLocation } from "react-router-dom";
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

    useEffect(() => {
        if (state?.searchParams) {
            axios.get("http://localhost:8000/flights/search-flights", { params: state.searchParams })
                .then(response => {setFlights(response.data); console.log(response)})
                .catch(error => console.error("Error fetching flights", error));
        }
        console.log(state?.searchParams)
    }, [state]);

    return (
        <>
            <Header/>
            <div className="container">
                <FlightInfo/>
                <FlightList flights={flights}/>
            </div>
            <Footer/>
        </>
    );
};

export default FlightSelect;
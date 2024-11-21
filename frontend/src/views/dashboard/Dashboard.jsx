import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
// import FlightSearchForm from "../booking/FlightSearchForm";
import "./dashboard.css"
import { FaLightbulb } from "react-icons/fa";
import BookingPart from "./BookingPart";
import CardSlider from "./CardSlider";
import NewsCarousel from "./NewsCarousel";
function Dashboard() {
    return (
        <>  
            <Header/>
            {/* <h1>Page content</h1> */}
            <BookingPart/>
            {/* <CardSlider/> */}
            <NewsCarousel/>
            <Footer/>
            {/* <CardSlider/> */}
        </>
    );
}

export default Dashboard;
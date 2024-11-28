import React from 'react';
import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
// import FlightSearchForm from "../booking/FlightSearchForm";
import "./dashboard.css"
import { FaLightbulb } from "react-icons/fa";
import BookingPart from "./BookingPart";
import CityCarousel from "./CityCarousel";
import PromoteLayout from "./PromoteLayout";

function Dashboard() {
    return (
        <>  
        <div className="dashboardContainer">
            <Header/>
            {/* <h1>Page content</h1> */}
            <BookingPart/>
            {/* <CardSlider/> */}
            <PromoteLayout/>
            <CityCarousel/>
            <Footer/>
            {/* <CardSlider/> */}
        </div>
        </>
    );
}

export default Dashboard;
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./views/auth/Register";
import LogIn from "./views/auth/Login";
import Dashboard from "./views/dashboard/Dashboard";
import Profile from "./views/profile/Profile";
import MainWrapper from "../src/layouts/MainWrapper";
import FlightSearchPage from "./views/booking/flight_search/FlightSearchPage"
import FlightSelect from "./views/booking/flight_search/FlightSelect"
import BookingInfo from "./views/booking/booking_info/BookingInfo";

function App() {
    return (
        <>
            <BrowserRouter>
                <MainWrapper>
                    <Routes>
                        {/* Authentication */}
                        <Route path="/register/" element={<Register />} />
                        <Route path="/login/" element={<LogIn />} />
                        <Route path="/profile/" element={<Profile />} />

                        {/* Dashboard */}
                        <Route path="/dashboard/" element={<Dashboard />} />

                        {/* Flight Search */}
                        <Route path="/flight-search/" element={<FlightSearchPage roundTrip={true} />} />

                        {/* Search Results */}
                        <Route path="/flight-select" element={<FlightSelect />} />

                        {/* Booking Info */}
                        <Route path="/booking-info" element={<BookingInfo />} />

                    </Routes>
                </MainWrapper>
            </BrowserRouter>
        </>
    );
}

export default App;
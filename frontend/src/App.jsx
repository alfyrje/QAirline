import React from 'react';
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
import CityPage from './views/dashboard/CityPage.jsx';
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import SeatSelect from "./views/booking/seat_select/SeatSelect";

const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn)();

    return loggedIn ? children : <Navigate to="/login/" />;
};
import PassengersDetail from "./views/booking/passengers_detail/PassengersDetail";

function App() {
    return (
        <>
            <div className='app-container'>

            </div>
            <BrowserRouter>
                <MainWrapper>
                    <Routes>
                        {/* Authentication */}
                        <Route path="/register/" element={<Register />} />
                        <Route path="/login/" element={<LogIn />} />
                        <Route path="/profile/" element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } />
                        <Route path="/dashboard/cityIntroduction/:city_name" element={<CityPage />} />
                        <Route path="/profile/" element={
                            <PrivateRoute>
                            <Profile />
                            </PrivateRoute>
                            } />

                        {/* Dashboard */}
                        <Route path="/dashboard/" element={<Dashboard />} />

                        {/* Flight Search */}
                        <Route path="/flight-search/" element={<FlightSearchPage roundTrip={true} />} />

                        {/* Search Results */}
                        <Route path="/flight-select" element={<FlightSelect />} />

                        {/* Seat Select */}
                        <Route path="/seat-select" element={<SeatSelect />} />

                        {/* Booking Info */}
                        <Route path="/booking-info"
                            element={
                                <PrivateRoute>
                                    <BookingInfo />
                                </PrivateRoute>
                            }
                        />
                        {/* Passengers Detail */}
                        <Route path="/passengers-detail"
                            element={
                                <PrivateRoute>
                                    <PassengersDetail />
                                </PrivateRoute>
                            }
                        />

                    </Routes>
                </MainWrapper>
            </BrowserRouter>
            <div>

            </div>
        </>
    );
}

export default App;
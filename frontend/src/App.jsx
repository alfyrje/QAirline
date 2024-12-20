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
import Discount from './views/dashboard/Discount';
import TicketInfo from './views/dashboard/TicketInfo';
import { Navigate } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import TravelInfo from './views/travel_info/TravelInfo.jsx';
import SeatSelect from "./views/booking/seat_select/SeatSelect";
import './index.css'
import CancellationSuccess from "./views/dashboard/CancellationSuccess";

import Sale from "./views/sales/Sale.jsx"
import InfoPost from "./views/travel_info/InfoPost";
import CityLayout from './views/cityLayout/CityLayout.jsx';
const PrivateRoute = ({ children }) => {
    const loggedIn = useAuthStore((state) => state.isLoggedIn);

    return loggedIn ? children : <Navigate to="/login/" />;
};
import PassengersDetail from "./views/booking/passengers_detail/PassengersDetail";
import { Disc } from 'lucide-react';

function App() {
    return (
        <>
            <div className='app-container'>

            </div>
            <BrowserRouter>
                <MainWrapper>
                    <Routes>
                        <Route path="/register/" element={<Register />} />
                        <Route path="/login/" element={<LogIn />} />
                        <Route path="/profile/" element={
                            <PrivateRoute>
                                <Profile />
                            </PrivateRoute>
                        } />
                        <Route path="/travel-info/:title" element={<InfoPost />} />
                        <Route path="/dashboard/cityIntroduction/:city_name" element={<CityPage />} />
                        <Route path="/dashboard/" element={<Dashboard />} />
                        <Route path="" element={<Dashboard />} />
                        <Route path="/travel-info/" element={<TravelInfo />} />
                        <Route path="/voucher" element={<Sale />} />
                        <Route path="/explore" element={<CityLayout />} />
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/discount" element={<Discount />} />
                        <Route path="/ticket-info" element={<TicketInfo />} />
                        <Route path="/flight-search/" element={<FlightSearchPage roundTrip={false} />} />
                        <Route path="/flight-select" element={<FlightSelect />} />
                        <Route path="/seat-select" element={<SeatSelect />} />
                        <Route path="cancellation-success" element={<CancellationSuccess />} />
                        <Route path="/booking-info" element={<BookingInfo />}/>
                        <Route path="/passengers-detail"element={<PassengersDetail />}/>
                    </Routes>
                </MainWrapper>
            </BrowserRouter>
            <div>

            </div>
        </>
    );
}

export default App;
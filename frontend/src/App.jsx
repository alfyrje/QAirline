import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./views/auth/Register";
import Dashboard from "./views/dashboard/Dashboard";
import MainWrapper from "../src/layouts/MainWrapper";
import BookingForm from "./views/booking/BookingForm"
import FlightSearchForm from "./views/booking/FlightSearchForm"
import PassengersSelection from "./views/booking/PassengersSelection"

function App() {
    return (
        <>
            <BrowserRouter>
                <MainWrapper>
                    <Routes>
                        {/* Authentication */}
                        <Route path="/register/" element={<Register />} />


                        {/* Dashboard */}
                        <Route path="/dashboard/" element={<Dashboard />} />

                        <Route path="/flight-search/" element={<FlightSearchForm />} />
                        <Route path="/passengers-select/" element={<PassengersSelection />} />
                        <Route path="/booking-form/" element={<BookingForm />} />
                    </Routes>
                </MainWrapper>
            </BrowserRouter>
        </>
    );
}

export default App;
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./views/auth/Register";
import LogIn from "./views/auth/Login";
import Dashboard from "./views/dashboard/Dashboard";
import Profile from "./views/profile/Profile";
import MainWrapper from "../src/layouts/MainWrapper";
import FlightSearchPage from "./views/booking/FlightSearchPage"
import FlightSelect from "./views/booking/FlightSelect"

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
                        {/* <Route path="/flight-search/" element={<FlightSearchPage />} /> */}

                        {/* Search Results */}
                        {/* <Route path="/flight-select" element={<FlightSelect />} /> */}

                    </Routes>
                </MainWrapper>
            </BrowserRouter>
            <div></div>
        </>
    );
}

export default App;
import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./views/auth/Register";
import Dashboard from "./views/dashboard/Dashboard";
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
                        <Route path="/register/" element={<Register     />} />


                        {/* Dashboard */}
                        <Route path="/dashboard/" element={<Dashboard />} />

                        {/* Flight Search */}
                        <Route path="/flight-search/" element={<FlightSearchPage />} />

                        {/* Search Results */}
                        <Route path="/flight-select" element={<FlightSelect />} />

                    </Routes>
                </MainWrapper>
            </BrowserRouter>
        </>
    );
}

export default App;
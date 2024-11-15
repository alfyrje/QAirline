import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./views/auth/Register";
import LogIn from "./views/auth/Login";
import Dashboard from "./views/dashboard/Dashboard";
import Profile from "./views/profile/Profile";

import MainWrapper from "../src/layouts/MainWrapper";
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
                    </Routes>
                </MainWrapper>
            </BrowserRouter>
        </>
    );
}

export default App;
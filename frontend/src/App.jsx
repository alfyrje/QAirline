import { useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Register from "./views/auth/Register";
import Dashboard from "./views/dashboard/Dashboard";
import "./App.css"
import "./index.css"

import MainWrapper from "../src/layouts/MainWrapper";
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
                    </Routes>
                </MainWrapper>
            </BrowserRouter>
        </>
    );
}

export default App;
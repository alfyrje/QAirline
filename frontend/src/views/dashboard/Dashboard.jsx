import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <>
            <Header />
            <h1>Page content</h1>
            <Footer />
        </>
    );
}

export default Dashboard;
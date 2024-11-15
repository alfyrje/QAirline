import { useState, useEffect } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import { Link } from "react-router-dom";
import "./dashboard.css"

function Dashboard() {
    return (
        <>  
        <body>
            <Header />
            {/* <h1>Page content</h1> */}
            
            <Footer />
            </body>
        </>
    );
}

export default Dashboard;
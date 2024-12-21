import React from "react";
import { Link } from "react-router-dom";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "./cancellationSuccess.css";

const CancellationSuccess = () => {
  return (
    <>
      <Header />
      <div className="cancellation-success-container">
        <h1 className="success-title">Hủy vé thành công</h1>
        <p className="success-message">
          Vé của bạn đã được hủy thành công. 
        </p>
        <Link to="/ticket-info" className="back-button">
          Quay lại trang vé của tôi
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default CancellationSuccess;
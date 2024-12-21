import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

const CancellationSuccess = () => {
  return (
    <>
      <Header />
      <div className="cancellation-success-container">
        <h1>Hủy vé thành công</h1>
        <p>Vé của bạn đã được hủy thành công.</p>
      </div>
      <Footer />
    </>
  );
};

export default CancellationSuccess;
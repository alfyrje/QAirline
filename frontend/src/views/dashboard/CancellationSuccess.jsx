import React from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";

const CancellationSuccess = () => {
  return (
    <>
      <Header />
      <div className="cancellation-success-container">
        <h1>Cancellation Successful</h1>
        <p>Your ticket has been successfully cancelled.</p>
      </div>
      <Footer />
    </>
  );
};

export default CancellationSuccess;
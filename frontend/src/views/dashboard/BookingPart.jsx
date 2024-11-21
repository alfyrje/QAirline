import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bookingPart.css";
import { FaLightbulb } from "react-icons/fa";

function BookingPart() {
  return (
    <>
      <header class="section__container header__container">
        <div class="header__image__container">
            {/* <img src = "/images/bg3.jpg"/> */}
          <div class="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book Hotels, Flights and stay packages at lowest price.</p>
          </div>
          <div class="booking__container">
            <form>
              <div class="form__group">
                <div class="input__group">
                  <input type="text" />
                  <label>Location</label>
                </div>
                <p>Where are you going?</p>
              </div>
              <div class="form__group">
                <div class="input__group">
                  <input type="text" />
                  <label>Check In</label>
                </div>
                <p>Add date</p>
              </div>
              <div class="form__group">
                <div class="input__group">
                  <input type="text" />
                  <label>Check Out</label>
                </div>
                <p>Add date</p>
              </div>
              <div class="form__group">
                <div class="input__group">
                  <input type="text" />
                  <label>Guests</label>
                </div>
                <p>Add guests</p>
              </div>
            </form>
            <button class="btn">
              <i class="ri-search-line"></i>
            </button>
          </div>
        </div>
      </header>
      <div></div>
    </>
  );
}

export default BookingPart;

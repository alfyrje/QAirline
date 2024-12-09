import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bookingPart.css";
import { FaLightbulb } from "react-icons/fa";

function BookingPart() {
  const handleInput = (e) => {
    if (e.target.value) {
      e.target.classList.add("has-value");
    } else {
      e.target.classList.remove("has-value");
    }
  };

  return (
    <>
      <header className="section__container header__container">
        <div className="header__image__container">
          {/* <img src = "/images/bg3.jpg"/> */}
          <div className="header__content">
            <h1>Enjoy Your Dream Vacation</h1>
            <p>Book Hotels, Flights and stay packages at lowest price.</p>
          </div>

          <div className="booking__container">
            <div className="first_row">
              <div className="radio_container">
                <div className="radio_item">
                <input className='radio_point' type="radio" name="tripType" value="oneWay" />
                <div className='radioText'>Một Chiều</div>
               </div>
                <div className="radio_item">
                <input className='radio_point' type="radio" name="tripType" value="roundTrip" />
                <div className='radioText'>Khứ Hồi</div>
                </div>
              </div>
            </div>
            <div className="second_row">
              <form>
                <div className="form__group">
                  <div className="input__group">
                    <input type="text" onInput={handleInput} />
                    <label>Từ</label>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <input type="text" onInput={handleInput} />
                    <label>Tới</label>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <input type="text" onInput={handleInput} />
                    <label>Ngày đi</label>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <input type="text" onInput={handleInput} />
                    <label>Hành khách</label>
                  </div>
                </div>
              </form>
              <div className="third_row">
                <div className = "sale_container">
                  <input placeholder="Mã giảm giá"></input>
                </div>
                
                <div className = "button_container">
                <button className="flight-search-btn">Tìm chuyến bay</button>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </header>
      <div></div>
    </>
  );
}

export default BookingPart;

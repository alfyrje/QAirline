import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingPart.css";
import { FaLightbulb } from "react-icons/fa";

function BookingPart() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tripType: "oneWay",
    start_location: "",
    end_location: "",
    start_time: "",
    return_time: "",
    passengers_no: "",
    discount_code: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (value) {
      e.target.classList.add("has-value");
    } else {
      e.target.classList.remove("has-value");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/flight-select", { state: { searchParams: form, roundTrip: form.tripType === "roundTrip" } });
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
                  <input className='radio_point' type="radio" name="tripType" value="oneWay" checked={form.tripType === "oneWay"} onChange={handleInput} />
                  <div className='radioText'>Một Chiều</div>
                </div>
                <div className="radio_item">
                  <input className='radio_point' type="radio" name="tripType" value="roundTrip" checked={form.tripType === "roundTrip"} onChange={handleInput} />
                  <div className='radioText'>Khứ Hồi</div>
                </div>
              </div>
            </div>
            <div className="second_row">
              <form onSubmit={handleSubmit}>
                <div className="form__group">
                  <div className="input__group">
                    <input type="text" name="start_location" value={form.start_location} onInput={handleInput} />
                    <label className="input__label">Từ</label>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <input type="text" name="end_location" value={form.end_location} onInput={handleInput} />
                    <label className="input__label">Tới</label>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <input type="date" name="start_time" value={form.start_time} onInput={handleInput} />
                    <label className="input__label">Ngày đi</label>
                  </div>
                </div>
                {form.tripType === "roundTrip" && (
                  <div className="form__group">
                    <div className="input__group">
                      <input type="date" name="return_time" value={form.return_time} onInput={handleInput} />
                      <label className="input__label">Ngày về</label>
                    </div>
                  </div>
                )}
                <div className="form__group">
                  <div className="input__group">
                    <input type="number" name="passengers_no" value={form.passengers_no} onInput={handleInput} />
                    <label className="input__label">Số hành khách</label>
                  </div>
                </div>
                <div className="third_row">
                  <div className="sale_container">
                    <input type="text" name="discount_code" value={form.discount_code} onInput={handleInput} placeholder="Mã giảm giá" />
                  </div>
                  <div className="button_container">
                    <button type="submit" className="flight-search-btn">Tìm chuyến bay</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>
      <div></div>
    </>
  );
}

export default BookingPart;
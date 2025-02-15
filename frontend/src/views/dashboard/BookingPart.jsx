import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./bookingPart.css";
import { FaLightbulb } from "react-icons/fa";
import React, { useMemo } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker"; // Change import
import "react-datepicker/dist/react-datepicker.css"; // Important!

function BookingPart() {
  const [originSelection, setOriginSelection] = useState([]);
  const [destinationSelection, setDestinationSelection] = useState([]);
  const [departDate, setDepartDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [tripType, setTripType] = useState("oneWay");
  const [options, setOptions] = useState([]);
  const [passengersNo, setPassengersNo] = useState(1);
  const navigate = useNavigate();
  const handleTripTypeChange = (e) => {
    setTripType(e.target.value);
  };

  const handlePassengersChange = (e) => {
    const value = e.target.value;
    const newValue = value === '' ? '' : Math.max(1, parseInt(value) || 1);
    setPassengersNo(newValue);
  };


  useEffect(() => {
    fetch('http://localhost:8000/flights/locations/')
      .then(response => response.json())
      .then(data => {
        const locationOptions = data.locations.map((location, index) => ({
          id: index + 1,
          name: location
        }));
        setOptions(locationOptions);
      })
      .catch(error => console.error('Error fetching locations:', error));
  }, []);


  const filterByStartsWith = (option, props) => {
    const labelKey = props.labelKey;
    const text = option[labelKey];
    const query = props.text;

    return text.toLowerCase().startsWith(query.toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const searchParams = {
      start_location: originSelection[0]?.name || '',
      end_location: destinationSelection[0]?.name || '',
      start_time: departDate.toISOString().split('T')[0],
      return_time: tripType === "roundTrip" ? returnDate.toISOString().split('T')[0] : '',
      passengers_no: passengersNo.toString()
    };

    navigate("/flight-select", {
      state: {
        searchParams: searchParams,
        roundTrip: tripType === "roundTrip"
      }
    });
  };

  return (
    <>
      <header className="section__container header__container">
        <div className="header__image__container">
          <div className="header__content">
            <h1>Enjoy Your Dream Flight</h1>
          </div>

          <div className="booking__container_responsive">
            <div className="booking-row">
              <div className="radio-group">
                <label>
                  <input type="radio" name="trip-type" value="one-way" /> Một
                  chiều
                </label>
                <label>
                  <input
                    type="radio"
                    name="trip-type"
                    value="round-trip"
                    checked
                  />
                  Khứ hồi
                </label>
              </div>
            </div>
            <div className="booking-row">
              <div className="flight-element">
                <label for="input-field">Từ</label>
                <input type="text" id="from-control" />
              </div>
            </div>
            <div className="booking-row">
              <div className="flight-element">
                <label for="input-field">Tới</label>
                <input type="text" id="to" />
              </div>
            </div>

            <div className="booking-row">
              <div className="flight-element-date">
                <div className="date-container">
                  <label for="depart-date">Ngày đi</label>
                  <input type="date" id="depart-date" value="2025-01-02" />
                </div>
                <div className="date-container">
                  <label for="return-date">Ngày về</label>
                  <input type="date" id="return-date" value="2024-12-25" />
                </div>
              </div>
            </div>

            <div className="booking-row">
              <div className="flight-element">
                <label for="passengers">Hành khách</label>
                <input
                  type="number"
                  min="1"
                  value={passengersNo}
                  onChange={handlePassengersChange}
                />
              </div>
            </div>

            <div className="booking-row">
              <div className="flight-element">
                <label for="voucher">Mã giảm giá</label>

                <input className="upper_case input_voucher"></input>
              </div>
            </div>
            <div className="booking-row">
              <button className="search-button">Tìm Chuyến Bay</button>
            </div>
          </div>

          <div className="booking__container">
            <div className="first_row">
              <div className="radio_container">
                <div className="radio_item">
                  <input
                    className="radio_point"
                    type="radio"
                    name="tripType"
                    value="oneWay"
                    checked={tripType === "oneWay"}
                    onChange={handleTripTypeChange}
                  />
                  <div className="radioText">Một Chiều</div>
                </div>
                <div className="radio_item">
                  <input
                    className="radio_point"
                    type="radio"
                    name="tripType"
                    value="roundTrip"
                    checked={tripType === "roundTrip"}
                    onChange={handleTripTypeChange}
                  />
                  <div className="radioText">Khứ Hồi</div>
                </div>
              </div>
            </div>
            <div className="second_row">
              <form
                className={tripType === "oneWay" ? "one-way" : "round-trip"}
              >
                <div className="form__group">
                  <div className="input__group">
                    <div className="input_container">
                      <div>Từ</div>
                      <Typeahead
                        id="origin"
                        labelKey="name"
                        onChange={setOriginSelection} // Different handler
                        options={options}
                        selected={originSelection} // Different state
                        style={{ marginBottom: "10px" }}
                        filterBy={filterByStartsWith}
                        renderMenuItemChildren={(option) => (
                          <div style={{ padding: "5px" }}>{option.name}</div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <div className="input_container">
                      <div>Tới</div>
                      <Typeahead
                        id="destination"
                        labelKey="name"
                        onChange={setDestinationSelection} // Different handler
                        options={options}
                        selected={destinationSelection} // Different state
                        style={{ marginBottom: "10px" }}
                        filterBy={filterByStartsWith}
                        renderMenuItemChildren={(option) => (
                          <div style={{ padding: "5px" }}>{option.name}</div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="form__group">
                  <div className="input__group">
                    <div>Ngày đi</div>
                    <DatePicker
                      selected={departDate}
                      onChange={(date) => setDepartDate(date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={new Date()}
                      placeholderText="Chọn ngày đi"
                      className="date-picker-input"
                    />
                  </div>
                </div>
                {tripType === "roundTrip" && (
                  <div className="form__group">
                    <div>Ngày về</div>
                    <div className="input__group">
                      <DatePicker
                        selected={returnDate}
                        onChange={(date) => setReturnDate(date)}
                        dateFormat="dd/MM/yyyy"
                        minDate={departDate}
                        placeholderText="Chọn ngày về"
                        className="date-picker-input"
                        onSubmit={handleSubmit}
                      />
                    </div>
                  </div>
                )}

                <div className="form__group">
                  <div>Hành khách</div>
                  <div className="input__group">
                    <input
                      type="number"
                      min="1"
                      value={passengersNo}
                      onChange={handlePassengersChange}
                    />
                  </div>
                </div>
              </form>
              <div className="header_third_row">
                <div className="header_sale_container">
                  <input
                    className="upper_case input_voucher"
                    placeholder="Mã giảm giá"
                  ></input>
                </div>
                <div className="header_button_container">
                  <button className="flight_search_btn" type="submit" onClick={handleSubmit}>Tìm chuyến bay</button>
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

// Add this CSS

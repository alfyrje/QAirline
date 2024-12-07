import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./bookingPart.css";
import { FaLightbulb } from "react-icons/fa";
import React, { useMemo } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
// import "react-bootstrap-typeahead/css/Typeahead.css";
import Form from "react-bootstrap/Form";

function BookingPart() {
  // Separate states for origin and destination
  const [originSelection, setOriginSelection] = useState([]);
  const [destinationSelection, setDestinationSelection] = useState([]);

  const options = [
    { id: 1, name: "Ha Noi" },
    { id: 2, name: "New York" },
    { id: 3, name: "Newark" },
    { id: 4, name: "New Orleans" },
    { id: 5, name: "Boston" },
    { id: 6, name: "Chicago" },
    { id: 7, name: "Los Angeles" },
    { id: 8, name: "San Francisco" },
    { id: 9, name: "Seattle" },
    { id: 10, name: "Atlanta" },
    { id: 11, name: "Miami" },
    { id: 12, name: "Denver" },
    { id: 13, name: "Dallas" },
    { id: 14, name: "Eugene" },
  ];

  const filterByStartsWith = (option, props) => {
    const labelKey = props.labelKey;
    const text = option[labelKey];
    const query = props.text;

    return text.toLowerCase().startsWith(query.toLowerCase());
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
                  <input
                    className="radio_point"
                    type="radio"
                    name="tripType"
                    value="oneWay"
                  />
                  <div className="radioText">Một Chiều</div>
                </div>
                <div className="radio_item">
                  <input
                    className="radio_point"
                    type="radio"
                    name="tripType"
                    value="roundTrip"
                  />
                  <div className="radioText">Khứ Hồi</div>
                </div>
              </div>
            </div>
            <div className="second_row">
              <form>
                <div className="form__group">
                  
                  <div className="input__group">
                    <div className="input_container">
                      <div>
                        Từ
                      </div>
                    <Typeahead
                      id="origin"
                      labelKey="name"
                      onChange={setOriginSelection}     // Different handler
                      options={options}
                      selected={originSelection}        // Different state
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
                    <div>
                        Tới
                      </div>
                    <Typeahead
                      id="destination"
                      labelKey="name"
                      onChange={setDestinationSelection}  // Different handler
                      options={options}
                      selected={destinationSelection}     // Different state
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
                   <div>
                        Ngày đi
                      </div>
                    <input type="text" />
                  </div>
                </div>
                <div className="form__group">
                <div>
                        Ngày về
                      </div>
                  <div className="input__group">
                    <input type="text" />
                  </div>
                </div>
                <div className="form__group">
                <div>
                        Hành khách
                      </div>
                  <div className="input__group">
                    <input type="text" />
                  </div>
                </div>
              </form>
              <div className="header_third_row">
                <div className="header_sale_container">
                  <input
                    className="upper_case"
                    placeholder="Mã giảm giá"
                  ></input>
                </div>

                <div className="header_button_container">
                  <button className="flight_search_btn">Tìm chuyến bay</button>
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

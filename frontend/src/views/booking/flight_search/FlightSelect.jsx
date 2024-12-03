import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./FlightSelect.css";
import Header from "../../partials/Header";
import Footer from "../../partials/Footer";
import FlightList from "./FlightList";
import FlightInfo from "./FlightInfo";
import ProgressBar from "../ProgressBar";

const FlightSelect = () => {
  const { state } = useLocation();
  const [flights, setFlights] = useState([]);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const [isReturnFlight, setIsReturnFlight] = useState(false);
  const navigate = useNavigate();
  const roundTrip = state?.roundTrip;
  const flight = state?.searchParams;
  const [economyView, setEconomyView] = useState(false);
  const [businessView, setBusinessView] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window size


  const handleSelectSeat = (selection) => {
    setSelectedFlights((prev) => [...prev, selection]);

    if (roundTrip && !isReturnFlight) {
      setIsReturnFlight(true);
    } else {
      navigate("/booking-info", {
        state: {
          selectedFlights: [...selectedFlights, selection],
          flight: flight,
        },
      });
    }
  };

  useEffect(() => {
    if (!isReturnFlight && state?.searchParams) {
      axios
        .get("http://localhost:8000/flights/search-flights", {
          params: state.searchParams,
        })
        .then((response) => setFlights(response.data))
        .catch((error) => console.error("Error fetching flights", error));
    } else if (isReturnFlight) {
      const returnParams = {
        start_location: state.searchParams.end_location,
        end_location: state.searchParams.start_location,
        start_time: state.searchParams.return_time,
      };

      axios
        .get("http://localhost:8000/flights/search-flights", {
          params: returnParams,
        })
        .then((response) => setFlights(response.data))
        .catch((error) =>
          console.error("Error fetching return flights", error)
        );
    }
  }, [isReturnFlight, state]);

  const handleBack = () => {
    if (isReturnFlight) {
      setIsReturnFlight(false);
      setSelectedFlights([]);
    } else {
      navigate(-1);
    }
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth < 768) {
      setEconomyView(true);
      setBusinessView(false);
    } else {
      setEconomyView(true);
      setBusinessView(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }
  , []);

  return (
    <>
      <Header />
      <div className="flight-select-container">
        <ProgressBar currentStep="flights" />
        <div className="booking-header">
          <h1>Chọn chuyến bay</h1>
          <button className="btn btn-primary" onClick={handleBack}>
            Quay lại
          </button>
        </div>
        {windowWidth <= 768 && (
          <div className="flight-select-button-bar">
        <button
            className={`flight-select-btn ${economyView ? "active" : ""}`}
            onClick={() => {
              setEconomyView(true);
              setBusinessView(false);
            }}
          >
            Economy
          </button>
          <button
            className={`flight-select-btn ${businessView ? "active" : ""}`}
            onClick={() => {
              setEconomyView(false);
              setBusinessView(true);
            }}
          >
            Business
          </button>
        </div>)}
        <div className="flight-list-wrapper">
          <FlightInfo flight={state?.searchParams} />
          <FlightList flights={flights} onSelectSeat={handleSelectSeat} economyView={economyView} businessView={businessView} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FlightSelect;

import { useNavigate } from "react-router-dom";
import FlightSearchForm from "./FlightSearchForm";
import { round } from "yet-another-react-lightbox";

const FlightSearchPage = ({roundTrip}) => {
    const navigate = useNavigate();

    const handleSearch = (params) => {
        navigate("/flight-select", { state: { searchParams: params, roundTrip } });
    };

    return (
        <div>
            <h1>Search Flights</h1> 
            <FlightSearchForm onSearch={handleSearch} roundTrip = {roundTrip} />
        </div>
    );
};

export default FlightSearchPage;
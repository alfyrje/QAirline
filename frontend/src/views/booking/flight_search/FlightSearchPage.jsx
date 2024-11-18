import { useNavigate } from "react-router-dom";
import FlightSearchFormOne from "./FlightSearchFormOne";
import FlightSearchFormRound from "./FlightSearchFormRound";

const FlightSearchPage = () => {
    const navigate = useNavigate();

    const handleSearch = (params) => {
        navigate("/flight-select", { state: { searchParams: params } });
    };

    return (
        <div>
            <h1>Search Flights</h1>
            <FlightSearchFormOne onSearch={handleSearch} />
        </div>
    );
};

export default FlightSearchPage;
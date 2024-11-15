import { useNavigate } from "react-router-dom";
import FlightSearchForm from "./FlightSearchForm";

const FlightSearchPage = () => {
    const navigate = useNavigate();

    const handleSearch = (params) => {
        // Navigate to search results with search params
        navigate("/flight-select", { state: { searchParams: params } });
    };

    return (
        <div>
            <h1>Search Flights</h1>
            <FlightSearchForm onSearch={handleSearch} />
        </div>
    );
};

export default FlightSearchPage;
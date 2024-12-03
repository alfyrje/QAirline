import './SeatSelect.css';

const SeatMap = ({ flightId, seatClass, passengersNo, onSeatSelect, selectedSeats, bookedSeats }) => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    const seatsPerRow = 4;
    const isEconomy = seatClass === 'E';

    return (
        <div>
            {rows.map((row) => (
                <div key={row} className="seat-row">
                    {Array.from({ length: seatsPerRow }, (_, i) => {
                        const seat = `${row}-${i + 1}`;
                        return (
                            <button
                                key={seat}
                                onClick={() => onSeatSelect(flightId, seat)}
                                disabled={
                                    (isEconomy && row <= 'D') || (!isEconomy && row > 'D') ||
                                    (selectedSeats.length >= passengersNo && !selectedSeats.includes(seat)) ||
                                    bookedSeats.includes(seat)
                                }
                                className={selectedSeats.includes(seat) ? 'selected' : ''}
                            >
                                {seat}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default SeatMap;
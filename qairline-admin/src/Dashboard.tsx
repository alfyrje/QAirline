import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDataProvider, useTranslate } from "react-admin";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  LineChart,
  Line,
} from "recharts";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(
    new Date(new Date().setMonth(new Date().getMonth() - 1)),
  );
  const [endDate, setEndDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [ticketStatus, setTicketStatus] = useState("active"); // 'active' or 'cancelled'
  const [stats, setStats] = useState({
    timeSeriesData: [],
    cityData: [],
    classDistribution: [],
  });

  const dataProvider = useDataProvider();

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCityStats = async () => {
    if (!selectedCity) return;

    try {
      const { data } = await dataProvider.getList("tickets", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "id", order: "ASC" },
        filter: {
          cancelled: false,
          'flight__end_location': selectedCity,
          'flight__start_time__gte': startDate.toISOString(),
          'flight__start_time__lte': endDate.toISOString()
        },
      });

      // Count tickets by class
      const economyCount = data.filter(ticket => ticket.ticket_class === 'E').length;
      const businessCount = data.filter(ticket => ticket.ticket_class === 'B').length;

      const cityData = [
        {
          city: selectedCity,
          'Vé phổ thông': economyCount,
          'Vé thương gia': businessCount,
        }
      ];

      setStats(prev => ({ ...prev, cityData }));
    } catch (error) {
      console.error("Error fetching city stats:", error);
    }
  };

  const fetchClassDistribution = async () => {
    try {
      const { data } = await dataProvider.getList("tickets", {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: "id", order: "ASC" },
        filter: {
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
          cancelled: ticketStatus === "cancelled",
        },
      });

      const economyCount = data.filter(
        (ticket) => ticket.ticket_class === "E",
      ).length;
      const businessCount = data.filter(
        (ticket) => ticket.ticket_class === "B",
      ).length;
      const total = economyCount + businessCount;

      const classDistribution = [
        {
          name: "Phổ thông",
          value: economyCount,
          percent: (economyCount / total) * 100,
        },
        {
          name: "Thương gia",
          value: businessCount,
          percent: (businessCount / total) * 100,
        },
      ];
      setStats((prev) => ({ ...prev, classDistribution }));
    } catch (error) {
      console.error("Error fetching class distribution:", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch("http://localhost:8000/flights/locations/");
      const data = await response.json();
      setCities(data.locations);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const processTimeSeriesData = (data) => {
    // Implement your data processing logic here
    return data.map((item) => ({
      date: item.date,
      tickets: item.count,
    }));
  };

  const processCityData = (data) => {
    // Implement your data processing logic here
    return data.map((item) => ({
      date: item.date,
      tickets: item.count,
    }));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box p={3}>
        {/* City Statistics */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Thống kê số vé tới các thành phố
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  label="Chọn thành phố"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  SelectProps={{
                    native: true,
                  }}
                  fullWidth
                >
                  <option value="">Chọn thành phố</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" onClick={fetchCityStats}>
                  Xem số liệu
                </Button>
              </Grid>
            </Grid>
            <BarChart width={800} height={400} data={stats.cityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Vé phổ thông" fill="#82ca9d" />
              <Bar dataKey="Vé thương gia" fill="#8884d8" />
            </BarChart>
          </CardContent>
        </Card>

        {/* Class Distribution */}
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Phân bố hạng vé
            </Typography>
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={4}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel
                    id="ticket-status-label"
                    sx={{
                      backgroundColor: "white",
                      px: 1,
                      "&.Mui-focused": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    Trạng thái vé
                  </InputLabel>
                  <Select
                    value={ticketStatus}
                    onChange={(e) => setTicketStatus(e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="active">Vé đang hoạt động</MenuItem>
                    <MenuItem value="cancelled">Vé đã hủy</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button variant="contained" onClick={fetchClassDistribution}>
                  Cập nhật biểu đồ
                </Button>
              </Grid>
            </Grid>
            <PieChart width={800} height={400}>
              <Pie
                data={stats.classDistribution}
                cx={400}
                cy={200}
                labelLine={false}
                label={({ name, percent }) => `${name}: ${percent.toFixed(1)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.classDistribution.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#0088FE", "#00C49F"][index % 2]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </Box>
    </LocalizationProvider>
  );
};

export default Dashboard;

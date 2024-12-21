import { useState } from 'react';
import { Card, CardContent, Typography, Grid, Box, TextField, Button } from '@mui/material';
import { useDataProvider, useTranslate } from 'react-admin';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const Dashboard = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const [selectedFlightCode, setSelectedFlightCode] = useState('');
    const [stats, setStats] = useState({
        totalTickets: 0,
        totalEconomicTickets: 0,
        totalBusinessTickets: 0,
        ticketClassDistribution: [],
        flightTicketData: [],
    });

    const handleFlightCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFlightCode(event.target.value);
    };

    const fetchStats = async () => {
        try {
            const { data: tickets } = await dataProvider.getList('tickets', {
                pagination: { page: 1, perPage: 1000 },
                sort: { field: 'id', order: 'ASC' },
                filter: selectedFlightCode ? { 'flight__code': selectedFlightCode } : {},
            });

            const totalTickets = tickets.length;
            const totalEconomicTickets = tickets.filter(ticket => ticket.ticket_class === 'E').length;
            const totalBusinessTickets = tickets.filter(ticket => ticket.ticket_class === 'B').length;

            const ticketClassDistribution = [
                { name: 'Economic', value: totalEconomicTickets },
                { name: 'Business', value: totalBusinessTickets },
            ];

            setStats({
                totalTickets,
                totalEconomicTickets,
                totalBusinessTickets,
                ticketClassDistribution,
                flightTicketData: [],
            });
        } catch (error) {
            console.error('Error fetching ticket stats:', error);
        }
    };

    const COLORS = ['#0088FE', '#00C49F'];

    return (
        <Card>
            <CardContent>
                <Box mb={3}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Flight Code"
                                value={selectedFlightCode}
                                onChange={handleFlightCodeChange}
                                placeholder="Enter flight code"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button variant="contained" color="primary" onClick={fetchStats}>
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </Box>

                <Typography variant="h4" component="h3" gutterBottom>
                    {translate('dashboard.ticket_statistics')} 
                    {selectedFlightCode && ` - Flight ${selectedFlightCode}`}
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="p">
                            {translate('dashboard.total_tickets')}: {stats.totalTickets}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="p">
                            {translate('dashboard.total_economic_tickets')}: {stats.totalEconomicTickets}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="p">
                            {translate('dashboard.total_business_tickets')}: {stats.totalBusinessTickets}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h5" component="h3" gutterBottom>
                                {translate('dashboard.economy_vs_business')}
                            </Typography>
                            <PieChart width={400} height={400}>
                                <Pie
                                    data={stats.ticketClassDistribution}
                                    cx={200}
                                    cy={150}
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {stats.ticketClassDistribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Dashboard;
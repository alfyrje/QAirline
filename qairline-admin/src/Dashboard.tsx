import { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';
import { useDataProvider, useTranslate } from 'react-admin';
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

interface TicketClassDistribution {
    name: string;
    value: number;
}

interface FlightTicketData {
    flight: string;
    tickets: number;
    cancelledTickets: number;
}

const Dashboard = () => {
    const translate = useTranslate();
    const dataProvider = useDataProvider();
    const [stats, setStats] = useState<{
        totalTickets: number;
        totalEconomicTickets: number;
        totalBusinessTickets: number;
        ticketClassDistribution: TicketClassDistribution[];
        flightTicketData: FlightTicketData[];
    }>({
        totalTickets: 0,
        totalEconomicTickets: 0,
        totalBusinessTickets: 0,
        ticketClassDistribution: [],
        flightTicketData: [],
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data: tickets } = await dataProvider.getList('tickets', {
                    pagination: { page: 1, perPage: 1000 },
                    sort: { field: 'id', order: 'ASC' },
                    filter: {},
                });

                const totalTickets = tickets.length;
                const totalEconomicTickets = tickets.filter(ticket => ticket.ticket_class === 'E').length;
                const totalBusinessTickets = tickets.filter(ticket => ticket.ticket_class === 'B').length;

                const ticketClassDistribution = [
                    { name: 'Economic', value: totalEconomicTickets },
                    { name: 'Business', value: totalBusinessTickets },
                ];

                const flightIds = [...new Set(tickets.map(ticket => ticket.flight))];
                const { data: flights } = await dataProvider.getMany('flights', { ids: flightIds });

                const flightTicketData = tickets.reduce((acc: FlightTicketData[], ticket: any) => {
                    const flight = flights.find(flight => flight.id === ticket.flight);
                    const flightCode = flight ? flight.code : ticket.flight;
                    const flightIndex = acc.findIndex(flight => flight.flight === flightCode);
                    if (flightIndex >= 0) {
                        acc[flightIndex].tickets += 1;
                        if (ticket.status === 'cancelled') {
                            acc[flightIndex].cancelledTickets += 1;
                        }
                    } else {
                        acc.push({ flight: flightCode, tickets: 1, cancelledTickets: ticket.status === 'cancelled' ? 1 : 0 });
                    }
                    return acc;
                }, []);

                setStats({
                    totalTickets,
                    totalEconomicTickets,
                    totalBusinessTickets,
                    ticketClassDistribution,
                    flightTicketData,
                });
            } catch (error) {
                console.error('Error fetching ticket stats:', error);
            }
        };

        fetchStats();
    }, [dataProvider]);

    const COLORS = ['#0088FE', '#00C49F'];

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" component="h3" gutterBottom>
                    {translate('dashboard.ticket_statistics')}
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="p">
                            {translate('dashboard.total_tickets')}: <Typography variant="body1" component="span">{stats.totalTickets}</Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="p">
                            {translate('dashboard.total_economic_tickets')} <Typography variant="body1" component="span">{stats.totalEconomicTickets}</Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Typography variant="h6" component="p">
                            {translate('dashboard.total_business_tickets')}: <Typography variant="body1" component="span">{stats.totalBusinessTickets}</Typography>
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                    <Grid item xs={12} sm={6}>
                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Typography variant="h5" component="h3" gutterBottom>
                                {translate('dashboard.tickets_per_flight')}
                            </Typography>
                            <BarChart
                                width={500}
                                height={300}
                                data={stats.flightTicketData}
                                margin={{
                                    top: 5, right: 30, left: 20, bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="flight" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="tickets" name={translate('dashboard.tickets')} fill="#8884d8" />
                                <Bar dataKey="cancelledTickets" name={translate('dashboard.cancelled_tickets')} fill="#ff0000" />
                            </BarChart>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Dashboard;

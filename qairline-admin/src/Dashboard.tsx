import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { useDataProvider } from 'react-admin';

const Dashboard = () => {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalEconomicTickets: 0,
    totalBusinessTickets: 0,
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

        setStats({
          totalTickets,
          totalEconomicTickets,
          totalBusinessTickets,
        });
      } catch (error) {
        console.error('Error fetching ticket stats:', error);
      }
    };

    fetchStats();
  }, [dataProvider]);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="h2">
          Ticket Statistics
        </Typography>
        <Typography variant="body2" component="p">
          Total Tickets: {stats.totalTickets}
        </Typography>
        <Typography variant="body2" component="p">
          Total Economic Tickets: {stats.totalEconomicTickets}
        </Typography>
        <Typography variant="body2" component="p">
          Total Business Tickets: {stats.totalBusinessTickets}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Dashboard;
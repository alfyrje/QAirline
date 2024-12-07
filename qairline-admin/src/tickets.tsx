
import { List, Datagrid, TextField, BooleanField, SimpleList } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export const TicketList = (props: any) => {
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
    return (
        <List {...props}>
            {isSmall ? (
                <SimpleList
                    primaryText={(record: any) => record.passenger}
                    secondaryText={(record: any) => `${record.flight} (${record.ticket_class})`}
                    tertiaryText={(record: any) => record.seat}
                />
            ) : (
                <Datagrid rowClick="show">
                    <TextField source="id" />
                    <TextField source="booker" />
                    <TextField source="flight" />
                    <TextField source="passenger" />
                    <TextField source="seat" />
                    <TextField source="ticket_class" />
                    <BooleanField source="cancelled" />
                </Datagrid>
            )}
        </List>
    );
};
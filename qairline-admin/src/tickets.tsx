import { List, Datagrid, TextField, BooleanField, SimpleList, ReferenceField } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import CustomReferenceField from './CustomReferenceField';

export const TicketList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => `${record.passenger.first_name} ${record.passenger.last_name}`}
          secondaryText={(record: any) => `${record.flight.code} (${record.ticket_class})`}
          tertiaryText={(record: any) => record.seat}
        />
      ) : (
        <Datagrid rowClick="show">
          <TextField source="id" />
          <ReferenceField source="booker" reference="users">
            <CustomReferenceField source="email" />
          </ReferenceField>
          <ReferenceField source="flight" reference="flights" link="show">
            <CustomReferenceField source="code" />
          </ReferenceField>
          <ReferenceField source="passenger" reference="passengers">
            <CustomReferenceField source="first_name" />
          </ReferenceField>
          <TextField source="seat" />
          <TextField source="ticket_class" />
          <BooleanField source="cancelled" />
        </Datagrid>
      )}
    </List>
  );
};
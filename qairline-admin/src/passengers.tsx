import { List, Datagrid, TextField, Show, SimpleShowLayout } from 'react-admin';

export const PassengerList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="qr_email" />
            <TextField source="date_of_birth" />
            <TextField source="citizen_id" />
            <TextField source="nationality" />
            <TextField source="gender" />
        </Datagrid>
    </List>
);

export const PassengerShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <TextField source="first_name" />
            <TextField source="last_name" />
            <TextField source="qr_email" />
            <TextField source="date_of_birth" />
            <TextField source="citizen_id" />
            <TextField source="nationality" />
            <TextField source="gender" />
        </SimpleShowLayout>
    </Show>
);
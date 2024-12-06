
import { List, Datagrid, TextField, DateField, NumberField, Edit, SimpleForm, TextInput, DateInput, NumberInput, Create, Show, SimpleShowLayout, SimpleList } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export const FlightList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => record.code}
          secondaryText={(record: any) => `${record.start_location} to ${record.end_location}`}
          tertiaryText={(record: any) => new Date(record.start_time).toLocaleDateString()}
        />
      ) : (
        <Datagrid rowClick="show">
          <NumberField source="id" />
          <TextField source="code" />
          <TextField source="start_location" />
          <TextField source="end_location" />
          <DateField source="start_time" />
          <DateField source="end_time" />
          <NumberField source="delay_status" />
          <NumberField source="duration" />
          <NumberField source="economic_seats_left" />
          <NumberField source="business_seats_left" />
          <NumberField source="economic_price" />
          <NumberField source="business_price" />
        </Datagrid>
      )}
    </List>
  );
};

export const FlightEdit = (props: any) => (
  <Edit {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <TextInput source="start_location" />
      <TextInput source="end_location" />
      <DateInput source="start_time" />
      <DateInput source="end_time" />
      <NumberInput source="plane" />
      <NumberInput source="delay_status" />
      <NumberInput source="economic_price" />
      <NumberInput source="business_price" />
    </SimpleForm>
  </Edit>
);

export const FlightShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <NumberField source="id" />
      <TextField source="code" />
      <TextField source="start_location" />
      <TextField source="end_location" />
      <DateField source="start_time" />
      <DateField source="end_time" />
      <NumberField source="plane" />
      <NumberField source="delay_status" />
      <NumberField source="duration" />
      <NumberField source="economic_seats_left" />
      <NumberField source="business_seats_left" />
      <NumberField source="economic_price" />
      <NumberField source="business_price" />
    </SimpleShowLayout>
  </Show>
);

export const FlightCreate = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="code" />
      <TextInput source="start_location" />
      <TextInput source="end_location" />
      <DateInput source="start_time" />
      <DateInput source="end_time" />
      <NumberInput source="plane" />
      <NumberInput source="delay_status" />
      <NumberInput source="economic_price" />
      <NumberInput source="business_price" />
    </SimpleForm>
  </Create>
);

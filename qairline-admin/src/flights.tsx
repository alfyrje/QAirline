
import { DateTimeInput, ReferenceField, List, Datagrid, TextField, ReferenceInput, AutocompleteInput, DateField, NumberField, Edit, SimpleForm, TextInput, DateInput, NumberInput, Create, Show, SimpleShowLayout, SimpleList } from 'react-admin';
import { useMediaQuery } from '@mui/material';
import CustomReferenceField from './CustomReferenceField';
import { useNotify } from 'react-admin';

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
          <TextField source="id" />
          <TextField source="code" />
          <TextField source="start_location" />
          <TextField source="end_location" />
          <DateField source="start_time" showTime />
          <DateField source="end_time" showTime />
          <ReferenceField source="plane" reference="planes">
            <TextField source="name" />
          </ReferenceField>
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

export const FlightEdit = (props: any) => {
  const notify = useNotify();
  
  const onSuccess = async (data: any) => {
    try {
      const token = localStorage.getItem('access_token');
      console.log(data);
      await fetch(`http://localhost:8000/adminapp/api/flights/${data.id}/process_update/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      notify('Flight updated successfully', { type: 'success' });
    } catch (error) {
      notify('Error processing flight update', { type: 'error' });
    }
  };

  return (
    <Edit {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <TextInput source="code" />
        <TextInput source="start_location" />
        <TextInput source="end_location" />
        <DateTimeInput source="start_time" />
        <DateTimeInput source="end_time" />
        <ReferenceInput source="plane" reference="planes">
          <AutocompleteInput optionText="name" />
        </ReferenceInput>
        <NumberInput source="delay_status" />
        <NumberInput source="economic_price" />
        <NumberInput source="business_price" />
      </SimpleForm>
    </Edit>
  );
};

export const FlightShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="code" />
      <TextField source="start_location" />
      <TextField source="end_location" />
      <DateField source="start_time" showTime />
      <DateField source="end_time" showTime />
      <ReferenceField source="plane" reference="planes">
        <CustomReferenceField source="name" />
      </ReferenceField>
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
      <DateTimeInput source="start_time" />
      <DateTimeInput source="end_time" />
      <ReferenceInput source="plane" reference="planes">
        <AutocompleteInput optionText="name" />
      </ReferenceInput>
      <NumberInput source="delay_status" />
      <NumberInput source="economic_price" />
      <NumberInput source="business_price" />
    </SimpleForm>
  </Create>
);

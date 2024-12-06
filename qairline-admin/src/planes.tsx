import { List, Datagrid, TextField, NumberField, SimpleList, Create, SimpleForm, TextInput, NumberInput } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export const PlaneList = (props: any) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));
  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => record.name}
          secondaryText={(record: any) => `Manufacturer: ${record.manufacturer}`}
          tertiaryText={(record: any) => `Capacity: ${record.economic_seats + record.business_seats}`}
        />
      ) : (
        <Datagrid rowClick="show">
          <NumberField source="id" />
          <TextField source="name" />
          <TextField source="manufacturer" />
          <NumberField source="economic_seats" />
          <NumberField source="business_seats" />
        </Datagrid>
      )}
    </List>
  );
};

export const PlaneCreate = (props: any) => (
    <Create {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="manufacturer" />
        <NumberInput source="economic_seats" />
        <NumberInput source="business_seats" />
      </SimpleForm>
    </Create>
  );
  
import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, Show, SimpleShowLayout } from 'react-admin';

export const TravelInfoList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="title" />
            <TextField source="html_content" />
        </Datagrid>
    </List>
);

export const TravelInfoEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="html_content" />
        </SimpleForm>
    </Edit>
);

export const TravelInfoCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="html_content" />
        </SimpleForm>
    </Create>
);

export const TravelInfoShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="html_content" />
        </SimpleShowLayout>
    </Show>
);
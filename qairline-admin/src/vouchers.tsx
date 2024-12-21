import { List, Datagrid, TextField, Edit, SimpleForm, TextInput, Create, Show, SimpleShowLayout, NumberInput, ImageField, ImageInput } from 'react-admin';

export const VoucherList = (props: any) => (
    <List {...props}>
        <Datagrid rowClick="show">
            <TextField source="voucher_code" />
            <TextField source="voucher_description" />
            <TextField source="percentage" />
        </Datagrid>
    </List>
);

export const VoucherEdit = (props: any) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="voucher_code" />
            <TextInput source="voucher_description" />
            <NumberInput source="percentage" />
            <ImageInput source="voucher_picture" label="Voucher Picture" accept={{ 'image/*': ['.png', '.jpg'] }}>
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Edit>
);

export const VoucherCreate = (props: any) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="voucher_code" />
            <TextInput source="voucher_description" />
            <NumberInput source="percentage" />
            <ImageInput source="voucher_picture" label="Voucher Picture" accept={{ 'image/*': ['.png', '.jpg'] }}>
                <ImageField source="src" title="title" />
            </ImageInput>
        </SimpleForm>
    </Create>
);

export const VoucherShow = (props: any) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="voucher_code" />
            <TextField source="voucher_description" />
            <TextField source="percentage" />
            <ImageField source="voucher_picture" title="Voucher Picture" />
        </SimpleShowLayout>
    </Show>
);
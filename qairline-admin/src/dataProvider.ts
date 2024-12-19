import { DataProvider, fetchUtils } from 'ra-core';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8000/adminapp/api';
const httpClient = async (url: string, options: any = {}) => {
    if (!options.headers) {
        options.headers = new Headers();
    }
    const token = localStorage.getItem('access_token');
    options.headers.set('Authorization', `Bearer ${token}`);

    const response = await fetch(url, options);
    const json = await response.json();

    if (!response.ok) {
        return Promise.reject(json);
    }

    return {
        status: response.status,
        headers: response.headers,
        body: response.body,
        json,
    };
};

const createFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (data[key] && data[key].rawFile) {
            formData.append(key, data[key].rawFile);
        } else {
            formData.append(key, data[key]);
        }
    });
    return formData;
};

const dataProvider: DataProvider = {
    getList: (resource, params) => {
        const { pagination, sort, filter } = params;
        const { page, perPage } = pagination || {};
        const { field, order } = sort || { field: '', order: 'ASC' };
        const query = {
            ordering: `${order === 'ASC' ? '' : '-'}${field}`,
            page: page,
            page_size: perPage,
            ...filter,
        };
        const url = `${apiUrl}/${resource}/?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.results,
            total: headers.has('x-total-count')
                ? parseInt(headers.get('x-total-count') || '0', 10)
                : json.count,
        }));
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}/`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const query = {
            id__in: params.ids.join(','),
        };
        const url = `${apiUrl}/${resource}/?${stringify(query)}`;
        return httpClient(url).then(({ json }) => ({ data: json.results }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
            ordering: `${order === 'ASC' ? '' : '-'}${field}`,
            page: page,
            page_size: perPage,
            ...params.filter,
            [params.target]: params.id,
        };
        const url = `${apiUrl}/${resource}/?${stringify(query)}`;

        return httpClient(url).then(({ headers, json }) => ({
            data: json.results,
            total: headers.has('x-total-count')
                ? parseInt(headers.get('x-total-count') || '0', 10)
                : json.count,
        }));
    },

    update: (resource, params) => {
        const formData = createFormData(params.data);
        return httpClient(`${apiUrl}/${resource}/${params.id}/`, {
            method: 'PUT',
            body: formData,
        }).then(({ json }) => ({ data: json }));
    },

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}/?${stringify(query)}`, {
            method: 'PATCH',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) => {
        const formData = createFormData(params.data);
        return httpClient(`${apiUrl}/${resource}/`, {
            method: 'POST',
            body: formData,
        }).then(({ json }) => ({
            data: { ...params.data, ...json },
        }));
    },

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}/`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        };
        return httpClient(`${apiUrl}/${resource}/?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    },
};

export default dataProvider;
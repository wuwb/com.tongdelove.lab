import Axios, { AxiosRequestConfig } from 'axios';

export const axios = Axios.create({
    baseURL: '/api',
});

axios.interceptors.request.use();
axios.interceptors.response.use();

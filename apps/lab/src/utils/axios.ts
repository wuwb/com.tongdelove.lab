import { logout } from '@/stores/authSlice';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Router from 'next/navigation';
import { store } from '../stores';

const isDev = process.env.NODE_ENV === 'development';

const serverUrl = isDev ? 'http://localhost:3001/api/' : 'https://api.tongdelove.com/api';

const instance = axios.create({
    baseURL: serverUrl,
    timeout: 1000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

instance.interceptors.request.use((config) => {
    // if (!config.headers.Authorization) {
    //   // const [accessToken, setAccessToken] = useLocalStorage('access_token');
    //   // if (accessToken) {
    //   //   config.headers.Authorization = `Bearer ${accessToken}`;
    //   // }
    //   const user = UserService.userValue;
    //   const isLoggedIn = user && user.token;
    //   if (isLoggedIn) {
    //       config.headers.Authorization = `Bearer ${user.token}`;
    //   }
    // }
    const { accessToken } = store.getState().auth;
    config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
    };

    return config;
}, (error) => {
    if (error.response) {
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
    } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // `error.request` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        console.log(error.request);
    } else {
        // 发送请求时出了点问题
        console.log('Error', error.message);
    }
    console.log(error.config);
    // return Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, (error: AxiosError) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (!axios.isCancel(error)) {
        console.log(error.message);
        // return Promise.reject(error);
    }

    const { response } = error;

    if (response) {
        const errorObject: ServerError = response.data;
        const code = errorObject.status;

        if (code === 401 || code === 404) {
            store.dispatch(logout());
            Router.push('/');
        }

        throw errorObject;
    }

    throw error;
});

const request = ({ ...options }) => {
    instance.defaults.headers.common.Authorization = `Bearer ${getToken()}`;

    const onSuccess = (response) => response;
    const onError = (error) => {
        // optionaly catch errors and add some additional logging here
        if (error.response.status === 'SESSION_EXPIRED_STATUS_CODE') {
            // Navigate to Login screen
        }

        return Promise.reject(error);
    }

    return instance(options).then(onSuccess).catch(onError);
}

export default instance;

export type ServerError = {
    status: number;
    message: string;
    timestamp: string;
    path: string;
};

import axios, {AxiosError, AxiosResponse} from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { UserService } from "@/services";

const isDev = process.env.NODE_ENV === 'development';

const serverUrl = isDev ? 'http://localhost:7001/api/' : 'https://api.tongdelove.com/api';

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 1000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
})

instance.interceptors.request.use(function (config) {
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
  return config;
}, function (error) {
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

instance.interceptors.response.use(function (response: AxiosResponse) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response.data;
}, (error: AxiosError) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response) {
    return Promise.reject(error);
  } else if (error.request) {
    if (!axios.isCancel(error)) {
      console.error(error);
    }
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }

});

export const useAxios = makeUseAxios({
  axios: instance,
});

export default instance;

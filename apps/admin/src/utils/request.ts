import type { RequestOptions } from '@@/plugin-request/request';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message, notification } from 'antd';
import queryString from 'query-string';

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}

// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

/**
 * @name request 配置，可以配置错误处理,运行时配置
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 * https://umijs.org/zh-CN/plugins/plugin-request
 */
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 3000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
  xsrfCookieName: 'xsrf-token',

  // 当后端接口不满足该规范的时候你需要通过该配置把后端接口数据转换为该格式
  paramsSerializer(params) {
    return queryString.stringify(params);
  },

  // 错误处理： umi@3 的错误处理方案。

  /**
   * @name 错误处理
   * pro 自带的错误处理， 可以在这里做自己的改动
   * @doc https://umijs.org/docs/max/request#配置
   * 异常处理程序
   * @see https://beta-pro.ant.design/docs/request-cn
   */
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { success, data, errorCode, errorMessage, showType } =
        res as unknown as ResponseStructure;
      if (!success) {
        const error: any = new Error(errorMessage);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data };
        throw error; // 抛出自制的错误
      }
    },

    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      console.error('error: ', error);
      console.error('error.name: ', error.name);
      console.error('error.response: ', error.response);
      console.error('error.request: ', error.request);
      console.error('opts: ', opts);

      if (opts?.skipErrorHandler) throw error;

      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { errorMessage, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warn(errorMessage);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(errorMessage);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: errorMessage,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(errorMessage);
          }
        } else {
          message.error('Business Error, please try again.');
        }
      } else if (error.name === 'TypeError') {
        message.error(`Network error. Please try again.`);
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        message.error(`Response status:${error.response.status}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  requestInterceptors: [
    [
      (config: RequestOptions) => {
        const token = localStorage.getItem('token');
        if (token) {
          const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
            'X-tenant': 'default', // 公司编码？
          };
          const result = {
            url: config.url,
            ...config,
            headers: {
              ...config.headers,
              ...headers,
            },
          };
          console.log('result: ', result);
          return result;
        }
        return config;
      },
    ],
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      const { data = {} as any, config } = response as unknown as ResponseStructure;

      if (!data.success) {
        // 根据错误类型提示不同错误信息
        message.error('请求失败！');
      }

      if (data.code === 401) {
        // 属性 token
        // let tokenData = await refreshToken();
        // localStorage.setItem("token", tokenData.token);
        // localStorage.setItem("refresh-token", tokenData.refreshToken);
        // return request(response.url, options);
      } else if (data.code === 403) {
        // 跳转登录页
        history.replace({
          pathname: '/user/login',
          search: JSON.stringify({
            redirect: window.location.href,
          }),
        });
      }
      return response;
    },
    // (error) => {
    //     if (error.response.status === 401) {
    //         setTimeout(() => {
    //             window.location.href = '/login';
    //         }, 2000);
    //     }
    // }
  ],
};

import { request } from '@umijs/max';

// 获取路由
export const getRouters = () => {
    return request('/base/login/getRouters', {
        method: 'get'
    });
}

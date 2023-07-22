import { request } from '@umijs/max';

// 登录方法
export function login(username, password, code, codeId) {
    const data = {
        username,
        password,
        code,
        codeId,
    }
    return request('/base/login', {
        headers: {
            isToken: false,
        },
        method: 'post',
        data: data,
    });
}

// 注册方法
export function register(data) {
    return request('/base/login/register', {
        headers: {
            isToken: false,
        },
        method: 'post',
        data: data,
    });
}

// 获取用户详细信息
export function getInfo() {
    return request('/base/login/get-info', {
        method: 'get',
    });
}

// 退出方法
export function logout() {
    return request('/base/login/logout', {
        method: 'post',
    });
}

// 获取验证码
export function getCodeImg() {
    return request('/base/login/captcha-image-svg', {
        headers: {
            isToken: false,
        },
        method: 'get',
        timeout: 20000,
    });
}

import { request } from '@umijs/max';

export async function accountLogin(params) {
    const { username, password } = params;
    const data = { username, password };

    return request('http://localhost:8080/auth/login', {
        method: 'POST',
        data,
    }).then(function (response) {
        console.log(response);
        return response;
    }).catch(function (error) {
        console.log(error);
    });
}

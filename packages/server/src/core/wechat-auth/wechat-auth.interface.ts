export interface AccessConfig {
    access_token: string; // 接口调用凭证
    expires_in: number; // access_token 接口调用凭证超时时间，单位（秒）
    refresh_token: string; // 用户刷新 access_token
    openid: string; // 授权用户唯一标识
    scope: string; // 用户授权的作用域，使用逗号（,）分隔
}

export interface WechatLoginDto {
    [key: string]: any
}

export class AccessTokenInfo {
    accessToken: string;
    expiresIn: number;
    getTime: number;
    openid: string;
    scope?: string;
}
export class WechatError {
    errcode: number;
    errmsg: string;
}

export class WechatUserInfo { }

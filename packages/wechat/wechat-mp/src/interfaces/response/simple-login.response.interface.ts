import { BaseResponse } from './base.response.interface';

interface SimpleLoginResponseData {
    /** 用户openid */
    openId: string;
    /** 用户在开放平台的唯一标识符 */
    unionId?: string;
}

/** 登录返回结果 */
export interface SimpleLoginResponse extends BaseResponse<SimpleLoginResponseData> {
}
import { BaseResponse } from './base.response.interface';

interface GetUserPhoneNumberResponsePhoneInfo {
    phoneNumber: string;
    purePhoneNumber: string;
    countryCode: string;
    watermark: {
        timestamp: number;
        appid: string;
    };
}

/** 登录返回结果 */
export interface GetUserPhoneNumberResponse extends BaseResponse<GetUserPhoneNumberResponsePhoneInfo> {
}

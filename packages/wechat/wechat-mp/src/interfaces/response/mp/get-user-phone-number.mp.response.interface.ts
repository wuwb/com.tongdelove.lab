import { MpBaseResponse } from './base.response.mp.interface';
export interface MpGetUserPhoneNumberResponse extends MpBaseResponse {
    phone_info: MpGetUserPhoneNumberResponsePhoneInfo;
}
interface MpGetUserPhoneNumberResponsePhoneInfo {
    phoneNumber: string;
    purePhoneNumber: string;
    countryCode: string;
    watermark: {
        timestamp: number;
        appid: string;
    };
}
export { };

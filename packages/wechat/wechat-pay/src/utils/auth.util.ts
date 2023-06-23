
import { Injectable, Inject } from "@nestjs/common";
import { OPTIONS_PROVIDER } from "../common/constants/common.constant";
import { SignUtil } from "./sign.util";

@Injectable()
export class AuthUtil {

    constructor(
        @Inject(OPTIONS_PROVIDER) private readonly options: any,
        private readonly signUtil: SignUtil
    ) {
    }

    /**
     * 获取HTTP请求签名信息
     * @param method Http请求方法
     * @param url URL全路径
     * @param params 请求参数
     * @returns Http签名信息
     */
    authorization(method, url, params) {
        const nonceStr = Math.random().toString(36).substring(2, 15);
        const timestamp = Math.floor(Date.now() / 1000) + '';
        const signature = this.signUtil.httpSignature(method, nonceStr, timestamp, url.replace('https://api.mch.weixin.qq.com', ''), params);
        return `WECHATPAY2-SHA256-RSA2048 mchid="${this.options.mchid}",nonce_str="${nonceStr}",timestamp="${timestamp}",serial_no="${this.options.serialNo}",signature="${signature}"`;
    }
}

import { Injectable, Inject } from "@nestjs/common";
import { createSign } from 'crypto';
import { OPTIONS_PROVIDER } from "../common/constants/common.constant";

@Injectable()
export class SignUtil {
    constructor(
        @Inject(OPTIONS_PROVIDER) private readonly options: any
    ) {
    }

    /**
     * Http请求签名
     * @param method Http请求方法
     * @param nonceStr 随机字符串
     * @param timestamp 时间戳
     * @param url URL路径（相对路径，例如：/v3/pay/transactions/h5）
     * @param body 请求参数
     * @returns 签名结果
     */
    httpSignature(method, nonceStr, timestamp, url, body) {
        let str = method + '\n' + url + '\n' + timestamp + '\n' + nonceStr + '\n';
        if (body && body instanceof Object)
            body = JSON.stringify(body);
        if (body)
            str = str + body + '\n';
        if (method === "GET" /* HttpMethod.GET */)
            str = str + '\n';
        return this.sha256WithRsa(str);
    }
    /**
     * SHA256withRSA加密
     * @param data 待加密字符串
     * @returns 加密结果
     */
    sha256WithRsa(data) {
        return createSign('RSA-SHA256').update(data).sign(this.options.privateKey, 'base64');
    }
}

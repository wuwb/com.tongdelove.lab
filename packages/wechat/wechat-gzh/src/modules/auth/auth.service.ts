import { Injectable } from '@nestjs/common';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialUtil } from '../utils/official.util';

@Injectable()
export class AuthService {
    constructor(private readonly officialUtil: OfficialUtil) { }

    /**
     * 微信调用第三方服务器签名认证
     * @param appid 公众号appID
     * @param timestamp 时间戳
     * @param nonce 随机字符串
     * @param signature 签名信息
     * @returns 签名校验结果
     */
    @OfficialErrorWrapper()
    async serverValidate(
        appid: string,
        timestamp: string,
        nonce: string,
        signature: string,
    ) {
        const result = await this.officialUtil.checkSignature(
            appid,
            timestamp,
            nonce,
            signature,
        );
        return { success: true, data: result };
    }

    /**
     * 微信转发信息签名校验
     * @param appid 公众号appID
     * @param timestamp 时间戳
     * @param nonce 随机字符串
     * @param encryptMessage 加密信息
     * @param signature 签名信息
     * @returns 签名校验结果
     */
    @OfficialErrorWrapper()
    async messageValidate(
        appid: string,
        timestamp: string,
        nonce: string,
        encryptMessage: string,
        signature: string,
    ) {
        const result = await this.officialUtil.checkSignature(
            appid,
            timestamp,
            nonce,
            signature,
            encryptMessage,
        );
        return { success: true, data: result };
    }
}

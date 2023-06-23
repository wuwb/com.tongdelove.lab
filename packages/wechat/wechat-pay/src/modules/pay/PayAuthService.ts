import { Injectable, Inject } from '@nestjs/common';
import { OPTIONS_PROVIDER } from '../common/constants/common.constant';
import { WechatPayError } from '../errors/pay.error';
import { DecryptStrategy } from '../strategies/decrypt.strategy';
import { WechatPayErrorWrapper } from '../common/decorators/error-wrapper.decorator';

@Injectable()
export class WechatPayAuthService {
    constructor(
        @Inject(OPTIONS_PROVIDER) private readonly options: any,
        private readonly decryptStrategy: DecryptStrategy,
    ) { }

    /**
     * 微信支付回调认证
     * @param serial 商户证书序列号
     * @param nonce 随机字符串
     * @param timestamp 时间戳，精确到秒，字符串格式
     * @param signature 加密信息
     * @returns 认证结果
     */
    @WechatPayErrorWrapper({ type: "sync" })
    callback(serial: string, nonce: string, timestamp: string, signature: string) {
        if (serial !== this.options.serialNo) throw new WechatPayError('平台证书序列号不符');
        const decodeSignature = Buffer.from(signature, 'base64').toString('utf-8');
        // TODO: 后续校验
        return { success: true, data: true };
    }
}

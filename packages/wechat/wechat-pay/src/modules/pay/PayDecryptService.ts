import { Injectable } from '@nestjs/common';
import { WechatPayError } from '../errors/wechat-pay.error';
import { DecryptStrategy } from '../strategies/decrypt.strategy';
import { WechatPayErrorWrapper } from '../decorators/error-wrapper.decorator';

@Injectable()
export class WechatPayDecryptService {
    constructor(private readonly decryptStrategy: DecryptStrategy) { }

    /**
     * 解密微信回调数据
     * @param resource 加密回调数据
     * @returns 解密结果
     */
    @WechatPayErrorWrapper({ type: "sync" })
    callbackResource(resource: any) {
        try {
            var decode = this.decryptStrategy[resource.algorithm](resource.ciphertext, resource.associated_data, resource.nonce);
        } catch (error) {
            throw new WechatPayError(error);
        }
        return {
            success: true,
            data: decode
        };
    }
}

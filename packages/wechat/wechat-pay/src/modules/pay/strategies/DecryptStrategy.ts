import { Injectable, Inject } from '@nestjs/common';
import { createDecipheriv } from 'crypto';
import { OPTIONS_PROVIDER } from '@/common/constants/common.constant';

@Injectable()
export class DecryptStrategy {
  constructor(@Inject(OPTIONS_PROVIDER) private readonly options: any) { }

  /**
   * 解密 ciphertext字符 AEAD_AES_256_GCM算法策略实现
   * @param ciphertext 数据密文
   * @param associated_data 附加数据
   * @param nonce 随机串
   * @returns 解密结果
   */
  AEAD_AES_256_GCM(ciphertext: string, associated_data: string, nonce: string) {
    const buffer = Buffer.from(ciphertext, 'base64');
    const authTag = buffer.slice(buffer.length - 16);
    const data = buffer.slice(0, buffer.length - 16);
    const decipher = createDecipheriv('aes-256-gcm', this.options.apiKeyV3, nonce);
    decipher.setAuthTag(authTag);
    decipher.setAAD(Buffer.from(associated_data));
    const decode = decipher.update(data, undefined, 'utf-8');
    decipher.final();
    return JSON.parse(decode);
  }
}

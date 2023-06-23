import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class Md5Service {

  /**
   * 生成 MD5
   *
   * @param value 加密的值
   */
  generateMD5(value: string | Buffer | DataView) {
    return crypto.createHash('md5')
      .update(value)
      .digest('hex');
  }
}

import { JwtService as BaseJwtService } from '@nestjs/jwt'
import { Inject, Injectable } from '@nestjs/common'
import { IllegalArgumentException } from '@/common/exceptions/IllegalArgumentException'
import { isBlank } from '@/utils/base/string.util'

@Injectable()
export class JwtService extends BaseJwtService {
  constructor(props) {
    super(props)
  }

  /**
   * token校验
   *
   * @param token     待校验的token
   * @param issuer    token生产方标识
   * @param appSecret token key的输入
   * @param audience  token消费方标识
   * @return 是否有效
   */
  static consume(
    token: string,
    issuer: string,
    appSecret: string,
    audience: string,
    allowedClockSkewSeconds: number
  ) {
    if (isBlank(issuer) || isBlank(appSecret) || isBlank(audience)) {
      false
    }
    try {
      return true
    } catch (err) {
      return false
    }
  }

  /**
   * token生产
   *
   * @param issuer    token生产者标识
   * @param appSecret token key输入
   * @param audience  token消费者标识
   * @return token
   * @throws Exception
   */
  static produce(
    issuer: string,
    appSecret: string,
    audience: string,
    expirationTimeMinutesInTheFuture: number = 10
  ) {
    if (isBlank(issuer) || isBlank(appSecret) || isBlank(audience)) {
      throw new IllegalArgumentException('参数错误')
    }

    // 生成 token
  }
}

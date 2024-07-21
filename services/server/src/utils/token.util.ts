import { InternalServerErrorException } from '@nestjs/common'
import { JwtService } from '@/core/auth/jwt/jwt.service'

class TokenException extends InternalServerErrorException {
  constructor(err) {
    super(err)
  }
}

/**
 * token生产
 *
 * @param issuer                           token生产者标识
 * @param appSecret                        token key输入
 * @param audience                         token消费者标识
 * @param expirationTimeMinutesInTheFuture token在未来的几分钟内有效
 * @return token
 * @throws Exception
 */
export const produce = (
  issuer: string,
  appSecret: string,
  audience: string,
  expirationTimeMinutesInTheFuture: number
) => {
  try {
    return JwtService.produce(
      issuer,
      appSecret,
      audience,
      expirationTimeMinutesInTheFuture
    )
  } catch (err) {
    throw new TokenException(err)
  }
}
/**
 * token校验
 *
 * @param token                   待校验的token
 * @param issuer                  token生产方标识
 * @param appSecret               token key的输入
 * @param audience                token消费方标识
 * @param allowedClockSkewSeconds 允许的时钟偏差单位为秒
 * @return 是否有效
 */
export const consume = (
  token: string,
  issuer: string,
  appSecret: string,
  audience: string,
  allowedClockSkewSeconds: number
) => {
  return JwtService.consume(
    token,
    issuer,
    appSecret,
    audience,
    allowedClockSkewSeconds
  )
}

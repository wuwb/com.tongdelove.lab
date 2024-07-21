import { registerAs } from '@nestjs/config'

export interface JwtConfig {
  ttl: number
  tokenExpire: number
  refresh_ttl: number
  secret: string
  redisScope: string
  expiresIn: string
  secretKey?: string
}

export default registerAs('jwt', (): JwtConfig => {
  return {
    ttl: 60,
    tokenExpire: 60,
    refresh_ttl: 60,
    secret: 'dowu_server',
    redisScope: 'jwt',
    secretKey: process.env.JWT_SECRET_KEY || 'rzxlszyykpbgqcflzxsqcysyhljt',
    expiresIn: process.env.JWT_EXPIRES_IN || '3600s',
  }
})

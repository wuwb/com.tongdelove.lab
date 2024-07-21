import { applyDecorators, SetMetadata } from '@nestjs/common'
import { API_AUTH_KEY } from '@/common/constants/auth.constant'

export function ApiAuth(): Function {
  return applyDecorators(SetMetadata(API_AUTH_KEY, true))
}

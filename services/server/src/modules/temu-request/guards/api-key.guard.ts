import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const apiKey = request.headers['x-api-key']

    if (!apiKey) {
      throw new UnauthorizedException('缺少 API Key')
    }

    const validApiKeys = process.env.API_KEYS?.split(',') || ['your-api-key']

    if (!validApiKeys.includes(apiKey)) {
      throw new UnauthorizedException('无效的 API Key')
    }

    return true
  }
}

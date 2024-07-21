/**
 * 把 URL Search 上的 `token` 附加到 Header Authorization 上
 */
import { IncomingMessage, ServerResponse } from 'http'
import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { parseRelativeUrl } from '@/utils/url'

@Injectable()
export class AttachAuthMiddleware implements NestMiddleware {
  private logger = new Logger(AttachAuthMiddleware.name)

  async use(req: IncomingMessage, res: ServerResponse, next: () => void) {
    // @ts-ignore
    const url = req.originalUrl?.replace(/^\/api(\/v\d)?/, '')
    const parser = parseRelativeUrl(url)

    if (parser.searchParams.get('token')) {
      req.headers.authorization = parser.searchParams.get('token') as string
      this.logger.log(req.headers.authorization)
    }

    next()
  }
}

import * as requestIp from 'request-ip'
import { Injectable, NestMiddleware } from '@nestjs/common'
import { MyLoggerService } from '@/core/logger/winston/logger.service'

@Injectable()
export class IpMiddleware implements NestMiddleware {
  constructor(private readonly logger: MyLoggerService) {}

  use(request: Request, response: Response, next: () => void) {
    const req = request as any
    req.reqStartTime = Date.now()

    const clientIp = requestIp.getClientIp(request as any)
    ;(request as any).clientIp = clientIp

    this.logger.log(
      JSON.stringify({
        data: {
          middleware: 'IpMiddleware',
          ip: clientIp,
          req: {
            method: 'GET',
            url: req.originalUrl,
            headers: {
              'user-agent': req.headers['user-agent'],
            },
          },
        },
      })
    )
    next()
  }
}

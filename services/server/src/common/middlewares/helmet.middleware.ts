import { Injectable, NestMiddleware } from '@nestjs/common'
import helmet from 'helmet'
import { ConfigService } from '@nestjs/config'
import { MyLoggerService } from '@/core/logger/winston/logger.service'

@Injectable()
export class HelmetMiddleware implements NestMiddleware {
  private helmet: any

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: MyLoggerService
  ) {
    this.helmet = helmet()
  }

  use(request: Request, response: Response, next: () => void) {
    const req: any = request
    const res: any = response

    this.helmet(req, res, next)
  }
}

import { Injectable, NestMiddleware } from '@nestjs/common'
import { MyLoggerService } from '@/core/logger/winston/logger.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class ChoreMiddleware implements NestMiddleware {
  constructor(
    private readonly configService: ConfigService,
    private readonly logger: MyLoggerService
  ) {}

  use(request: Request, response: Response, next: () => void) {
    const req: any = request
    const res: any = response

    next()
  }
}

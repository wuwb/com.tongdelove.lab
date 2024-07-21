import { Injectable, NestMiddleware, Logger } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name)

  use(req: Request, res: Response, next: NextFunction) {
    const { method, path, body, query, params } = req

    this.logger.log(`接口地址：${method} ${path}`)

    // if (JSON.stringify(body) !== '{}') {
    //   this.logger.log(JSON.stringify(body, null, '\t\n'));
    // }
    // if (JSON.stringify(query) !== '{}') {
    //   this.logger.log(`query参数：${JSON.stringify(query)}`);
    // }
    // if (JSON.stringify(params) !== '{}') {
    //   this.logger.log(`params参数：${JSON.stringify(params)}`);
    // }

    next()
  }
}

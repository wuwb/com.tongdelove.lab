import { Request, Response } from 'express';
import { Injectable, NestMiddleware, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * @class OriginMiddleware
 * @classdesc 用于验证是否为非法来源请求
 */
@Injectable()
export class OriginMiddleware implements NestMiddleware {
  private readonly logger = new Logger(OriginMiddleware.name);

  constructor(private readonly configService: ConfigService) { }

  use(request: Request, response: Response, next: () => void) {
    this.logger.debug('OriginMiddleware');
    this.logger.debug(
      `this.configService.get('isDev'): ${this.configService.get('isDev')}`,
    );

    // 如果是生产环境，需要验证用户来源渠道，防止非正常请求
    if (!this.configService.get('isDev')) {
      const { origin = [], referer = [] } = request.headers;

      // todo 从 configService 中获取配置
      const checkHeader = (field: string | string[]) => {
        return !field || field.includes('printlake.com');
      };

      const isVerifiedOrigin = checkHeader(origin);
      const isVerifiedReferer = checkHeader(referer);

      if (!isVerifiedOrigin && !isVerifiedReferer) {
        console.log('------------------------1');
        return response.status(HttpStatus.UNAUTHORIZED);
      }
    }

    next();
  }
}

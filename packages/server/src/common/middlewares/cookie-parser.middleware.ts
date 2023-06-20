import { Injectable, NestMiddleware } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { MyLoggerService } from '@/core/logger/winston/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CookieParserMiddleware implements NestMiddleware {
    private cookieParser: any;

    constructor(
        private readonly configService: ConfigService,
        private readonly logger: MyLoggerService,
    ) {
        this.cookieParser = cookieParser(this.configService.get('server.cookieSecret', ''));
    }

    use(request: Request, response: Response, next: () => void) {
        const req: any = request;
        const res: any = response;

        this.cookieParser(req, res, next);
    }
}

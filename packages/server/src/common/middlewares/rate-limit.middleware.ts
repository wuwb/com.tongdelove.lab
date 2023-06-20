import { Injectable, NestMiddleware } from '@nestjs/common';
import rateLimit from 'express-rate-limit';
import { ConfigService } from '../../config/config.service';
import { MyLoggerService } from '@/core/logger/winston/logger.service';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
    private rateLimit: any;

    constructor(
        private readonly configService: ConfigService,
        private readonly logger: MyLoggerService,
    ) {
        this.rateLimit = rateLimit({
            windowMs: this.configService.server.rateLimitWindowMs,
            max: this.configService.server.rateLimitMax,
        });
    }

    use(request: Request, response: Response, next: () => void) {
        const req: any = request;
        const res: any = response;

        this.rateLimit(req, res, next);
    }
}

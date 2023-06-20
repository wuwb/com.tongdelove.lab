import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '../../config/config.service';
import { MyLoggerService } from '@/core/logger/winston/logger.service';

@Injectable()
export class ChoreMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        private readonly logger: MyLoggerService,
    ) { }

    use(request: Request, response: Response, next: () => void) {
        const req: any = request;
        const res: any = response;

        next();
    }
}

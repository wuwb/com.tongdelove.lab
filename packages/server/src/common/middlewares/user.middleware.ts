import { Injectable, NestMiddleware, } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../../config/config.service';
import { User } from '@prisma/client';
import { MyLoggerService } from '@/core/logger/winston/logger.service';
import { UserService } from '@/modules/system/user/user.service';
import { RedisService } from '@/core/cache/redis/redis.service';
import { ErrorCode } from '../constants/error.constant';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        private readonly redisService: RedisService,
        private readonly userService: UserService,
        private readonly logger: MyLoggerService,
    ) { }

    use(request: Request, response: Response, next: any) {
        const req: any = request;
        const res: any = response;

        const tokenName: string = this.configService.server.tokenName;
        const tokenSecret: string = this.configService.server.tokenSecret;
        const token: string = req.cookies[tokenName] || '';
        req.user = null;
        res.locals.user = null;
        if (!token) {
            next();
            return;
        }

        jwt.verify(token, tokenSecret, { algorithms: ['HS256'] }, async (err, payload) => {
            if (err) {
                res.json({
                    errorCode: ErrorCode.TokenError.CODE,
                    message: 'token error',
                });
                return;
            }
            const userID = (payload as any).id;
            let userToken: string;
            let user: User;

            [userToken, user] = await Promise.all([
                this.redisService.getUserToken(userID),
                this.redisService.getUser(userID),
            ]);

            const isLogin = userToken && token === userToken;

            if (isLogin && !user) {
                user = await this.userService.get(userID);
            }
            if (isLogin) {
                req.user = user;
                res.locals.user = user;
            }
            next();
        });
    }
}

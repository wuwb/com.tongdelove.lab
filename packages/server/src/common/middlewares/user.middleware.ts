import { Injectable, NestMiddleware, } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { MyLoggerService } from '@/core/logger/winston/logger.service';
import { UserService } from '@/modules/system/user/user.service';
import { CacheService } from '@/core/cache/cache/cache.service';
import { ErrorCode } from '../constants/error.constant';

@Injectable()
export class UserMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        private readonly cacheService: CacheService,
        private readonly userService: UserService,
        private readonly logger: MyLoggerService,
    ) { }

    use(request: Request, response: Response, next: any) {
        const req: any = request;
        const res: any = response;

        const tokenName = this.configService.get('server.tokenName', '');
        const tokenSecret = this.configService.get('server.tokenSecret', '');
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
                this.cacheService.getUserToken(userID),
                this.cacheService.getUser(userID),
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

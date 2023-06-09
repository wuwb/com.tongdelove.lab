import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { AuthService } from '../auth.service';
import { IAuthStrategy } from "../interface/IAuthStrategy";
import { UserInfo } from "../interface/UserInfo";

@Injectable()
export class HttpBearerStrategy extends PassportStrategy(Strategy)
    implements IAuthStrategy {
    constructor(private readonly authService: AuthService) {
        super();
    }

    async validate(token: any, done: Function) {
        let authObject: { username: string, password: string };
        const decoded = Buffer.from(token, 'base64').toString();
        try {
            authObject = JSON.parse(decoded);
            const user = await this.authService.validateUser(
                authObject.username,
                authObject.password,
            );
            if (!user) {
                return done(new UnauthorizedException(), false);
            }
            done(null, user);
        } catch (e) {
            return done(new UnauthorizedException(), false);
        }
    }

    async validate2(username: string, password: string): Promise<UserInfo> {
        const user = await this.authService.validateUser(username, password);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

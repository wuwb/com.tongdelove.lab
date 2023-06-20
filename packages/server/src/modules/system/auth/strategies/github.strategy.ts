import { ConfigService } from '@nestjs/config';
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, StrategyOptions } from "passport-github2";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        // private readonly options: StrategyOptions
    ) {
        super({
            clientID: configService.get('github.clientID'),
            clientSecret: configService.get('github.clientSecret'),
            callbackURL: configService.get('github.callbackURL'),
            passReqToCallback: true
        });
    }

    async validate(
        req,
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: any, user: any, info: any) => void
    ) {
        // const user = null;

        // // 用户不存在创建用户
        // if (!user) {

        // }

        // // 用户存在，没有关联 github，进行关联
        // if (user.account.githubId) {

        // }

        // return done(null, user, { isNew: false });

    }
}

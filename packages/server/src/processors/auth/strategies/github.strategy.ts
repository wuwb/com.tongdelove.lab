import { ConfigService } from "@/config/config.service";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy, StrategyOptions } from "passport-github2";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly authService: AuthService,
        // private readonly options: StrategyOptions
    ) {
        super({
            clientID: (process.env.GH_CLIENT_ID || configService.get('github.clientID')),
            clientSecret: (process.env.GH_CLIENT_SECRET || configService.get('github.clientSecret')),
            callbackURL: configService.get('github.callbackURL'),
            passReqToCallback: true
        });
    }

    async validate(
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

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { LoginDto } from '@/modules/login/dto/login.dto';

// https://docs.nestjs.com/security/authentication
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private moduleRef: ModuleRef,
        private readonly authService: AuthService,
    ) {
        // 可以通过 super 的参数定制 local 登录的参数
        super({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true,  // 设置回调函数第一个参数为 request
        });
    }

    async validate(
        request,
        username: string,
        password: string
    ): Promise<any> {
        const contextId = ContextIdFactory.getByRequest(request);
        // "AuthService" is a request-scoped provider
        const authService = await this.moduleRef.resolve(AuthService, contextId);

        console.log(`username: ${username}`);
        console.log(`password: ${password}`);

        const body: LoginDto = request.body; // 获取请求体

        await this.authService.checkImageCaptcha(body.uuid, body.code);

        // 查询数据库，判断密码，密码正确的话，返回用户信息
        const user = await authService.validateUser(username, password);

        // 自定义错误类型，抛出异常
        // 没有找到用户，账号密码错误等
        if (!user) {
            throw new UnauthorizedException();
        }

        // return user to passport module
        return user;
    }
}

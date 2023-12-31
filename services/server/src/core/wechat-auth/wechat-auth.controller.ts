import {
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
    Body,
    Logger,
    Headers,
    Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IPService } from '@/shared/helper/helper.service.ip';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { WechatAuthService } from './wechat-auth.service';
import { WechatLoginDto } from './wechat-auth.interface';

@Controller('api/wechat-auth')
export class WechatAuthController {
    private readonly logger = new Logger(WechatAuthController.name);

    constructor(
        private readonly ipService: IPService,
        private readonly configService: ConfigService,
        private readonly wechatAuthService: WechatAuthService,
    ) {
        //
    }

    @ApiOperation({ summary: '微信登录跳转' })
    @Get('login')
    async wechatLogin(@Headers() header, @Res() res) {
        const APPID = this.configService.get('APPID');
        const redirectUri = encodeURI('http://lms.siyuanren.com/web/login_front.html');
        res.redirect(
            `https://open.weixin.qq.com/connect/qrconnect?appid=${APPID}&redirect_uri=${header.refere}&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect`,
        );
    }

    @ApiOperation({ summary: '微信登录' })
    @Post('wechat')
    async loginWithWechat(@Body('code') code: string) {
        return this.wechatAuthService.loginWithWechat(code);
    }

}

import { LoginService } from "./login.service";
import {
    Controller,
    Post,
    UseGuards,
    Body,
    Logger,
    Req,
    Get,
    Headers,
    HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '@/modules/system/auth/auth.service';
import { User, UserEnum } from '@/common/decorators/user.decorator';
import { IPService } from '@/utils/helper/helper.service.ip';
import { LocalAuthGuard } from '@/modules/system/auth/guards/local-auth.guard';
import { JwtAuthGuard } from '@/modules/system/auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserInfo } from './interface/UserInfo';
import { LoginDto } from "./dto/login.dto";
import { Public } from "@/common/decorators/public.decorator";
import { Request } from 'express';
import { DataObj } from "@/common/classes/data-obj.class";

@ApiTags('login')
@Controller('api/base/login')
export class LoginController {
    private readonly logger = new Logger(LoginController.name);

    constructor(
        private readonly loginService: LoginService,
        private readonly authService: AuthService,
    ) { }

    @Get('captchaImage')
    async captchaImage() {
        const result = await this.loginService.createImageCaptcha();
        return result;
    }

    @Post()
    @Public()
    @UseGuards(LocalAuthGuard)
    @HttpCode(200)
    async login(
        @Body() body: LoginDto,
        @Req() req: Request,
    ): Promise<UserInfo> {
        this.logger.log('登入后获取的用户信息', req.user);
        return this.loginService.login(body);
    }

    /* 获取用户信息 */
    @Get('getInfo')
    @UseGuards(JwtAuthGuard)
    async getUserInfo(@User(UserEnum.userId) userId: string) {
        return await this.loginService.getUserInfo(userId);
    }

    /* 获取用户路由信息 */
    @Get('getRouters')
    @UseGuards(JwtAuthGuard)
    async getRouters(@User(UserEnum.userId) userId: string) {
        const router = await this.loginService.getRouterByUser(userId);
        return router;
    }

    async register(@Body() body) {
        console.log('body: ', body);
        const user = await this.authService.register({
            repassword: body.password,
            ...body
        });
        return user;
    }

    @Post('forgot-password')
    @HttpCode(200)
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @Post('logout')
    @Public()
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    async logout(@Headers('Authorization') authorization: string) {
        if (authorization) {
            const token = authorization.slice(7);
            await this.loginService.logout(token);
        }
    }
}

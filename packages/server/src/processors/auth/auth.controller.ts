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
    HttpCode,
    Delete,
    ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDecorator } from '@/common/decorators/user.decorator';
// import { QueryParams } from '../../common/decorators/query-params.decorator';
import { IPService } from '../../utils/helper/helper.service.ip';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { UserInfo } from './UserInfo';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(
        private readonly ipService: IPService,
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
    ) { }

    // // local 登录后获取用户信息
    // @Get('data')
    // @UseGuards(AuthGuard())
    // findAll() {
    //   return 'data';
    // }

    // local.strategy.ts -> auth.service.ts
    @UseGuards(LocalAuthGuard)
    @Post('login')
    // @HttpCode(200)
    async login(
        // @QueryParams() { visitors: { ip } },
        @Body() body,
        @Request() req,
    ): Promise<UserInfo> {
        this.logger.log('登入后获取的用户信息', req.user);
        return this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body) {
        console.log('body: ', body);
        const user = await this.authService.register({
            repassword: body.password,
            ...body
        });
        return user;
    }

    @Post('verifyemail')
    verifyemail() {

    }

    @Post('forgot-password')
    forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
        return this.authService.forgotPassword(forgotPasswordDto.email);
    }

    @Post('reset-password')
    resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    logout() { }

    @Post('refresh')
    refresh() { }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async remote(@UserDecorator('id') id: string) {
        await this.authService.removeUser(id);
    }
}

import { LoginService } from './login.service'
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
  Header,
  ExecutionContext,
  Res,
} from '@nestjs/common'
import { AuthService } from '@/modules/system/auth/auth.service'
import { User, UserEnum } from '@/common/decorators/user.decorator'
import { LocalAuthGuard } from '@/modules/system/auth/guards/local-auth.guard'
import { JwtAuthGuard } from '@/modules/system/auth/guards/jwt-auth.guard'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { UserInfo } from './interface/UserInfo'
import { LoginDto } from './dto/login.dto'
import { Public } from '@/common/decorators/public.decorator'
import { Request } from 'express'
import * as captcha from 'trek-captcha'

@ApiTags('login')
@Controller('api/base/login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name)

  constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService
  ) {}

  // 获取 SVG 验证码
  @Get('captcha-image-svg')
  async captchaImage() {
    const result = await this.loginService.createImageCaptcha()
    return result
  }

  // 文字验证码
  @Get('captcha-image-code')
  @HttpCode(200)
  @Header('Cache-Control', 'none')
  async getImageCode(
    ctx: ExecutionContext,
    @User() user: any = {},
    @Res() res
  ) {
    const { token, buffer } = await captcha()
    user.imageCode = token
    buffer.pip(res)
  }

  /**
   * 用户登录
   */
  @Post()
  // @Public()
  // @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  async login(
    @Req() req: Request,
    @Body() loginDto: LoginDto
  ): Promise<UserInfo> {
    return this.loginService.login(req, loginDto)
  }

  // 获取用户信息
  @Get('get-info')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@User(UserEnum.userId) userId: string) {
    return await this.loginService.getUserInfo(userId)
  }

  // 获取用户路由信息
  @Get('get-routers')
  @UseGuards(JwtAuthGuard)
  async getRouters(@User(UserEnum.userId) userId: string) {
    const router = await this.loginService.getRouterByUser(userId)
    return router
  }

  // 用户注册
  async register(@Body() body) {
    const user = await this.authService.register({
      repassword: body.password,
      ...body,
    })
    return user
  }

  @Post('forgot-password')
  @HttpCode(200)
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto.email)
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto)
  }

  // 退出登录
  @Post('logout')
  @Public()
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async logout(@Headers('Authorization') authorization: string) {
    if (authorization) {
      const token = authorization.slice(7)
      await this.loginService.logout(token)
    }
  }
}

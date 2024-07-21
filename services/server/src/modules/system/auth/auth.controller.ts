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
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth.service'
import { User } from '@/common/decorators/user.decorator'
// import { QueryParams } from '@/common/decorators/query-params.decorator';
import { IPService } from '@/shared/helper/helper.service.ip'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { ConfigService } from '@nestjs/config'
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { ResetPasswordDto } from './dto/reset-password.dto'
import { UserInfo } from './interface/UserInfo'

@ApiTags('system/auth')
@Controller('api/system/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(
    private readonly ipService: IPService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService
  ) {}

  @Post('verifyemail')
  verifyemail() {}

  @Post('refresh')
  refresh() {}

  @UseGuards(JwtAuthGuard)
  @Delete()
  async remote(@User('id') id: string) {
    await this.authService.removeUser(id)
  }
}

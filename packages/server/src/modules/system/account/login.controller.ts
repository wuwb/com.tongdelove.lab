import { Controller, Post, Body, HttpCode, HttpStatus, Version, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { IpAddress } from '@/common/decorators/ip.address';
import { LoginResDto } from './dto/login.res.dto';

@ApiTags('后台-用户登录')
@Controller(`api/account/login`)
export class LoginController {
    private readonly logger = new Logger(LoginController.name);

    constructor(
        private readonly loginService: LoginService,
    ) { }

    @ApiOperation({
        summary: '用户登录',
        description: '用户名可以是手机号码、邮箱、用户名',
    })
    @ApiCreatedResponse({
        type: LoginResDto,
        description: '用户登录返回值'
    })
    @HttpCode(HttpStatus.OK)
    @Version('1')
    @Post()
    async adminLogin(
        @Body() loginDto: LoginDto,
        @IpAddress() ipAddress: string,
    ): Promise<LoginResDto> {
        this.logger.log(`用户登录：${loginDto.username}`);
        return this.loginService.adminLogin(loginDto, ipAddress);
    }
}

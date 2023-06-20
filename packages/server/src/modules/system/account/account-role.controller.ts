import {
    Controller,
    UseGuards,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Body,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import { AccountRoleService } from './account-role.service';
import { AccountRoleListResDto, RoleAccountListDto } from './dto/account-role.res.dto';
import { DistributionRoleDto } from './dto/distribution.role.dto';
import { ApiAuth } from '@/common/decorators/api.auth';

@ApiTags('后台-账号角色管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@ApiAuth()
@Controller(`api/account_role`)
export class AccountRoleController {
    constructor(private readonly accountRoleService: AccountRoleService) { }

    @ApiOperation({ summary: '获取角色列表', description: '根据当前的账号id获取角色已经授权的角色' })
    @ApiCreatedResponse({
        type: AccountRoleListResDto,
        isArray: true,
        description: '根据账号ID查询授权角色返回值',
    })
    @HttpCode(HttpStatus.OK)
    @Get(':accountId')
    async accountRoleListByAccountId(
        @Param('accountId') accountId: string,
    ): Promise<AccountRoleListResDto[] | undefined> {
        return this.accountRoleService.accountRoleListByAccountId(accountId);
    }

    @ApiOperation({ summary: '给账号分配角色', description: '给当前账号分配角色' })
    @ApiCreatedResponse({
        type: String,
        description: '给账号授权角色返回值',
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async distributionRole(@Body() distributionRoleDto: DistributionRoleDto): Promise<string> {
        return this.accountRoleService.distributionRole(distributionRoleDto);
    }

    @ApiOperation({ summary: '根据全部的角色', description: '给账号分配角色的时候使用' })
    @ApiCreatedResponse({
        type: RoleAccountListDto,
        isArray: true,
        description: '角色返回列表',
    })
    @Get()
    async roleList(): Promise<RoleAccountListDto[]> {
        return this.accountRoleService.roleList();
    }
}

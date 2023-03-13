import { Controller, UseGuards, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse } from '@nestjs/swagger';
import { AuthGuard } from '@/common/guards/auth.guard';
import adminConfig from '@/config/admin.config';
import { MenusService } from './menus.service';
import { MenusListResDto } from './dto/menus.res.dto';
import { CurrentUser, ICurrentUserType } from '@/common/decorators/current-user.decorator';

@ApiTags('后台管理系统-菜单管理')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`${adminConfig.adminPath}/menus`)
export class MenusController {
  constructor(private readonly menusService: MenusService) { }

  @ApiOperation({
    summary: '获取菜单列表',
    description: '获取菜单',
  })
  @ApiCreatedResponse({
    type: MenusListResDto,
    isArray: true,
    description: '获取菜单返回值',
  })
  @HttpCode(HttpStatus.OK)
  @Get()
  async menusList(@CurrentUser() userInfo: ICurrentUserType): Promise<MenusListResDto[]> {
    return this.menusService.menusList(userInfo);
  }
}

import {
  Controller,
  UseGuards,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common'
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
} from '@nestjs/swagger'
import { AuthGuard } from '@/common/guards/auth.guard'
import { MenusService } from './menus.service'
import { MenusListResDto } from './dto/menus.res.dto'
import {
  CurrentUser,
  ICurrentUserType,
} from '@/common/decorators/current-user.decorator'

@ApiTags('menus')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller(`api/menus`)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

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
  async menusList(
    @CurrentUser() userInfo: ICurrentUserType
  ): Promise<MenusListResDto[]> {
    return this.menusService.menusList(userInfo)
  }
}

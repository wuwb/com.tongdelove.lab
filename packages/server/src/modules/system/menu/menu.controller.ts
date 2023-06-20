import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MenuService } from "./menu.service";

@ApiTags('菜单管理')
@Controller('api/system')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get('auth/list-menus')
    async listMenus() {

    }
}

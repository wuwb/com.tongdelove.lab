import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { MenuService } from "./menu.service";

@ApiTags('system/menu')
@Controller('api/system')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }

    @Get('auth/list-menus')
    async listMenus() {

    }
}

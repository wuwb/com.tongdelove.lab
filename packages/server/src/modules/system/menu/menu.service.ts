import { PrismaService } from "@/core/database/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MenuService {

    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async getMenuList(isAdmin: boolean, roleIdArr: string[]) {
        const menu = await this.prisma.menu.findMany();
        return menu;
    }

    // 首字母大写
    firstToUpper(pathStr: string) {
        const str: any = pathStr.replace('/', '').trim();
        if (str) {
            return str.toLowerCase().replace(str[0], str[0].toUpperCase());
        }
        return '';
    }
}

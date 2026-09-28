import { Injectable } from '@nestjs/common'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { menu } from '@/core/database/drizzle/schema'

@Injectable()
export class MenuService {
  constructor(private readonly drizzle: DrizzleService) {}

  async getMenuList(isAdmin: boolean, roleIdArr: string[]) {
    const menuList = await this.drizzle.db.select().from(menu)
    return menuList
  }

  // 首字母大写
  firstToUpper(pathStr: string) {
    const str: any = pathStr.replace('/', '').trim()
    if (str) {
      return str.toLowerCase().replace(str[0], str[0].toUpperCase())
    }
    return ''
  }

  async getAllPermissionsByRoles(roleIdArr: string[]): Promise<string[]> {
    return []
  }
}

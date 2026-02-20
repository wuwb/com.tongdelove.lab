import { Injectable } from '@nestjs/common'
import { AccessEntity } from './entities/access.entity'
import { MenusListResDto } from './dto/menus.res.dto'
import { ICurrentUserType } from '@/common/decorators/current-user.decorator'

@Injectable()
export class MenusService {
  // logger = new Logger(MenusService.name);

  /**
   * 获取菜单列表
   */
  async menusList(userInfo: ICurrentUserType) {
    /**
     * 根据用户权限来返回菜单
     * 1.查询全部的菜单
     * 2.如果是超级管理员就返回全部菜单
     * 3.非超级管理员，根据当前用户拥有的角色去查询(角色资源)表获取全部的资源
     */
    // const { id, isSuper } = userInfo
    // // 超级管理员就全部返回
    // if (Object.is(isSuper, AdminIdentityEnum.SUPPER)) {
    //   // 1.查询全部的菜单(模块和菜单)
    //   const accessList: AccessEntity[] = await this.accessRepository.find({
    //     where: [
    //       {
    //         type: `${AccessTypeEnum.MODULE}`,
    //       },
    //       {
    //         type: `${AccessTypeEnum.MENUS}`,
    //       },
    //     ],
    //   })
    //   // 1.1格式化菜单
    //   return this.formatMenus(accessList)
    // } else {
    //   // 2.根据当前账号id查询已经授权的角色
    //   const authRoleList: AccountRoleEntity[] =
    //     await this.accountRoleRepository.find({
    //       where: { accountId: id },
    //       select: ['roleId'],
    //     })
    //   const authRoleIdList: string[] = authRoleList.map(
    //     (item: AccountRoleEntity) => item.roleId
    //   )
    //   console.log(authRoleList, '授权的角色列表', authRoleIdList)
    //   // 3.根据角色ID列表获取当前账号拥有的资源id
    //   const authAccessList: RoleAccessEntity[] = await getConnection()
    //     .createQueryBuilder(RoleAccessEntity, 'role_access')
    //     .select(['role_access.accessId'])
    //     .where('role_access.roleId in (:...roleId) and role_access.type = 2', {
    //       roleId: authRoleIdList,
    //     })
    //     .getMany()
    //   console.log(authAccessList, '授权的资源列表') // [ RoleAccessEntity { accessId: 5 } ]
    //   const authAccessIdList: string[] = authAccessList.map(
    //     (item: RoleAccessEntity) => item.accessId
    //   )
    //   // 4.根据资源id去查询菜单并且格式化返回
    //   const accessList = await getConnection()
    //     .createQueryBuilder(AccessEntity, 'access')
    //     .select([
    //       'access.id',
    //       'access.moduleName',
    //       'access.actionName',
    //       'access.parentId',
    //       'access.url',
    //       'access.sort',
    //       'access.icon',
    //     ])
    //     .where(
    //       '(access.id in (:...authAccessIdList) and (access.type = 1 or access.type = 2))',
    //       {
    //         authAccessIdList,
    //       }
    //     )
    //     .getMany()
    //   return this.formatMenus(accessList)
    // }
  }

  createMenu() {}

  updateMenu() {}

  deleteMenu() {}

  // 保存顺序
  saveOrder() {}

  fuzzySearch() {}

  // 格式化返回菜单
  private formatMenus(accessList: AccessEntity[]): MenusListResDto[] {
    return accessList.map((item: AccessEntity) => {
      const { id, moduleName, actionName, parentId, url, sort, icon } = item
      return {
        id,
        name: moduleName ? moduleName : actionName,
        parentId,
        url,
        sort,
        icon,
      }
    })
  }
}

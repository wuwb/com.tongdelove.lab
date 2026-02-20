import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { RoleAccessReqDto } from '../dto/role.access.req.dto'

@Injectable()
export class RoleAccessService {
  /**
   * 给当前角色 ID 授权菜单、接口权限
   */
  async roleToAccess(roleId: string, roleAccessReqDto: RoleAccessReqDto) {
    // return getManager()
    //   .transaction(async (entityManager: EntityManager) => {
    //     const { accessList, type } = roleAccessReqDto
    //     await entityManager.delete<RoleAccessEntity>(RoleAccessEntity, {
    //       roleId,
    //       type,
    //     })
    //     const newAccessList = accessList.map((item: string) => {
    //       return {
    //         roleId,
    //         type,
    //         accessId: item,
    //       }
    //     })
    //     const result = entityManager.create(
    //       RoleAccessEntity,
    //       newAccessList
    //     )
    //     await entityManager.save<RoleAccessEntity>(result)
    //   })
    //   .then(() => {
    //     return '分配菜单权限成功'
    //   })
    //   .catch((e: HttpException) => {
    //     throw new HttpException(e, HttpStatus.OK)
    //   })
  }

  /**
   * 获取全部的菜单,可授权的
   */
  async allMenus() {
    // const menusList = await this.accessRepository.find({
    //   where: [
    //     { type: `${AccessTypeEnum.MODULE}` },
    //     { type: `${AccessTypeEnum.MENUS}` },
    //   ],
    //   select: ['id', 'moduleName', 'actionName', 'parentId'],
    //   order: { sort: 'ASC', createdAt: 'DESC' },
    // })
    // return menusList.map((item: AccessEntity) => {
    //   return {
    //     id: item.id,
    //     key: String(item.id),
    //     title: item.moduleName ? item.moduleName : item.actionName,
    //     parentId: item.parentId,
    //   }
    // })
  }

  /**
   * 获取全部的 API
   */
  async allApi() {
    // return this.accessRepository.find({
    //   where: { type: `${AccessTypeEnum.OPERATION}` },
    //   select: ['id', 'apiName'],
    //   order: { sort: 'ASC', createdAt: 'DESC' },
    // })
  }

  /**
   * 根据角色id返回授权的资源列表
   */
  async accessListByRoleId(roleId: string, type: number) {
    // return this.roleAccessRepository.find({
    //   where: { roleId, type },
    //   select: ['id', 'accessId'],
    // })
  }
}

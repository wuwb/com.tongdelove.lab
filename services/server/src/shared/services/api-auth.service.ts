import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { ICurrentUserType } from '@/common/decorators/current-user.decorator'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, getConnection, DataSource } from 'typeorm'

import { AccountRoleEntity } from '@/modules/system/account/entities/account-role.entity'
import { AccessEntity } from '@/modules/system/access/entities/access.entity'
import { RoleAccessEntity } from '@/modules/system/role/entities/role-access.entity'

@Injectable()
export class ApiAuthService {
  constructor(
    @InjectRepository(AccountRoleEntity)
    private readonly accountRoleRepository: Repository<AccountRoleEntity>,
    @InjectRepository(AccessEntity)
    private readonly accessRepository: Repository<AccessEntity>,
    private readonly dataSource: DataSource
  ) {}

  /**
   * 拦截api
   */
  public async apiAuth(
    user: ICurrentUserType,
    method: string,
    url: string
  ): Promise<boolean> {
    const { isSuper, id } = user
    // 1.如果是超级管理员就直接返回true
    if (isSuper) {
      return true
    } else {
      // 2.根据当前账号id获取当前账号拥有的角色id
      const authRoleList: AccountRoleEntity[] =
        await this.accountRoleRepository.find({
          where: { accountId: id },
          select: ['roleId'],
        })
      const authRoleIdList = authRoleList.map(
        (item: AccountRoleEntity) => item.roleId
      )
      console.log(authRoleList, '授权的角色列表')
      // 3.根据角色ID列表获取当前账号拥有的资源id
      const authAccessList = await getConnection()
        .createQueryBuilder(RoleAccessEntity, 'role_access')
        .select(['role_access.accessId', 'role_access.type'])
        .where('role_access.roleId in (:...roleId)', { roleId: authRoleIdList })
        .getMany()
      console.log(authAccessList, '授权的资源列表') // [ RoleAccessEntity { accessId: 5, type: 3 } ]
      const formatUrl = this.formatUrl(method, url)
      // 4.根据请求方式和路径去查询数据
      const accessResult = await this.accessRepository.findOne({
        where: { method, url: formatUrl },
        select: ['id', 'type'],
      })
      console.log(accessResult, '当前请求的资源')
      const isExist = authAccessList.find(
        (item: RoleAccessEntity) =>
          item.accessId === accessResult?.id &&
          Number(item.type) === Number(accessResult?.type)
      )
      if (isExist) {
        return true
      } else {
        throw new HttpException(
          `当前账号没操作:${method}-${url}的权限`,
          HttpStatus.OK
        )
      }
    }
  }

  private formatUrl(method: string, url: string): string {
    switch (method) {
      case 'GET':
        // 去除问号后面的
        return url.substring(0, url.indexOf('?'))
      case 'DELETE':
      case 'PATCH':
      case 'PUT':
        // url最后一个改为*通配符
        return url.replace(/(.*?\/)\d+$/, '$1*')
      default:
        return url
    }
  }
}

import { RoleEntity } from '../role/entities/role.entity'
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common'
import { AccountRoleEntity } from './entities/account-role.entity'
import { RoleAccountListDto } from './dto/account-role.res.dto'
import { DistributionRoleDto } from './dto/distribution.role.dto'

@Injectable()
export class AccountRoleService {
  private readonly logger: Logger = new Logger(AccountRoleService.name)

  /**
   * 根据账号 id 获取授权的角色列表
   */
  async accountRoleListByAccountId(accountId: string) {
    // return this.accountRoleRepository.find({
    //   where: { accountId },
    //   select: ['id', 'roleId'],
    // })
  }

  /**
   * 根据角色 id 获取账号列表
   */
  async accountListByRoleId(roleId: string) {
    // return this.accountRoleRepository.find({
    //   where: { roleId },
    //   select: ['id', 'accountId'],
    // })
  }

  /**
   * 给账号分配角色
   */
  async distributionRole(distributionRoleDto: DistributionRoleDto) {
    // const { accountId, roleList } = distributionRoleDto
    // return getManager()
    //   .transaction(async (entityManager: EntityManager) => {
    //     await entityManager.delete<AccountRoleEntity>(AccountRoleEntity, {
    //       accountId,
    //     })
    //     for (const item of roleList) {
    //       const result = entityManager.create(
    //         AccountRoleEntity,
    //         {
    //           accountId,
    //           roleId: item,
    //         }
    //       )
    //       await entityManager.save(result)
    //     }
    //   })
    //   .then(() => {
    //     return '分配角色成功'
    //   })
    //   .catch((e: HttpException) => {
    //     throw new HttpException(`给账号分配角色失败:${e}`, HttpStatus.OK)
    //   })
  }
}

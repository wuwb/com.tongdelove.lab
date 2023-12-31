import { RoleEntity } from '../role/entities/role.entity';
import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccountRoleEntity } from './entities/account-role.entity';
import { Repository, getManager, EntityManager, getConnection } from 'typeorm';
import {
  AccountRoleListResDto,
  RoleAccountListDto,
} from './dto/account-role.res.dto';
import { DistributionRoleDto } from './dto/distribution.role.dto';

@Injectable()
export class AccountRoleService {
  private readonly logger: Logger = new Logger(AccountRoleService.name);

  constructor(
    @InjectRepository(AccountRoleEntity)
    private readonly accountRoleRepository: Repository<AccountRoleEntity>,
  ) { }

  /**
   * 根据账号 id 获取授权的角色列表
   */
  async accountRoleListByAccountId(
    accountId: string,
  ): Promise<AccountRoleListResDto[] | undefined> {
    return this.accountRoleRepository.find({
      where: { accountId },
      select: ['id', 'roleId'],
    });
  }

  /**
   * 根据角色 id 获取账号列表
   */
  async accountListByRoleId(roleId: string): Promise<AccountRoleListResDto[] | undefined> {
    return this.accountRoleRepository.find({
      where: { roleId },
      select: ['id', 'accountId'],
    });
  }

  /**
   * 给账号分配角色
   */
  async distributionRole(distributionRoleDto: DistributionRoleDto): Promise<string> {
    const { accountId, roleList } = distributionRoleDto;
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        await entityManager.delete<AccountRoleEntity>(AccountRoleEntity, { accountId });
        for (const item of roleList) {
          const result = entityManager.create<AccountRoleEntity>(AccountRoleEntity, {
            accountId,
            roleId: item,
          });
          await entityManager.save(result);
        }
      })
      .then(() => {
        return '分配角色成功';
      })
      .catch((e: HttpException) => {
        throw new HttpException(`给账号分配角色失败:${e}`, HttpStatus.OK);
      });
  }

  /**
   * Add a role to the user
   * @param userId
   * @param roleId
   */
  async addUserRole(userId: string, roleId: string): Promise<string> {
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        const result = entityManager.create<AccountRoleEntity>(AccountRoleEntity, {
          accountId: userId,
          roleId,
        });
        await entityManager.save(result);
      })
      .then(() => {
        return '添加角色成功';
      })
      .catch((e: HttpException) => {
        throw new HttpException(`添加角色失败:${e}`, HttpStatus.OK);
      });
  }

  /**
   * Delete a role from the user
   */
  async deleteUserRole(accountId: string, roleId: string): Promise<string> {
    return getManager()
      .transaction(async (entityManager: EntityManager) => {
        await entityManager.delete<AccountRoleEntity>(AccountRoleEntity, {
          accountId,
          roleId,
        });
      })
      .then(() => {
        return '删除角色成功';
      })
      .catch((e: HttpException) => {
        throw new HttpException(`删除角色失败:${e}`, HttpStatus.OK);
      });
  }

  /**
   * 获取全部的角色
   */
  async roleList(): Promise<RoleAccountListDto[]> {
    return getConnection()
      .createQueryBuilder(RoleEntity, 'role')
      .select(['role.id', 'role.name'])
      .getMany();
  }

}

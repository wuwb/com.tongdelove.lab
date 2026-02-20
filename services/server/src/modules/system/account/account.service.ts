import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { isMobilePhone, isEmail } from 'class-validator'
import { usernameReg } from '@/common/constants/reg.constant'
import { AccountEntity } from './entities/account.entity'
import { CreateAccountDto } from './dto/create.account.dto'
import { UpdateAccountDto } from './dto/update.account.dto'
import { ModifyPasswordDto } from './dto/modify.password.dto'
import { AccountResDto } from './dto/account.res.dto'
import { AccountReqDto } from './dto/account.req.dto'
import { PrismaService } from '@/core/database/prisma/prisma.service'

@Injectable()
export class AccountService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 创建账号
   * TODO: 增加密码，让用户可以自己设置密码
   */
  async createAccount(createAccountDto: CreateAccountDto) {
    const { username, email, mobile } = createAccountDto
    const queryConditionList: string[] = []
    if (username) {
      queryConditionList.push('account.username = :username')
    }
    if (email) {
      queryConditionList.push('account.email = :email')
    }
    if (mobile) {
      queryConditionList.push('account.mobile = :mobile')
    }
    const queryCondition = queryConditionList.join(' OR ')
 
  }

  /**
   * 根据用户 id 重置为默认密码
   */
  async resetPassword(id: string) {
    // const {
    //   raw: { affectedRows },
    // } = await this.accountRepository.update(id, {
    //   password: this.helperService.makePassword(
    //     this.configService.get('defaultPassword', '')
    //   ),
    // })
    // if (affectedRows) {
    //   return '重置成功'
    // } else {
    //   return '重置失败'
    // }
  }

  /**
   *  根据 id 删除账号
   */
  async destroyById(id: string) {
    // if (id === 1) {
    //     throw new HttpException('系统默认生成的账号不能删除', HttpStatus.OK);
    // }
    // const {
    //   raw: { affectedRows },
    // } = await this.accountRepository.softDelete(id)
    // if (affectedRows) {
    //   return '删除成功'
    // } else {
    //   return '删除失败'
    // }
  }

  /**
   * 根据账号 id 修改密码
   */
  async modifyPassWordById(id: string, modifyPasswordDto: ModifyPasswordDto) {
    // if (id === 1) {
    //     throw new HttpException('系统默认生成的账号不能修改密码', HttpStatus.OK);
    // }
    // const { password, newPassword } = modifyPasswordDto
    // const findResult = await getConnection()
    //   .createQueryBuilder(AccountEntity, 'account')
    //   .select([])
    //   .addSelect('account.password', 'password')
    //   .where('(account.id = :id)', { id })
    //   .getRawOne()
    // if (
    //   findResult?.password &&
    //   this.helperService.checkPassword(password, findResult?.password)
    // ) {
    //   const {
    //     raw: { affectedRows },
    //   } = await this.accountRepository.update(id, {
    //     password: this.helperService.makePassword(newPassword),
    //   })
    //   if (affectedRows) {
    //     return '修改成功'
    //   } else {
    //     return '修改失败'
    //   }
    // } else {
    //   throw new HttpException(
    //     '你输入的旧密码错误或输入的账号id不存在',
    //     HttpStatus.OK
    //   )
    // }
  }

  /**
   * 根据账号 id 修改账号信息
   */
  async modifyById(id: string, updateAccountDto: UpdateAccountDto) {
    // if (id === 1) {
    //     throw new HttpException('系统默认生成的账号不能修改信息', HttpStatus.OK);
    // }
    // const { username, email, mobile, status, platform } = updateAccountDto
    // const result = await this.accountRepository.findOne({
    //   where: {
    //     id,
    //   },
    // })
    // if (!result) {
    //   throw new Error('修改失败')
    // }
    // await this.accountRepository.save(
    //   Object.assign(result, { username, email, mobile, status, platform })
    // )
    // return '修改成功'
  }

  /**
   * Delete user to recycle bin or ban user
   */
  async recycleOrBanUser(id: string, action: 'recycle' | 'ban') {
    // if (id === 1) {
    //     throw new HttpException('系统默认生成的账号不能删除', HttpStatus.OK);
    // }
    // let status = 1
    // if (action === 'ban') {
    //   status = 0
    // }
    // if (action === 'recycle') {
    //   status = 2
    // }
    // const {
    //   raw: { affectedRows },
    // } = await this.accountRepository.update(id, {
    //   status,
    // })
    // if (affectedRows) {
    //   return '操作成功'
    // } else {
    //   return '操作失败'
    // }
  }

  /**
   * Revert user from recycle bin or ban user
   */
  async revertRecycleOrBanUser(id: string) {
    // if (id === '1') {
    //     throw new HttpException('系统默认生成的账号不能恢复', HttpStatus.OK);
    // }
    // const {
    //   raw: { affectedRows },
    // } = await this.accountRepository.update(id, {
    //   status: 1,
    // })
    // if (affectedRows) {
    //   return '操作成功'
    // } else {
    //   return '操作失败'
    // }
  }

  /**
   * 根据账号 id 查询账号信息
   */
  async accountById(id: string) {
    // return this.accountRepository.findOne({
    //   where: {
    //     id,
    //   },
    // })
  }

  /**
   * 根据条件查询账号列表
   */
  async accountList(accountReqDto: AccountReqDto) {
    // const {
    //   limit = PageEnum.PAGE_NUMBER,
    //   page = PageEnum.PAGE_SIZE,
    //   email,
    //   username,
    //   mobile,
    //   status,
    //   platform,
    // } = accountReqDto
    // const queryConditionList: string[] = []
    // if (username) {
    //   queryConditionList.push('account.username LIKE :username')
    // }
    // if (email) {
    //   queryConditionList.push('account.email = :email')
    // }
    // if (mobile) {
    //   queryConditionList.push('account.mobile = :mobile')
    // }
    // // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    // if (
    //   /^\d$/.test(String(status)) &&
    //   [StatusEnum.NORMAL, StatusEnum.FORBIDDEN].includes(Number(status))
    // ) {
    //   queryConditionList.push('account.status = :status')
    // }
    // if (
    //   /^\d$/.test(String(platform)) &&
    //   [PlatformEnum.ADMIN_PLATFORM, PlatformEnum.MERCHANT_PLATFORM].includes(
    //     Number(platform)
    //   )
    // ) {
    //   queryConditionList.push('account.platform = :platform')
    // }
    // const queryCondition = queryConditionList.join(' AND ')
    // const data = await getConnection()
    //   .createQueryBuilder(AccountEntity, 'account')
    //   .select('account.id', 'id')
    //   .addSelect('account.username', 'username')
    //   .addSelect('account.mobile', 'mobile')
    //   .addSelect('account.email', 'email')
    //   .addSelect('account.status', 'status')
    //   .addSelect('account.platform', 'platform')
    //   .addSelect('account.isSuper', 'isSuper')
    //   .addSelect('account.createdAt', 'createdAt')
    //   .addSelect('account.updatedAt', 'updatedAt')
    //   .addSelect(
    //     (qb) =>
    //       qb
    //         .select('lastLogin.lastLoginIp')
    //         .from(AccountLastLoginEntity, 'lastLogin')
    //         .where('(lastLogin.accountId = account.id)')
    //         .orderBy({ 'lastLogin.id': 'DESC' })
    //         .limit(1),
    //     'lastLoginIp'
    //   )
    //   .addSelect(
    //     (qb) =>
    //       qb
    //         .select('lastLogin.lastLoginAddress')
    //         .from(AccountLastLoginEntity, 'lastLogin')
    //         .where('(lastLogin.accountId = account.id)')
    //         .orderBy({ 'lastLogin.id': 'DESC' })
    //         .limit(1),
    //     'lastLoginAddress'
    //   )
    //   .addSelect(
    //     (qb) =>
    //       qb
    //         .select('lastLogin.lastLoginTime')
    //         .from(AccountLastLoginEntity, 'lastLogin')
    //         .where('(lastLogin.accountId = account.id)')
    //         .orderBy({ 'lastLogin.id': 'DESC' })
    //         .limit(1),
    //     'lastLoginTime'
    //   )
    //   .where(queryCondition, { username, email, mobile, status, platform })
    //   .skip((limit - 1) * page)
    //   .take(page)
    //   .printSql()
    //   .getRawMany()
    // const total = await getConnection()
    //   .createQueryBuilder(AccountEntity, 'account')
    //   .where(queryCondition, { username, email, mobile, status, platform })
    //   .getCount()
    // // 处理当前手机号码或者邮箱不合法的时候
    // const formatData = data.map((item) => {
    //   const { username, mobile, email } = item
    //   return {
    //     ...item,
    //     mobile: isMobilePhone(mobile, 'zh-CN') ? mobile : '',
    //     email: isEmail(email) ? email : '',
    //     username: usernameReg.test(username) ? username : '',
    //   }
    // })
    // return {
    //   data: formatData,
    //   total,
    //   page,
    //   limit,
    // }
  }

  async findCurrentUser() {}

  async create(data) {
  }
}

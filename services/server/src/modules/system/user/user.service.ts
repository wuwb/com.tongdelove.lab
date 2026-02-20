import {
  Injectable,
  HttpException,
  Logger,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User, Prisma } from '@prisma/client'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { ApiException } from '@/common/exceptions/api.exception'
import { QueryUserDto } from './dto/query-user.dto'

const userWithRoles = Prisma.validator<any>()({
  include: {
    roles: {
      select: {
        id: true,
        key: true,
      },
    },
    dept: {
      select: {
        id: true,
        name: true,
      },
    },
  },
})
type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name)

  constructor(private readonly prisma: PrismaService) {}

  // typeorm

  // 根据用户名查找已经启用的用户
  async tfindByLogin(login: string) {
    // return this.userRepository.findOneBy({
    //   login: login,
    //   status: 1,
    // })
  }

  async tfindByEmail(email: string) {
    // const user = await this.userRepository.findOne({
    //   where: {
    //     email,
    //   },
    // })
    // if (!user) {
    //   throw new HttpException(
    //     'A user with this email does not exist.',
    //     HttpStatus.NOT_FOUND
    //   )
    // }
    // return user
  }

  // 更新个人信息
  async updateAccountInfo(id: string, info): Promise<void> {
    // const user = await this.userRepository.findOneBy({
    //   id,
    // })
    // if (isEmpty(user)) {
    //   throw new ApiException(10017)
    // }
    // const data = {
    //   ...(info.nickName ? { nickName: info.nickName } : null),
    //   ...(info.avatar ? { avatar: info.avatar } : null),
    //   ...(info.email ? { email: info.email } : null),
    //   ...(info.phone ? { phone: info.phone } : null),
    //   ...(info.qq ? { qq: info.qq } : null),
    //   ...(info.remark ? { remark: info.remark } : null),
    // }
    // // 自动获取 QQ 头像，todo，提供手动设置头像的功能
    // if (!info.avatar && info.qq) {
    //   // 如果qq不等于原qq，则更新qq头像
    //   if (info.qq !== user.qq) {
    //     data.avatar = await this.qqService.getAvatar(info.qq)
    //   }
    // }
    // await this.userRepository.update(id, data)
  }

  async tcreate(dto: CreateUserDto) {
    // const user = this.userRepository.create(dto)
    // const salt = bcryptjs.genSaltSync(10)
    // user.pass = bcryptjs.hashSync(user.pass, salt)
    // return this.userRepository
    //   .save(user)
    //   .then((res) => {
    //     return {
    //       id: res.id,
    //     }
    //   })
    //   .catch((err) => {
    //     throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    //   })
  }

  // 添加用户
  async tcreate2(param: CreateUserDto): Promise<void> {
    // const exists = await this.userRepository.findOne({
    //   where: {},
    // })
    // if (!isEmpty(exists)) {
    //   throw new ApiException(10001)
    // }
    // await this.entityManager.transaction(async (manager) => {
    //   const salt = generateRandomValue(32)
    //   // 查找配置的初始密码
    //   const initPassword = await this.configService.get('prisma.initPassword')
    //   const password = ''
    //   const u = manager.create(UserEntity, {
    //     departmentId: param.departmentId,
    //     login: param.login,
    //     pass: password,
    //     nicename: 'TD_xxx', // 自动生成，用于显示在链接中
    //     email: param.email,
    //     phone: param.phone,
    //   })
    //   const result = await manager.save(u)
    //   const { roles } = param
    //   const insertRoles = roles.map((e) => {
    //     return {
    //       roleId: e,
    //       userId: result.id,
    //     }
    //   })
    //   // 分配角色
    //   await manager.insert(UserRole, insertRoles)
    // })
  }

  // 获取用户信息
  async getAccountInfo(id: string): Promise<any> {
    // const user = await this.userRepository.findOneBy({
    //   id,
    // })
    // if (isEmpty(user)) {
    //   throw new ApiException(10017)
    // }
    // return {
    //   login: user.login,
    //   nicename: user.nicename,
    // }
  }

  // prisma
  async all(): Promise<User[]> {
    return []
  }

  async findUsers<T extends Prisma.UserFindManyArgs>(
    query: QueryUserDto,
    page,
    limit,
    args: Prisma.SelectSubset<T, Prisma.UserFindManyArgs>
  ) {
    this.logger.debug(query)
    const skip = (page - 1) * limit
    const [data, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where: query,
        skip,
        take: limit,
        ...(args as any),
      }),
      this.prisma.user.count({
        where: query,
      }),
    ])
    return { data, total }
  }

  async get<T extends Prisma.UserFindUniqueArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
  ) {
    this.logger.log(`findOne args: ${args}`)
    const user = await this.prisma.user.findUnique(args)

    if (!user) {
      throw new ApiException(10001, '未找到用户')
    }

    return user
  }

  async getByUsername(username: string) {
    this.logger.log('login: ', username)
    return this.prisma.user.findUnique({
      where: {
        username,
      },
    })
  }

  async getByUsernameState(username: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: username,
      },
      select: {
        id: true,
        password: true,
      },
    })
    return user
  }

  // 返回用户公开的基本信息
  async basicInfo(id: string): Promise<Partial<User> | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    })
    return user
  }

  async detailInfo(id: string): Promise<Partial<User> | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        username: true,
        createdAt: true,
      },
    })
    return user
  }

  async findById(id: string): Promise<Partial<UserWithRoles> | null> {
    const params = {
      where: {
        id,
      },
      include: {
        roles: {
          select: {
            id: true,
            key: true,
          },
        },
        dept: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    }
    return this.prisma.user.findUnique(params)
  }

  async findByLogin(login: string): Promise<User | null> {
    this.logger.log('login: ', login)
    return this.prisma.user.findUnique({
      where: {
        login,
      },
    })
  }

  async findByMobilePhone(login: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        login,
      },
    })
  }

  async findOneWithRoles(loginName: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        login: loginName,
      },
    })
    if (!user) {
      throw new HttpException('User does not exist', 404)
    }
    return user
  }

  async findByResetToken(resetKey: string) {
    const user = this.prisma.user.findFirst({
      where: {
        resetKey,
      },
    })

    if (!user) {
      throw new HttpException(
        'A user with this email does not exist.',
        HttpStatus.NOT_FOUND
      )
    }

    return user
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      throw new HttpException(
        'A user with this email does not exist.',
        HttpStatus.NOT_FOUND
      )
    }
    return user
  }

  async findByIdentifier(identifier: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            login: identifier,
          },
          {
            email: identifier,
          },
        ],
      },
    })

    if (!user) {
      throw new HttpException(
        'A user with this username/email does not exist.',
        HttpStatus.NOT_FOUND
      )
    }

    return user
  }

  async findByResetKey() {}

  async findByUsername() {}

  // 创建普通账号，创建谷歌登录账号
  async create(args): Promise<User> {
    return this.prisma.user.create(args)
  }

  // Add a role to the user
  async addUserRole(userId: string, roleId: string) {}

  // Delete a role from the user
  async deleteUserRole(userId: string, roleId: string) {}

  async recycleOrBanUser(id: string, action: 'recycle' | 'ban'): Promise<void> {
    const user = await this.findById(id)
    // if (action === 'recycle') {
    //     user.recycle = true;
    // }
    // if (action === 'ban') {
    //     user.banned = true;
    // }
    // return this.prisma.user.save(user);
  }

  async update<T extends Prisma.UserUpdateArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
  ): Promise<User> {
    return this.prisma.user.update<T>(args)
  }

  async updateStatus(userId: string, status, operatorRole) {}

  // 更新用户信息(头像、职位、公司、个人介绍、个人主页)
  async updateUserInfo(userId, updateUserInfoDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        login: updateUserInfoDto.login,
      },
      select: {
        id: true,
      },
    })
    if (user) {
      throw new ApiException(10001, `已经存在名为`)
    }
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...updateUserInfoDto,
      },
    })
  }

  async updateById(id: string, data) {
    const updatedUser = await this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
    return updatedUser
  }

  async updateByRemoveActivationKey(id) {
    let undefinedActivationKey
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        activationKey: undefinedActivationKey,
      },
    })
  }

  async updatePassword(userId, oldPass, pass): Promise<boolean> {
    let user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      throw new ApiException(10001, '未找到用户')
    }

    // 验证老密码

    // 更新新密码
    user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        pass: pass,
      },
    })
    return true
  }

  async delete<T extends Prisma.UserDeleteArgs>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs>
  ): Promise<User> {
    return this.prisma.user.delete(args)
  }

  async remove(where: Partial<Prisma.UserWhereUniqueInput>) {}

  async removeById(id: string) {
    const user = await this.findById(id)
    if (!user) {
      throw new NotFoundException('user not found')
    }
    // 同时删除角色信息
    return this.prisma.user.delete({
      where: {
        id,
      },
    })
  }

  async revertBannedOrRecycledUser(id: string, status: 'recycle' | 'banned') {
    const user = await this.findById(id)
    // if (status === 'recycled') {
    //     user.recycle = false;
    // }
    // if (status === 'banned') {
    //     user.banned = false;
    // }
    // await this.userRepo.save(user);
  }

  // others

  async existsByUsername() {}

  async existsByEmail() {}

  async getProfileImageBuffer() {}

  async uploadProfileImage() {}

  async deleteProfileImage() {}

  // get relations

  async getVotes() {
    //
  }

  async getCurrentUserId() {
    //
  }

  async getUserOption(option, user) {
    if (!user) {
      user = this.getCurrentUserId()
    }
  }

  async banOrUnbanUser() {}

  async verifyUpdatedEmail(token: string) {}

  async disableUser() {}

  async activateUser() {}

  async sendActivationMail() {}
}

import { Exclude, Expose, Transform } from 'class-transformer'
import { PostEntity } from '@/modules/cms/post/entities/post.entity'
import * as crypto from 'crypto'
import { IsEmail } from 'class-validator'
import { BaseEntity } from '@/shared/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'

export class UserEntity extends BaseEntity {
  // 登录的用户名
  @ApiProperty()
  login: string

  // 密码
  @Exclude()
  @ApiProperty()
  pass: string

  // 用于 the url in the user’s profile page when using pretty permalinks
  // 昵称，没有设置的话，生成一个内部 id，比如京东的 JDLKFJSDLFJ
  @ApiProperty()
  nicename: string

  @IsEmail()
  @ApiProperty()
  email: string

  // 网址
  @ApiProperty()
  url: string

  // 注册时间
  @ApiProperty()
  registered: Date

  // 账号激活代码
  @ApiProperty()
  activationKey: string

  // 状态
  @ApiProperty()
  status: number

  @ApiProperty()
  displayName: string

  // =============================================

  @ApiProperty()
  age: number

  phone: string

  @ApiProperty()
  qq: string

  @ApiProperty()
  wangwang: string

  @ApiProperty()
  spam: number

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  platform: number

  @ApiProperty()
  isSuper: number

  @ApiProperty()
  avatar: string

  // 部门，外部用户默认加入到一个全局的池子中
  @ApiProperty()
  departmentId: string

  @ApiProperty()
  psalt: string

  // 账号重置密码
  @ApiProperty()
  resetKey: string

  posts: PostEntity[]

  hashPassword() {
    this.pass = crypto.createHmac('sha256', this.pass).digest('hex')
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  birthDay: Date

  logInsert() {
    console.log('Inserted User with id', this.id)
  }

  logUpdate() {
    console.log('Updated User with id', this.id)
  }

  logRemove() {
    console.log('Removed User with id', this.id)
  }
}

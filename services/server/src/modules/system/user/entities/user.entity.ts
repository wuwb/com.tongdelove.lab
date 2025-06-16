import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  BeforeInsert,
  ManyToMany,
  JoinTable,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm'
import { Exclude, Expose, Transform } from 'class-transformer'
import { PostEntity } from '@/modules/cms/post/entities/post.entity'
import * as crypto from 'crypto'
import { IsEmail } from 'class-validator'
import { BaseEntity } from '@/shared/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'

// 用户表
@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  // wordpress 参考表
  // =============================================

  // 登录的用户名
  @Column({
    name: 'user_login',
    default: '',
  })
  @ApiProperty()
  login: string

  // 密码
  @Column({
    name: 'user_pass',
    default: '',
  })
  @Exclude()
  @ApiProperty()
  pass: string

  // 用于 the url in the user’s profile page when using pretty permalinks
  // 昵称，没有设置的话，生成一个内部 id，比如京东的 JDLKFJSDLFJ
  @Column({
    name: 'user_nicename',
    default: '',
    nullable: false,
  })
  @ApiProperty()
  nicename: string

  @Column({
    name: 'user_email',
    default: '',
    comment: '邮箱',
    nullable: false,
  })
  @IsEmail()
  @ApiProperty()
  email: string

  // 网址
  @Column({
    name: 'user_url',
    default: '',
  })
  @ApiProperty()
  url: string

  // 注册时间
  @Column({
    name: 'user_registered',
    nullable: false,
    default: '0000-00-00 00:00:00',
  })
  @ApiProperty()
  registered: Date

  // 账号激活代码
  @Column({
    name: 'user_activation_key',
    default: '',
  })
  @ApiProperty()
  activationKey: string

  // 状态
  @Column({
    name: 'user_status',
    type: 'tinyint',
    length: 11,
    nullable: false,
    default: 0, // 1 是已经启用，0 是未启用
  })
  @ApiProperty()
  status: number

  @Column({
    name: 'display_name',
    default: '',
    length: 250,
  })
  @ApiProperty()
  displayName: string

  // =============================================

  @Column()
  @ApiProperty()
  age: number

  @Column({
    comment: '手机号码',
    nullable: false,
  })
  phone: string

  @Column({ nullable: true })
  @ApiProperty()
  qq: string

  @Column({ nullable: true })
  @ApiProperty()
  wangwang: string

  @Column()
  @ApiProperty()
  spam: number

  @Column({
    comment: '姓',
  })
  @ApiProperty()
  firstName: string

  @Column({
    comment: '名',
  })
  @ApiProperty()
  lastName: string

  @Column()
  @ApiProperty()
  platform: number

  @Column()
  @ApiProperty()
  isSuper: number

  @Column({
    name: 'avatar',
    nullable: true,
  })
  @ApiProperty()
  avatar: string

  // 部门，外部用户默认加入到一个全局的池子中
  @Column({ name: 'department_id' })
  @ApiProperty()
  departmentId: string

  @Column({ length: 32 })
  @ApiProperty()
  psalt: string

  // 账号重置密码
  @Column()
  @ApiProperty()
  resetKey: string

  @ManyToMany((type) => PostEntity)
  @JoinTable()
  favorites: PostEntity[]

  @OneToMany((type) => PostEntity, (data) => data.author)
  posts: PostEntity[]

  @BeforeInsert()
  hashPassword() {
    this.pass = crypto.createHmac('sha256', this.pass).digest('hex')
  }

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  @Column({
    nullable: false,
    default: '0000-00-00 00:00:00',
    comment: '生日',
  })
  birthDay: Date

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id)
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id)
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id)
  }
}

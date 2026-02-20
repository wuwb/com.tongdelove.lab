import { PlatformEnum } from '@/common/enums'
import { BaseEntity } from '@/shared/entities/base.entity'

export class AccountTokenEntity extends BaseEntity {
  // comment: '关联用户表的ID',
  userId: string

  token: string

  // comment: '用户名',
  username: string

  mobile: string

  email: string

  // comment: '平台:0表示普通用户(没权限),1表示为运营管理,2表示入住商家',
  platform: PlatformEnum

  // comment: '是否为超级管理员1表示是,0表示不是',
  isSuper: number

  // comment: '失效时间',
  expireTime: Date
}

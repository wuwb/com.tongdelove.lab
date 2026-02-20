import { BaseEntity } from '@/shared/entities/base.entity'

export class RoleAccessEntity extends BaseEntity {
  roleId: string

  // comment: '资源id',
  accessId: string

  // comment: '资源类型:2:表示菜单,3:表示接口(API)',
  type: number
}

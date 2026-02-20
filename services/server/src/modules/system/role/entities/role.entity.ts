import { BaseEntity } from '@/shared/entities/base.entity'
import { ApiProperty } from '@nestjs/swagger'

export class RoleEntity extends BaseEntity {
  @ApiProperty()
  name: string

  description: string

  @ApiProperty()
  value: string

  // comment: '状态1表示正常,0表示不正常',
  @ApiProperty()
  status: number

  // comment: '针对后期提供注册用,1表示默认角色,0表示非默认角色',
  @ApiProperty()
  isDefault: number
}

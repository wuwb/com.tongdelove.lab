import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@/shared/entities/base.entity'

export default class UserRole extends BaseEntity {
  @ApiProperty()
  userId: string

  @ApiProperty()
  roleId: string
}

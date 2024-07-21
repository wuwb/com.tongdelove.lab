import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity } from '@/shared/entities/base.entity'

@Entity({ name: 'user_role' })
export default class UserRole extends BaseEntity {
  @Column({ name: 'user_id' })
  @ApiProperty()
  userId: string

  @Column({ name: 'role_id' })
  @ApiProperty()
  roleId: string
}

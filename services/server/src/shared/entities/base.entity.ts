import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { IsString } from 'class-validator'

export class BaseEntity {
  @ApiProperty()
  id: string // uuid

  // SOFT DELETE
  // https://github.com/typeorm/typeorm/issues/534
  @ApiHideProperty()
  isDeleted: boolean // 软删除时间

  @ApiHideProperty()
  createdBy?: string // 创建人

  @ApiHideProperty()
  updatedBy?: string // 更新人

  @ApiHideProperty()
  createdAt: Date // 创建时间

  @ApiHideProperty()
  updatedAt: Date // 更新时间

  @IsString()
  remark?: string // remark

  /* 版本号（首次插入或更新时会自增） */
  @ApiHideProperty()
  version?: number // 版本号
}

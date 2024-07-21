import { ApiPropertyOptional } from '@nestjs/swagger'
import { ValidateIf, IsOptional, IsEnum } from 'class-validator'
import { Type } from 'class-transformer'
import { PaginationDto } from '@/shared/dto/pagination.dto'

export class RoleReqDto extends PaginationDto {
  @ApiPropertyOptional({ required: false, description: '角色名称' })
  @IsOptional()
  readonly name?: string

  @ApiPropertyOptional({ required: false, description: '状态', enum: [0, 1] })
  @IsEnum(
    { 禁用: 0, 当前可用: 1 },
    { message: '状态必须是(0:表示禁止,1:表示正常)的数字' }
  )
  @Type(() => Number)
  @ValidateIf((o) => o.status != '')
  @IsOptional()
  readonly status?: number
}

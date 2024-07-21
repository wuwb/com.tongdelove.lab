import { ApiProperty } from '@nestjs/swagger'
import { QueryResDto } from '@/shared/dto/query-res.dto'
import { PaginatedDto } from '@/shared/dto/paginated.dto'

export class RoleResDto extends QueryResDto {
  @ApiProperty({ description: '角色名称' })
  name?: string

  @ApiProperty({ description: '角色描素' })
  description?: string

  @ApiProperty({ description: '1表示默认角色,0表示非默认角色' })
  isDefault?: number
}

export class RoleListResDto extends PaginatedDto<RoleResDto> {
  constructor(page: number, limit: number, data: RoleResDto[]) {
    super(page, limit, data)
  }
}

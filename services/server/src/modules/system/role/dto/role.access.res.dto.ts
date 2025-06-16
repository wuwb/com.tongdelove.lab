import { QueryResDto } from '@/shared/dto/query-res.dto'
import { ApiProperty } from '@nestjs/swagger'

export class RoleAccessResDto extends QueryResDto {
  @ApiProperty({ description: '资源ID' })
  accessId: string
}

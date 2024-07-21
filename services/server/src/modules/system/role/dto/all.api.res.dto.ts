import { ApiProperty } from '@nestjs/swagger'

export class AllApiResDto {
  @ApiProperty({ description: '主键ID' })
  id: string

  @ApiProperty({ description: 'API名称' })
  apiName: string
}

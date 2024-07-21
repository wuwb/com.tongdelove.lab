import { ApiProperty } from '@nestjs/swagger'

export class AllMenusResDto {
  @ApiProperty({ description: '主键ID' })
  id: string

  @ApiProperty({ description: 'key' })
  key: string

  @ApiProperty({ description: '标题' })
  title: string

  @ApiProperty({ description: '父节点ID' })
  parentId: string | null
}

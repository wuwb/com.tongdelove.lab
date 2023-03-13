import { ApiProperty } from '@nestjs/swagger';

export class RoleAccessResDto {
  @ApiProperty({ description: '主键ID' })
  id: string;

  @ApiProperty({ description: '资源ID' })
  accessId: string;
}

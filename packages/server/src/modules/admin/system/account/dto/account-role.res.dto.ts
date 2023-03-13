import { ApiProperty } from '@nestjs/swagger';

export class AccountRoleListResDto {
  @ApiProperty({ required: true, description: '账号ID' })
  accountId?: string;

  @ApiProperty({ required: true, description: '角色ID' })
  roleId?: string;
}

export class RoleAccountListDto {
  @ApiProperty({ required: true, description: '角色ID' })
  id: string;

  @ApiProperty({ required: true, description: '角色名称' })
  name: string;
}

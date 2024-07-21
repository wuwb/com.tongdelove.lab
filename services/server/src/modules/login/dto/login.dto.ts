import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator'
import { IsUserName } from '@/common/validators'

export class LoginDto {
  /* 用户名 */
  @ApiProperty({ required: true, description: '用户名' })
  @IsUserName()
  @IsString({ message: '用户名必须为字符类型' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly username: string

  /* 密码 */
  @ApiProperty({ required: true, description: '密码' })
  @IsString({ message: '密码必须为字符串类型' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string

  /* 验证码 code */
  @IsString()
  readonly code: string

  /* 验证码 code id */
  @IsString()
  readonly codeId: string

  /* 登录类型 */
  @IsOptional()
  @IsString()
  readonly type?: string

  /* 自动登录 */
  @IsOptional()
  @IsBoolean()
  readonly autoLogin?: boolean
}

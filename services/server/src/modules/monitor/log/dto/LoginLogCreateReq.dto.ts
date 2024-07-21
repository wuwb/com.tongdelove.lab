import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class LoginLogCreateReqDTO {
  traceId: string

  userId: string

  userType: string

  @MaxLength(30, {
    message: '用户账号长度不能超过30个字符',
  })
  username: string

  @IsNotEmpty()
  ip

  result

  @IsString()
  userAgent: string

  @IsInt()
  logType: number
}

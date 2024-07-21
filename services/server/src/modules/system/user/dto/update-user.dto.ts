import { PartialType } from '@nestjs/mapped-types'
import { IsEmail, IsString, IsOptional } from 'class-validator'
import { CreateUserDto } from './create-user.dto'

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  password: string
}

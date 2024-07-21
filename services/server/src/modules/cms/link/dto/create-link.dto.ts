import { IsString, IsEmail, IsOptional } from 'class-validator'

export class CreateLinkDTO {
  @IsString()
  readonly title: string

  @IsString()
  readonly description: string

  @IsString()
  readonly url: string
}

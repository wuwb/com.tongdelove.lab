import { IsString, IsNotEmpty, IsMobilePhone } from 'class-validator'

export class CreatePostDto {
  id: string
  content: string
  sub_title: string
}

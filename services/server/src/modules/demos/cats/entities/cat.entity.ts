import { IsOptional, IsDefined, IsString, IsNumber } from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'

const { CREATE, UPDATE } = CrudValidationGroups

export class Cat {
  id: string

  @IsString({ always: true })
  name: string

  description: string

  @IsOptional({ always: true })
  filename: string

  views: number

  isPublished: boolean
}

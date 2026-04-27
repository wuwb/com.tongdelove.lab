import { IsOptional, IsDefined, IsString, IsNumber } from 'class-validator'
import { CrudValidationGroups } from '@nestjsx/crud'

const { CREATE, UPDATE } = CrudValidationGroups

export class Photo {
  id: string

  name: string

  description: string

  filename: string

  views: number

  isPublished: boolean
}

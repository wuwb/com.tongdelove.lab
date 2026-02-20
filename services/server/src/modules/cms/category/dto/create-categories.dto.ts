import { Categories } from '../entities/categories.entity'
import { IsString, IsNumber, IsBoolean } from 'class-validator'

export class CreateCategoriesDto extends Categories {}

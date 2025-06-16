import { ApiProperty } from '@nestjs/swagger'
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator'
import { Product } from '../entities/product.entity'

export class CreateProductDto extends Product {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string

  @ApiProperty({ required: false, default: true })
  published: boolean = false
}

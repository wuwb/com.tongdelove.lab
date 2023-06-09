import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Product } from '../entities/product.entity';

export class CreateProductDto extends Product {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  title: string;

  @IsOptional()
  @MaxLength(150)
  @ApiProperty({ required: false })
  description: string;

  @Min(1.0)
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty()
  sku: string;

  @ApiProperty({ required: false, default: true })
  published: boolean = false;
}

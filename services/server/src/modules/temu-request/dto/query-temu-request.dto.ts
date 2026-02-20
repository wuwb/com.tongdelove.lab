import {
  IsOptional,
  IsString,
  IsNumber,
  IsDateString,
  IsBoolean,
  Min,
} from 'class-validator'
import { Type } from 'class-transformer'

export class QueryTemuRequestDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number = 1

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pageSize?: number = 20

  @IsOptional()
  @IsString()
  url?: string

  @IsOptional()
  @IsString()
  method?: string

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  isCleaned?: boolean

  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsString()
  userId?: string

  @IsOptional()
  @IsNumber()
  @Min(200)
  @Type(() => Number)
  minStatus?: number

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  maxStatus?: number
}

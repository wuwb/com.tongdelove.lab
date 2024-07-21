import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger'
import { Expose, Transform, Type } from 'class-transformer'
import { IsInt, IsOptional, Min, IsNumber, IsString } from 'class-validator'
import { QueryDto } from './query.dto'

export class PaginationDto extends QueryDto {
  @ApiPropertyOptional({
    required: false,
    description: '一页显示多少条',
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsNumber()
  @Min(1)
  @Expose()
  @Transform(({ value: val }) => (val ? parseInt(val) : 10), {
    toClassOnly: true,
  })
  readonly limit?: number

  @ApiPropertyOptional({
    required: false,
    description: '当前页数',
    default: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  @IsNumber()
  @Expose()
  @Transform(({ value: val }) => (val ? parseInt(val) : 1), {
    toClassOnly: true,
  })
  readonly page?: number

  /* 排序方式 */
  @IsOptional()
  @Type()
  @IsString()
  public isAsc?: string

  /* mysql忽略条数 */
  @ApiHideProperty()
  public skip?: number
  /* mysql返回条数 */
  @ApiHideProperty()
  public take?: number

  @ApiProperty({
    description: '时间戳',
    required: false,
  })
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  readonly _t?: number
}

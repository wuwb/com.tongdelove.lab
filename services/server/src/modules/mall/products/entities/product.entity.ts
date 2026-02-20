import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { Prisma } from '@prisma/client'
import { BaseEntity } from '@/shared/entities/base.entity'

export class Product
  extends BaseEntity
  implements Prisma.ProductUncheckedCreateInput
{
  @ApiProperty()
  name: string

  @ApiProperty({ required: false, nullable: true })
  description: string

  @Transform(({ value }) => value.toNumber())
  @ApiProperty({ type: String })
  price: number

  @ApiProperty()
  sku: string

  @ApiProperty({ default: false })
  published: boolean

  slug: string
  code: string
  flag: number
  custom_id: string

  goods_sn
  keywords
  brief
  detail

  content
  image
  published_at
  biz_type
}

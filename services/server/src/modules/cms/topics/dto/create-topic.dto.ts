import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'

@ObjectType()
export class CreateTopicDto {
  @Field()
  @ApiProperty()
  name: string

  @Field()
  userId?: string

  @Field()
  userRole?: number

  @Field()
  @ApiProperty()
  description: string

  @Field()
  @ApiProperty()
  category: string

  @Field()
  @ApiProperty()
  relate_topics: string

  @Field()
  @ApiProperty()
  filename: string

  @Field()
  @ApiProperty()
  views: number

  @Field()
  @ApiProperty()
  isPublished: boolean
}

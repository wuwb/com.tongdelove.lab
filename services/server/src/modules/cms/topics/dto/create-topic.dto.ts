import { Field, ObjectType } from '@nestjs/graphql'
import { ApiProperty } from '@nestjs/swagger'
import { Prisma } from '@prisma/client'

@ObjectType()
export class CreateTopicDto implements Prisma.TopicCreateInput {
  @Field()
  @ApiProperty()
  name: string

  @Field()
  userId: string

  @Field()
  userRole: number
}

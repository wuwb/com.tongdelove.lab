import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class SelectTopicDto {
  @Field()
  @ApiProperty()
  uid: string;

  @Field()
  @ApiProperty({
    description: 'The name of the tag',
    default: '标签名',
  })
  name: string;

  @Field()
  @ApiProperty({
    description: 'The useCount of the tag',
    default: '标签使用次数',
  })
  useCount: number;

  @Field()
  @ApiProperty()
  createdAt: Date;

  @Field()
  @ApiProperty()
  updatedAt: Date;
}

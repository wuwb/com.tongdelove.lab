import { PartialType } from '@nestjs/mapped-types';
import { CreateTopicDto } from './create-topic.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

export class UpdateTopicDto implements Prisma.TopicCreateInput {
  @ApiProperty()
  name: string;
}

export class UpdateTopicDto2 extends PartialType(CreateTopicDto) { }

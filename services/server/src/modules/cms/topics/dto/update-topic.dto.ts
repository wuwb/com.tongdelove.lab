import { PartialType } from '@nestjs/mapped-types'
import { CreateTopicDto } from './create-topic.dto'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateTopicDto {
  @ApiProperty()
  name?: string
}

export class UpdateTopicDto2 extends PartialType(CreateTopicDto) {}

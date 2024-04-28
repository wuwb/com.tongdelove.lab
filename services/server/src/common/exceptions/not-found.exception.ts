import { sample } from 'lodash-es'
import { NotFoundException as NotFoundExceptionBase } from '@nestjs/common'
import { ApiProperty } from '@nestjs/swagger';

export const NotFoundMessage = [
  '真不巧, 内容走丢了 o(╥﹏╥)o',
  '电波无法到达 ωω',
  '数据..不小心丢失了啦 π_π',
  '404, 这也不是我的错啦 (๐•̆ ·̭ •̆๐)',
  '嘿, 这里空空如也, 不如别处走走?',
]

export class NotFoundException extends NotFoundExceptionBase {
  constructor(message?) {
    super(message || sample(NotFoundMessage))
  }

  @ApiProperty()
  statusCode!: number;

  @ApiProperty()
  message!: string;
}

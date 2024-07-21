import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    const skip = value.limit ? (value.limit - 1) * value.page : 0
    const take = value.page ?? 0
    value.skip = skip
    value.take = take
    return value
  }
}

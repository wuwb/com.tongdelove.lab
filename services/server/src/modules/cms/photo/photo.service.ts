import { Injectable } from '@nestjs/common'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
import { Photo } from './photo.entity'

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
  async findAll() {}
}

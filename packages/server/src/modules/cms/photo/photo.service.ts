import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';

@Injectable()
export class PhotoService extends TypeOrmCrudService<Photo> {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {
        super(photoRepository);
    }

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.find();
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, Connection } from 'typeorm';
import { Ad } from './ad.entiry';

@Injectable()
export class AdService {
    constructor(
        @InjectRepository(Ad)
        private readonly articleRepository: Repository<Ad>,
        private connection: Connection
    ) {}

    public async create(createArticleDTO) {
        const ad = new Ad();
        this.articleRepository.save(ad);
    }

    list() {}

    addPosition() {}

}

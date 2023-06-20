import { Injectable } from '@nestjs/common';
import { PaginationDto } from '@/shared/dto/pagination.dto';

@Injectable()
export class BookService {
    constructor() {

    }

    async all(): Promise<any[]> {
        return [];
    }
    async list(page: PaginationDto) {
        return [];
    }

    async listRecommend() {
        return [];
    }
    async get() { }
    async count(): Promise<number> {
        return 0;
    }
    async create() { }
    async update() { }
    async remove() { }
}

import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateFreelancerDto } from '../dto/create-freelancer.dto';
import { UpdateFreelancerDto } from '../dto/update-freelancer.dto';
import { FreelancerCrudService } from './freelancer-crud.service';

@Controller('api/crud/freelancer')
export class FreelancerCrudController {
    constructor(private readonly catsCrudService: FreelancerCrudService) { }

    @Post()
    async create(@Body() data: CreateFreelancerDto) {
        // const dto: Prisma.FreelancerTaskCreateArgs = {
        //     data: {
        //     },
        // };
        // return await this.catsCrudService.create(dto);
    }

    @Get()
    async findAll() {
        const dto: Prisma.FreelancerTaskFindManyArgs = {
            where: {},
        };
        return await this.catsCrudService.findMany(dto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        // const dto: Prisma.FreelancerTaskFindUniqueArgs = {
        //     where: { id: +id },
        // };
        // return await this.catsCrudService.findUnique(dto);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() data: UpdateFreelancerDto) {
        // actual implementation
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        // actual implementation
    }
}

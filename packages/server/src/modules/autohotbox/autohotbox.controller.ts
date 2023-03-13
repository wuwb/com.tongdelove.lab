import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { AutohotboxService } from './autohotbox.service';
import { CreateBoxDTO } from './dto/create-box.dto';

@Controller('autohotbox')
export class AutohotboxController {
    constructor(
        private autohotboxService: AutohotboxService
    ) {}

    @Get()
    async getAll() {
        const boxes = await this.autohotboxService.getAll();
        return boxes;
    }

    @Get(':btcode')
    async get(@Param('btcode') btcode) {
        const box = await this.autohotboxService.get(btcode);
        return box;
    }

    @Post()
    async add(@Body() createBoxDTO: CreateBoxDTO) {
        const box = await this.autohotboxService.add(createBoxDTO);
        return box;
    }

    @Delete()
    async delete(@Query() query) {
        const boxes = await this.autohotboxService.delete(query.btcode);
        return boxes;
    }
}

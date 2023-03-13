import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    UseGuards,
    UseInterceptors,
    Query,
    Put,
    Delete,
    Res,
    HttpStatus,
    UseFilters,
    ForbiddenException,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ParseIntPipe } from '../../common/pipes/parse-int.pipe';
import { CatsService } from './cats.service';
// import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';
import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { createCatSchema } from './schemas/create-cat.schema';
// import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

// @ApiBearerAuth()
@Controller('cats')
// @UseGuards(RolesGuard)
export class CatsController {
    constructor(
        private readonly catsService: CatsService,
    ) { }

    // @Post()
    // @Roles('admin')
    // @UsePipes(new JoiValidationPipe(createCatSchema))
    // @ApiResponse({
    //     status: 201,
    //     description: 'The record has been successfully created.',
    // })
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    // async create(@Body(new ValidationPipe({ transform: true })) createCatDto: CreateCatDto) {
    //     try {
    //         return this.catsService.create(createCatDto);
    //     } catch (err) {
    //         throw new ForbiddenException();
    //     }
    // }

    // @Get()
    // async findAll(): Promise<Cat[]> {
    //   return this.catsService.findAll();
    // }

    // @Get(':id')
    // findOne(@Param('id', new ParseIntPipe()) id, @Res() res) {
    //   res.status(HttpStatus.OK).json([]);
    //   return this.catsService.findOne(id);
    // }

    // @Put(':id')
    // update(@Param('id') id: string, @Body() updateCatDto: CreateCatDto) {
    // return this.catService.update(id, updateCatDto);
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //   return this.catService.remove(id);
    // }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Logger,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('company')
@Controller('api/companies')
export class CompaniesController {
  private readonly logger = new Logger(CompaniesController.name);

  constructor(private readonly companiesService: CompaniesService) { }

  @Post('/supplies')
  create(@Body() data: Prisma.CompanyCreateInput) {
    this.logger.log(`create company: ${JSON.stringify(data)}`);
    if (typeof data.registryAt === 'string' && data.registryAt.length > 0) {
      data.registryAt = new Date(data.registryAt).toISOString();
    }
    return this.companiesService.createSupply(data);
  }

  @Get()
  findAll(@Query() query) {
    return this.companiesService.findAll(query);
  }

  @Get('/supplies')
  findSupplies(@Query() query) {
    return this.companiesService.findSupplies(query);
  }

  @Get('/supplies/columns')
  findSuppliesColumns() {
    return [];
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: Prisma.CompanyUpdateInput,
  ) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
}

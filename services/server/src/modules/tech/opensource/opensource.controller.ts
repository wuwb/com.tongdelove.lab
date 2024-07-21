import {
  Controller,
  Delete,
  Get,
  HttpException,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OpensourceService } from './opensource.service'

@Controller('api/opensource')
@ApiTags('App')
export class OpensourceController {
  private readonly logger = new Logger(OpensourceController.name)

  constructor(private readonly opensourceService: OpensourceService) {
    //
  }

  @Get('category')
  async listCategories() {
    const categroy = await this.opensourceService.listCategories()
    return categroy
  }

  @Post('category')
  async insterCategory() {
    //
  }

  @Put()
  async updateCategory() {
    //
  }

  @Delete()
  async removeCategory() {
    //
  }

  @Get('field/:cid')
  async getCategory(@Param('cid') cid: string) {
    const field = await this.opensourceService.getCategory(cid)
    return field
  }

  @Get(':cid/:fid')
  async getProjects(@Param('cid') cid: string, @Param('fid') fid: string) {
    const result = await this.opensourceService.getProjects(cid, fid)

    return result
  }
}

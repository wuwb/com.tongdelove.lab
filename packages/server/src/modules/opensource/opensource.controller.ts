import { Controller, Delete, Get, HttpException, Logger, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/processors/prisma/prisma.service';

@Controller('api/opensource')
@ApiTags('App')
export class OpensourceController {
    private readonly logger = new Logger(OpensourceController.name);

    constructor(
        public readonly prisma: PrismaService,
    ) {
        //
    }

    @Get('category')
    async listCategories() {
        const categroy = await this.prisma.opensourceProjectCategroy.findMany({});
        return categroy;
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
        const field = await this.prisma.opensourceProjectField.findMany({
            where: {
                cid,
            }
        });
        return field;
    }

    @Get(':cid/:fid')
    async getProjects(@Param('cid') cid: string, @Param('fid') fid: string) {
        const categroy = await this.prisma.opensourceProjectCategroy.findUnique({
            where: {
                id: cid,
            }
        });
        const field = await this.prisma.opensourceProjectField.findMany({
            where: {
                cid: cid,
            }
        });
        const projects = await this.prisma.opensourceProject.findMany({
            where: {
                cid: cid,
                fid: fid || field[0].id,
            }
        });
        type projectsPageVO = {

        }
        const result: projectsPageVO = {
            categroy,
            field,
            projects,
        };

        return result;
    }


}

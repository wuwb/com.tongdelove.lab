import { PrismaService } from '@/processors/prisma/prisma.service';
import { Injectable, HttpException, Logger } from '@nestjs/common';

import { Links, FindManyLinksArgs, LinksWhereInput } from '@/generated/prisma-nestjs-graphql/links';

@Injectable()
export class LinksService {
  private readonly logger = new Logger(LinksService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) { }

  async findOneById(id: string) {
    return this.prisma.links.findUnique({
      where: {
        id,
      }
    });
  }

  async findAll(param: LinksWhereInput) {
    const data = await this.prisma.links.findMany({
      where: {
        ...param,
      }
    });

    this.logger.log(data);

    return data;
  }

  async create(link: Links) {
    return this.prisma.links.create({
      data: {
        ...link,
      }
    });
  }

  async remove(id) {
    return this.prisma.links.delete({
      where: {
        id,
      }
    });
  }

}

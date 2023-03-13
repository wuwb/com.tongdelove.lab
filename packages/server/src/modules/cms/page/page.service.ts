import { PrismaService } from "@/processors/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PageService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }

  get model() {
    return this.prisma.page;
  }

  public async create(doc) {
    return this.prisma.page.create({
      data: doc,
    });
  }

  async updatePageById(id, body) {

  }

  async deletePageById(id) {
    return this.prisma.page.delete({
      where: {
        id,
      }
    });
  }
}

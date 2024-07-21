import { PrismaService } from '@/core/database/prisma/prisma.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class OpensourceService {
  constructor(private readonly prisma: PrismaService) {
    //
  }

  async listCategories() {
    const categroy = await this.prisma.opensourceProjectCategroy.findMany({})
    return categroy
  }

  async getCategory(cid: string) {
    const field = await this.prisma.opensourceProjectField.findMany({
      where: {
        cid,
      },
    })
    return field
  }

  async getProjects(cid: string, fid: string) {
    const categroy = await this.prisma.opensourceProjectCategroy.findUnique({
      where: {
        id: cid,
      },
    })
    const field = await this.prisma.opensourceProjectField.findMany({
      where: {
        cid: cid,
      },
    })
    const projects = await this.prisma.opensourceProject.findMany({
      where: {
        cid: cid,
        fid: fid || field[0]?.id,
      },
    })
    type projectsPageVO = {}
    const result: projectsPageVO = {
      categroy,
      field,
      projects,
    }

    return result
  }
}

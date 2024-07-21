import { PrismaService } from '@/core/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnalyzeService {
  constructor(private readonly prisma: PrismaService) {}

  async getRangeAnalyzeData(
    from = new Date('2000-01-01'),
    to = new Date(),
    options?: {
      page?: number
      limit?: number
    }
  ) {
    const { limit = 50, page = 1 } = options || {}
    const where = {
      AND: [
        {
          timestamp: {
            gte: from,
          },
        },
        {
          timestamp: {
            lte: to,
          },
        },
      ],
    }
    const [count, list] = await this.prisma.$transaction([
      this.prisma.analyze.count({
        where,
      }),
      this.prisma.analyze.findMany({
        where,
      }),
    ])
    return {
      list,
      count,
    }
  }
}

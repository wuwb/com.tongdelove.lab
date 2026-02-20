import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { CreateCleaningJobDto } from './dto'

@Injectable()
export class CleaningService {
  constructor(private readonly prisma: PrismaService) {}

  async createJob(dto: CreateCleaningJobDto) {
    const totalRecords = await this.prisma.dataCleaningQueue.count({
      where: { isCleaned: false },
    })

    if (totalRecords === 0) {
      return {
        message: '没有需要清洗的数据',
        jobId: null,
      }
    }

    const job = await this.prisma.dataCleaningQueue.create({
      data: {
        status: 'pending',
        totalRecords,
        cleanedRecords: 0,
        failedRecords: 0,
        config: dto,
      },
    })

    return {
      message: '清洗任务已创建',
      jobId: job.id,
      totalRecords,
    }
  }

  async getJobStatus(id: string) {
    const job = await this.prisma.dataCleaningQueue.findUnique({
      where: { id },
    })

    if (!job) {
      throw new Error('任务不存在')
    }

    return {
      id: job.id,
      status: job.status,
      totalRecords: job.totalRecords,
      cleanedRecords: job.cleanedRecords,
      failedRecords: job.failedRecords,
      progress:
        job.totalRecords > 0
          ? Math.round((job.cleanedRecords / job.totalRecords) * 100)
          : 0,
      startedAt: job.startedAt,
      completedAt: job.completedAt,
      errorMessage: job.errorMessage,
    }
  }

  async getRecentJobs(limit: number = 10) {
    return this.prisma.dataCleaningQueue.findMany({
      take: limit,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        status: true,
        totalRecords: true,
        cleanedRecords: true,
        failedRecords: true,
        createdAt: true,
        completedAt: true,
      },
    })
  }
}

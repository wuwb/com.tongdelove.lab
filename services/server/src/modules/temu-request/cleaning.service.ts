import { Injectable } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { count, desc, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { dataCleaningQueue } from '@/core/database/drizzle/schema'
import { CreateCleaningJobDto } from './dto'

@Injectable()
export class CleaningService {
  constructor(private readonly drizzle: DrizzleService) {}

  async createJob(dto: CreateCleaningJobDto) {
    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(dataCleaningQueue)
      .where(eq(dataCleaningQueue.status, 'pending'))
    const totalRecords = Number(totalRes[0]?.value ?? 0)

    if (totalRecords === 0) {
      return {
        message: '没有需要清洗的数据',
        jobId: null,
      }
    }

    const [job] = await this.drizzle.db
      .insert(dataCleaningQueue)
      .values({
        id: randomUUID(),
        status: 'pending',
        totalRecords,
        cleanedRecords: 0,
        failedRecords: 0,
        config: dto as any,
        updatedAt: new Date().toISOString(),
      })
      .returning()

    if (!job) {
      throw new Error('任务创建失败')
    }

    return {
      message: '清洗任务已创建',
      jobId: job.id,
      totalRecords,
    }
  }

  async getJobStatus(id: string) {
    const [job] = await this.drizzle.db
      .select()
      .from(dataCleaningQueue)
      .where(eq(dataCleaningQueue.id, id))
      .limit(1)

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
    return this.drizzle.db
      .select({
        id: dataCleaningQueue.id,
        status: dataCleaningQueue.status,
        totalRecords: dataCleaningQueue.totalRecords,
        cleanedRecords: dataCleaningQueue.cleanedRecords,
        failedRecords: dataCleaningQueue.failedRecords,
        createdAt: dataCleaningQueue.createdAt,
        completedAt: dataCleaningQueue.completedAt,
      })
      .from(dataCleaningQueue)
      .orderBy(desc(dataCleaningQueue.createdAt))
      .limit(limit)
  }
}

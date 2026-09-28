import { Processor, Process } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { Job } from 'bull'
import { and, asc, count, eq, ne, sql } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { dataCleaningQueue, temuRequests } from '@/core/database/drizzle/schema'
import { CleaningService } from '../cleaning.service'

@Processor('temu-cleaning')
export class TemuCleaningProcessor {
  private readonly logger = new Logger(TemuCleaningProcessor.name)

  constructor(
    private readonly drizzle: DrizzleService,
    private readonly cleaningService: CleaningService
  ) {}

  @Process('clean')
  async handleCleaning(job: Job) {
    const { jobId, config } = job.data

    this.logger.log(`🧹 开始清洗任务: ${jobId}`)

    try {
      await this.drizzle.db
        .update(dataCleaningQueue)
        .set({
          status: 'processing',
          startedAt: new Date().toISOString(),
        })
        .where(eq(dataCleaningQueue.id, jobId))

      const uncleanedRecords = await this.drizzle.db
        .select()
        .from(temuRequests)
        .where(eq(temuRequests.isCleaned, false))
        .orderBy(asc(temuRequests.capturedAt))
        .limit(config.batchSize || 1000)

      this.logger.log(`📊 待清洗记录数: ${uncleanedRecords.length}`)

      let cleanedCount = 0
      let failedCount = 0

      for (const record of uncleanedRecords) {
        try {
          await this.cleanRecord(record, config)
          cleanedCount++
        } catch (error) {
          this.logger.error(`❌ 清洗记录失败 ${record.id}:`, error)
          failedCount++
        }
      }

      await this.drizzle.db
        .update(dataCleaningQueue)
        .set({
          cleanedRecords: sql`${dataCleaningQueue.cleanedRecords} + ${cleanedCount}`,
          failedRecords: sql`${dataCleaningQueue.failedRecords} + ${failedCount}`,
        })
        .where(eq(dataCleaningQueue.id, jobId))

      const remainingRes = await this.drizzle.db
        .select({ value: count() })
        .from(temuRequests)
        .where(eq(temuRequests.isCleaned, false))
      const remaining = Number(remainingRes[0]?.value ?? 0)

      if (remaining === 0) {
        await this.drizzle.db
          .update(dataCleaningQueue)
          .set({
            status: 'completed',
            completedAt: new Date().toISOString(),
          })
          .where(eq(dataCleaningQueue.id, jobId))

        this.logger.log(`✅ 清洗任务完成: ${jobId}`)
      } else {
        await this.cleaningService.createJob({
          ...config,
        })
      }

      job.progress(cleanedCount + failedCount)
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error(`❌ 清洗任务失败: ${jobId}`, error)
        await this.drizzle.db
          .update(dataCleaningQueue)
          .set({
            status: 'failed',
            completedAt: new Date().toISOString(),
            errorMessage: error.message,
          })
          .where(eq(dataCleaningQueue.id, jobId))
      }
      throw error
    }
  }

  private async cleanRecord(record: any, config: any): Promise<void> {
    let cleanedData = { ...record }

    if (config.deduplicate !== false) {
      const [duplicate] = await this.drizzle.db
        .select()
        .from(temuRequests)
        .where(
          and(
            eq(temuRequests.requestId, record.requestId),
            eq(temuRequests.isCleaned, true),
            ne(temuRequests.id, record.id),
          ),
        )
        .limit(1)

      if (duplicate) {
        this.logger.log(`⚠️ 发现重复记录: ${record.requestId}`)
      }
    }

    if (config.formatClean !== false) {
      cleanedData = await this.formatClean(cleanedData)
    }

    if (config.filterInvalid !== false) {
      if (this.isInvalid(cleanedData)) {
        this.logger.log(`⚠️ 过滤无效记录: ${record.id}`)
        await this.drizzle.db
          .update(temuRequests)
          .set({
            isCleaned: true,
            cleanedAt: new Date().toISOString(),
          })
          .where(eq(temuRequests.id, record.id))
        return
      }
    }

    await this.drizzle.db
      .update(temuRequests)
      .set({
        isCleaned: true,
        cleanedAt: new Date().toISOString(),
      })
      .where(eq(temuRequests.id, record.id))
  }

  private async formatClean(record: any): Promise<any> {
    const cleaned = { ...record }

    if (cleaned.url) {
      try {
        const urlObj = new URL(cleaned.url)
        cleaned.url = urlObj.href
        cleaned.path = urlObj.pathname
      } catch {}
    }

    if (cleaned.requestHeaders && typeof cleaned.requestHeaders === 'object') {
      cleaned.requestHeaders = this.normalizeHeaders(cleaned.requestHeaders)
    }

    if (
      cleaned.responseHeaders &&
      typeof cleaned.responseHeaders === 'object'
    ) {
      cleaned.responseHeaders = this.normalizeHeaders(cleaned.responseHeaders)
    }

    return cleaned
  }

  private normalizeHeaders(headers: Record<string, any>): Record<string, any> {
    const normalized: Record<string, any> = {}
    for (const [key, value] of Object.entries(headers)) {
      normalized[key.toLowerCase()] = value
    }
    return normalized
  }

  private isInvalid(record: any): boolean {
    if (
      !record.url ||
      typeof record.url !== 'string' ||
      record.url.trim() === ''
    ) {
      return true
    }

    if (!record.responseStatus || typeof record.responseStatus !== 'number') {
      return true
    }

    if (!record.url.includes('temu.com')) {
      return true
    }

    if (!record.responseBody && !record.responseText) {
      return true
    }

    return false
  }
}

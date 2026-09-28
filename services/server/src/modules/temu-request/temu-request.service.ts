import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { and, count, desc, eq, gte, ilike, inArray, lte } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { temuRequests } from '@/core/database/drizzle/schema'
import { BatchCreateTemuRequestDto, QueryTemuRequestDto } from './dto'

@Injectable()
export class TemuRequestService {
  constructor(private readonly drizzle: DrizzleService) {}

  async createBatch(dto: BatchCreateTemuRequestDto) {
    const { requests, userId } = dto

    const requestIdList = requests
      .filter((r) => r.requestId)
      .map((r) => r.requestId!)

    const existingRows = requestIdList.length
      ? await this.drizzle.db
          .select({ requestId: temuRequests.requestId })
          .from(temuRequests)
          .where(inArray(temuRequests.requestId, requestIdList))
      : []

    const existingIdSet = new Set(existingRows.map((r) => r.requestId))
    const newRequests = requests.filter((r) => !existingIdSet.has(r.requestId!))

    if (newRequests.length === 0) {
      return {
        success: true,
        message: '所有数据已存在',
        created: 0,
        total: requests.length,
      }
    }

    try {
      await this.drizzle.db
        .insert(temuRequests)
        .values(
          newRequests.map((req) => ({
            id: randomUUID(),
            url: req.url,
            method: req.method,
            requestId: req.requestId,
            path: this.extractPath(req.url),
            requestHeaders: req.requestHeaders,
            requestBody: this.sanitizeBody(req.requestBody),
            responseStatus: req.responseStatus,
            responseText: req.responseText,
            responseHeaders: req.responseHeaders,
            responseBody: this.sanitizeBody(req.responseBody),
            requestType: req.requestType || 'fetch',
            platform: 'temu',
            userAgent: req.userAgent,
            capturedAt: req.capturedAt
              ? new Date(req.capturedAt).toISOString()
              : new Date().toISOString(),
            userId,
          })),
        )
        .onConflictDoNothing()

      return {
        success: true,
        message: '数据已保存',
        created: newRequests.length,
        duplicate: requests.length - newRequests.length,
        total: requests.length,
      }
    } catch (error) {
      console.error('批量插入失败:', error)
      throw new HttpException('数据保存失败', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll(query: QueryTemuRequestDto) {
    const {
      page = 1,
      pageSize = 20,
      url,
      method,
      isCleaned,
      startDate,
      endDate,
      userId,
      minStatus,
      maxStatus,
    } = query

    const conditions: any[] = []

    if (url) {
      conditions.push(ilike(temuRequests.url, `%${url}%`))
    }

    if (method) {
      conditions.push(eq(temuRequests.method, method.toUpperCase()))
    }

    if (isCleaned !== undefined) {
      conditions.push(eq(temuRequests.isCleaned, isCleaned))
    }

    if (startDate) {
      conditions.push(
        gte(temuRequests.capturedAt, new Date(startDate).toISOString()),
      )
    }

    if (endDate) {
      conditions.push(
        lte(temuRequests.capturedAt, new Date(endDate).toISOString()),
      )
    }

    if (userId) {
      conditions.push(eq(temuRequests.userId, userId))
    }

    if (minStatus) {
      conditions.push(gte(temuRequests.responseStatus, Number(minStatus)))
    }

    if (maxStatus) {
      conditions.push(lte(temuRequests.responseStatus, Number(maxStatus)))
    }

    const where = conditions.length ? and(...conditions) : undefined

    const [totalRes, items] = await Promise.all([
      this.drizzle.db
        .select({ value: count() })
        .from(temuRequests)
        .where(where),
      this.drizzle.db
        .select({
          id: temuRequests.id,
          url: temuRequests.url,
          method: temuRequests.method,
          requestId: temuRequests.requestId,
          responseStatus: temuRequests.responseStatus,
          responseText: temuRequests.responseText,
          capturedAt: temuRequests.capturedAt,
          isCleaned: temuRequests.isCleaned,
          cleanedAt: temuRequests.cleanedAt,
        })
        .from(temuRequests)
        .where(where)
        .orderBy(desc(temuRequests.capturedAt))
        .limit(pageSize)
        .offset((page - 1) * pageSize),
    ])

    const total = Number(totalRes[0]?.value ?? 0)

    return {
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    }
  }

  async findOne(id: string) {
    const [record] = await this.drizzle.db
      .select()
      .from(temuRequests)
      .where(eq(temuRequests.id, id))
      .limit(1)

    if (!record) {
      throw new HttpException('记录不存在', HttpStatus.NOT_FOUND)
    }

    return record
  }

  private extractPath(url: string): string {
    try {
      const urlObj = new URL(url)
      return urlObj.pathname + urlObj.search
    } catch {
      return url
    }
  }

  private sanitizeBody(body: any): any {
    if (!body) return null

    if (typeof body === 'string') {
      if (body.length > 50000) {
        return '[Large Body Truncated]'
      }
    }

    return body
  }
}

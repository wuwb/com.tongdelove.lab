import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { BatchCreateTemuRequestDto, QueryTemuRequestDto } from './dto'

@Injectable()
export class TemuRequestService {
  constructor(private readonly prisma: PrismaService) {}

  async createBatch(dto: BatchCreateTemuRequestDto) {
    const { requests, userId, deviceId } = dto

    const existingIds = await this.prisma.temuRequest.findMany({
      where: {
        requestId: {
          in: requests.filter((r) => r.requestId).map((r) => r.requestId!),
        },
      },
      select: { requestId: true },
    })

    const existingIdSet = new Set(existingIds.map((r) => r.requestId))
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
      await this.prisma.temuRequest.createMany({
        data: newRequests.map((req) => ({
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
          capturedAt: req.capturedAt ? new Date(req.capturedAt) : new Date(),
          userId,
        })),
        skipDuplicates: true,
      })

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

    const where: any = {}

    if (url) {
      where.url = { contains: url, mode: 'insensitive' }
    }

    if (method) {
      where.method = method.toUpperCase()
    }

    if (isCleaned !== undefined) {
      where.isCleaned = isCleaned
    }

    if (startDate || endDate) {
      where.capturedAt = {}
      if (startDate) where.capturedAt.gte = new Date(startDate)
      if (endDate) where.capturedAt.lte = new Date(endDate)
    }

    if (userId) {
      where.userId = userId
    }

    if (minStatus || maxStatus) {
      where.responseStatus = {}
      if (minStatus) where.responseStatus.gte = minStatus
      if (maxStatus) where.responseStatus.lte = maxStatus
    }

    const [total, items] = await Promise.all([
      this.prisma.temuRequest.count({ where }),
      this.prisma.temuRequest.findMany({
        where,
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: { capturedAt: 'desc' },
        select: {
          id: true,
          url: true,
          method: true,
          requestId: true,
          responseStatus: true,
          responseText: true,
          capturedAt: true,
          isCleaned: true,
          cleanedAt: true,
        },
      }),
    ])

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
    const record = await this.prisma.temuRequest.findUnique({
      where: { id },
    })

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

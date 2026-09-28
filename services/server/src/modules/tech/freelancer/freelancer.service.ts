import { DingdingService } from '@/core/sms/dingding/dingding.service'
import { WebhookService } from '@/core/sms/webhook/webhook.service'
import { Injectable, Logger } from '@nestjs/common'
import { randomUUID } from 'crypto'
import { count, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import {
  freelancerTask,
  subscribesWebhook,
  subscribesWebhook2User,
} from '@/core/database/drizzle/schema'
import { ISourceType } from '../spider/spider.interface'
import { ApiException } from '@/common/exceptions/api.exception'

@Injectable()
export class FreelancerService {
  private readonly logger = new Logger(FreelancerService.name)

  constructor(
    public readonly drizzle: DrizzleService,
    private readonly dingdingService: DingdingService,
    private readonly webhookService: WebhookService
  ) {}

  async getFreeProjects(page: number, limit: number) {
    const skip = (page - 1) * limit

    const data = await this.drizzle.db
      .select()
      .from(freelancerTask)
      .limit(limit)
      .offset(skip)
    const totalRes = await this.drizzle.db
      .select({ value: count() })
      .from(freelancerTask)
    const total = Number(totalRes[0]?.value ?? 0)

    if (!data) {
      throw new ApiException(10011, `No data found`)
    }
    return {
      data,
      total,
    }
  }

  async getTaskById(id: string) {
    const [result] = await this.drizzle.db
      .select()
      .from(freelancerTask)
      .where(eq(freelancerTask.id, id))
      .limit(1)
    return result ?? null
  }

  async remind(data: any) {
    const remindTarget = await this.drizzle.db
      .select()
      .from(subscribesWebhook)
      .where(eq(subscribesWebhook.remindSource, data.source))

    if (!remindTarget || remindTarget.length === 0) {
      return
    }

    let result: any[] = []

    for (var i = 0, len = remindTarget.length; i < len; i++) {
      let item: any = remindTarget[i]

      if (item.webhookType === 'feishu') {
        //
      } else if (item.webhookType === 'dingding') {
        let url = `${item.webhook}?token=${item.secret}`
        await this.dingdingService.sendTextToWebhook(url, data)
      } else if (item.webhookType === 'wechat') {
        let url = `${item.webhook}`
        let tmp = await this.webhookService.sendMarkdown(
          url,
          `[${data.source}] ${data.title} \n ${data.desc} \n ${data.date} \n [查看详情](${data.url})`
        )
        result.push(tmp)
      }
    }
    return result
  }

  async subscribe(webhook: any, user: any) {
    // 加入事物
    try {
      const [subscribesWebhookRow] = await this.drizzle.db
        .insert(subscribesWebhook)
        .values({
          id: randomUUID(),
          webhook: webhook.webhook,
          secret: webhook.secret,
          webhookType: webhook.webhookType,
          remindSource: webhook.remindSource,
          remindType: webhook.remindType,
        })
        .returning()
      this.logger.log('subscribesWebhook: ', subscribesWebhookRow)
      if (!subscribesWebhookRow) {
        throw new Error('订阅创建失败')
      }
      const [bind] = await this.drizzle.db
        .insert(subscribesWebhook2User)
        .values({
          id: randomUUID(),
          webhookId: subscribesWebhookRow.id,
          userId: user.id,
        })
        .returning()
      return bind
    } catch (err) {
      this.logger.log(err)
    }
  }
}

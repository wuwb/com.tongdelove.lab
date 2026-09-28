import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service'
import { SpiderTask } from '@/modules/tech/spider/spider.interface'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { freelancerTask } from '@/core/database/drizzle/schema'
import { HttpService } from '@nestjs/axios'
import { InjectQueue } from '@nestjs/bull'
import { Injectable } from '@nestjs/common'
import { Queue } from 'bull'
import { OschinaTask } from '../interfaces/oschina.interface'

// https://zb.oschina.net/project/contractor-browse-project-and-reward

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

@Injectable()
export class OschinaService {
  url: string

  constructor(
    private readonly drizzle: DrizzleService,
    private readonly httpService: HttpService,
    private readonly freelancerService: FreelancerService,
    @InjectQueue('urls') private urlsQueue: Queue
  ) {
    this.url =
      'https://zb.oschina.net/project/contractor-browse-project-and-reward'
  }

  async spider() {
    // &currentTime=2022-09-18+23:08:32
    const response = await this.httpService.axiosRef.get(
      `${this.url}?applicationAreas=&type=1&sortBy=30&page=20&currentPage=1`,
      {
        headers: {
          'accept-encoding': 'gzip, deflate, br',
          'accept-language':
            'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
        },
      }
    )

    const { data } = response.data

    asyncForEach(data.data, async (item: OschinaTask) => {
      const task: Partial<SpiderTask> = {
        source: 'oschina' as any,
        sourceId: `${item.id}`,
        title: item.name,
        desc: '',
        url: `https://zb.oschina.net/project/detail.html?id=${item.id}`,

        fixedPrice: '0',
        bargain: false,
        cycle: item.cycle,
        cycleName: '天',
        date: new Date(item.publishTime).toISOString() as any,
        applyCount: item.applyCount ? +item.applyCount : 0,
        visitCount: +item.viewCount,

        status: 'string',

        auditStatus: 0,
        auditReason: '',
        auditAt: new Date().toISOString() as any,

        handleStatus: 0,
        handleAt: new Date().toISOString() as any,

        userId: '0',
        type: 0,
        application: 0,
        tags: '',
      }

      const [isExist] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'oschina'),
            eq(freelancerTask.title, task.title ?? ''),
          ),
        )
        .limit(1)

      const [existing] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'oschina'),
            eq(freelancerTask.title, `${task.title}`),
          ),
        )
        .limit(1)

      if (existing) {
        await this.drizzle.db
          .update(freelancerTask)
          .set(task as any)
          .where(eq(freelancerTask.id, existing.id))
      } else {
        await this.drizzle.db.insert(freelancerTask).values(task as any)
      }

      if (!isExist) {
        // 任务加入到提醒队列，给 给webhook 发送任务更新提醒

        // 抓取详情，详情链接添加到 redis 队列
        await this.urlsQueue.add({
          url: `https://zb.oschina.net/project/detail.html?id=${item.id}`,
        })
      }
    })
  }
}

import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service'
import { SourceType, SpiderTask } from '@/modules/tech/spider/spider.interface'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { CodemartTask } from '../interfaces/codemart.interface'
import { Queue } from 'bull'
import { InjectQueue } from '@nestjs/bull'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { freelancerTask } from '@/core/database/drizzle/schema'

// https://codemart.com/projects

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

@Injectable()
export class CodemartService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly httpService: HttpService,
    private readonly freelancerService: FreelancerService,
    @InjectQueue('remind') private remindQueue: Queue
  ) {}

  async spiderCodemart() {
    const response = await this.httpService.axiosRef.get(
      'https://codemart.com/api/project',
      {
        headers: {
          accept: 'application/json',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language':
            'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
        },
      }
    )
    const { rewards: data } = response.data

    let remindTask

    await asyncForEach(data, async (item: CodemartTask) => {
      let task: Partial<SpiderTask> = {
        source: 'codemart' as any,
        sourceId: `${item.id}`,
        title: item.name,
        desc: item.description,
        url: `https://codemart.com/project/${item.id}`,
        minPrice: '0' as any,
        maxPrice: '0' as any,
        fixedPrice: item.price,
        bargain: item.bargain,
        cycle: +item.duration,
        cycleName: '天',
        date: new Date(+item.pubTime).toISOString() as any,
        applyCount: item.applyCount ?? 0,
        visitCount: +item.visitCount,
        status: item.status,
        auditStatus: 0, // 审核状态
        auditReason: '', // 审核原因
        auditAt: new Date().toISOString() as any, // 审核时间

        handleStatus: 0, // 处理状态？
        handleAt: new Date().toISOString() as any, // 处理时间？

        userId: '', // 加密，随时间变化
        type: 0, // item.typeText // 类型，软件项目、悬赏任务
        application: 0, // 应用类型
        tags: '', // 标签列表
      }

      const [isExist] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'codemart'),
            eq(freelancerTask.title, `${task.title}`),
          ),
        )
        .limit(1)

      // 改成 upsert，已经存在的话更新状态，包括申请人数等信息，
      // 等服务器负载过高的时候再考虑简化算法
      let [existing] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'codemart'),
            eq(freelancerTask.title, `${task.title}`),
          ),
        )
        .limit(1)

      if (existing) {
        const [updated] = await this.drizzle.db
          .update(freelancerTask)
          .set(task as any)
          .where(eq(freelancerTask.id, existing.id))
          .returning()
        remindTask = updated
      } else {
        const [created] = await this.drizzle.db
          .insert(freelancerTask)
          .values(task as any)
          .returning()
        remindTask = created
      }

      if (!isExist) {
        // 加入提醒队列，设置提醒，
        await this.remindQueue.add(remindTask)

        // 加入下一页队列，设置抓取下一页

        // 加入详情页队列，设置抓取详情页
      }
    })
  }
}

import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { freelancerTask } from '@/core/database/drizzle/schema'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { SourceType, SpiderTask } from '../../spider.interface'
import iconv from 'iconv-lite'

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// https://www.a5.cn/tasklist.html
// https://www.a5.cn/tasklist-page-2.html
@Injectable()
export class A5Service {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly httpService: HttpService,
    private readonly freelancerService: FreelancerService
  ) {}

  async spider() {
    const response = await this.httpService.axiosRef.get(
      'https://www.a5.cn/tasklist.html',
      {
        headers: {
          accept: 'application/json',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language':
            'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
        },
        responseType: 'arraybuffer',
      }
    )
    const $ = cheerio.load(iconv.decode(response.data, 'gbk'))

    const tasks: Partial<SpiderTask>[] = []

    $('.m-tk-list ul li').each((index, item) => {
      const $item = $(item)
      console.log('date: ', $item.find('.col-sm-3 .m-tk-times').text())
      console.log(
        'date: ',
        +$item.find('.col-sm-7 h3 a i.fa-cny').text().replace('&nbsp;', '')
      )
      console.log('date: ', '0')

      let task: Partial<SpiderTask> = {
        source: 'a5' as any,
        title: $item.find('.col-sm-7 h3 a').text(),
        desc: $item.find('.col-sm-7 .m-tk-infos').text(),
        url: $item.find('.col-sm-7 h3 a').attr('href') ?? '',
        // minPrice: new Prisma.Decimal(+$item.find('.col-sm-7 h3 a i.fa-cny').text().replace('&nbsp;', '')),
        // maxPrice: new Prisma.Decimal(0),
        fixedPrice: $item.find('.col-sm-2 .m-tk-nomoney').text(),
        bargain: false,
        cycle: 0,
        cycleName: '天',
        date: new Date().toISOString() as any,
        applyCount: Number($item.find('.col-sm-3 p em').text()), // 已经投递人,
        visitCount: 0,
        status: '',
        auditStatus: 0,
        auditReason: '',
        auditAt: new Date().toISOString() as any,
        handleStatus: 0,
        handleAt: new Date().toISOString() as any,
        userId: '',
        type: 0,
        application: 0,
        tags: '',
      }
      task.sourceId = task.url?.replace('task-id-', '').replace('.html', '')

      tasks.push(task)
    })

    await asyncForEach(tasks, async (task) => {
      const [isExist] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, task.source as any),
            eq(freelancerTask.title, task.title),
          ),
        )
        .limit(1)
      console.log('task: ', task)

      const [existing] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, task.source as any),
            eq(freelancerTask.title, `${task.title}`),
          ),
        )
        .limit(1)

      let remindTask
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
        this.freelancerService.remind(remindTask)
      }
    })
  }
}

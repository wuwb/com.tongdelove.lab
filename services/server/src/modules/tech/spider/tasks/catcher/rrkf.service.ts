import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service'
import { SourceType, SpiderTask } from '@/modules/tech/spider/spider.interface'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { freelancerTask } from '@/core/database/drizzle/schema'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { RrkfDemo } from './rrkf.demo'
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// http://rrkf.com/serv/request
@Injectable()
export class RrkfService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly httpService: HttpService,
    private readonly freelancerService: FreelancerService
  ) {}

  async spider() {
    const response = await this.httpService.axiosRef.get(
      'http://rrkf.com/serv/request',
      {
        headers: {
          accept: 'application/json',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language':
            'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
        },
      }
    )
    const $ = cheerio.load(response.data)

    const tasks: Partial<SpiderTask>[] = []

    $('.row .r-list').each((index, item) => {
      const $item = $(item)

      console.log('date: ', $item.find('.col-sm-3 .m-tk-times').text())

      const task: Partial<SpiderTask> = {
        source: 'rrkf' as any,
        title: $item.find('.col-sm-4 .r-info h4 .text-overflow15').text(),
        desc: $item.find('.col-sm-4 .r-info p.text-overflow20').text(),
        url:
          'http://rrkf.com' +
          $item.find('.col-sm-4 .r-info h4 .text-overflow15').attr('href'),
        fixedPrice: $item.find('.col-sm-3 .r-price').text(),
        date: new Date().toISOString() as any,
        applyCount: Number(
          $item.find('.col-sm-2 span:first').text() === '暂无投标'
            ? '0'
            : $item
                .find('.col-sm-2 span')
                .text()
                .replace('参与招标', '')
                .replace('竞标中', '')
        ), // 已经投递人,
        status: $item.find('.col-sm-2:last span').text(),
        auditAt: new Date().toISOString() as any,
        handleAt: new Date().toISOString() as any,
      }
      task.sourceId = `${task.url?.replace('http://rrkf.com/serv/requestDetail?id=', '')}`

      tasks.push(task)
    })

    await asyncForEach(tasks, async (task) => {
      const [isExist] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'rrkf'),
            eq(freelancerTask.title, `${task.title}`),
          ),
        )
        .limit(1)
      // 改成 upsert，已经存在的话更新状态，包括申请人数等信息，
      // 等服务器负载过高的时候再考虑简化算法
      const [existing] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'rrkf'),
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
        // this.freelancerService.remind(remindTask);
      }
    })
  }
}

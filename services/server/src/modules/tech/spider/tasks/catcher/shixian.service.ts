import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service'
import { SourceType, SpiderTask } from '@/modules/tech/spider/spider.interface'
import { and, eq } from 'drizzle-orm'
import { DrizzleService } from '@/core/database/drizzle/drizzle.service'
import { freelancerTask } from '@/core/database/drizzle/schema'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { ShixianDemo } from './shixian.demo'
async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// https://shixian.com/job/all
// https://shixian.com/job/all?page=2&sort_arrow=down
@Injectable()
export class ShixianService {
  constructor(
    private readonly drizzle: DrizzleService,
    private readonly httpService: HttpService,
    private readonly freelancerService: FreelancerService
  ) {}

  async spider() {
    console.log('start: ...')
    const response = await this.httpService.axiosRef.get(
      'https://shixian.com/job/all',
      {
        // headers: {
        //   'accept': 'application/json',
        //   'accept-encoding': 'gzip, deflate, br',
        //   'accept-language': 'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
        //   'cache-control': 'no-cache',
        //   'Host': 'shixian.com',
        //   'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36'
        // }
      }
    )

    const $ = cheerio.load(response.data)
    const tasks: Partial<SpiderTask>[] = []

    $('.job-list .job').each((index, item) => {
      const $item = $(item)

      console.log('date: ', $item.find('.col-sm-3 .m-tk-times').text())

      let task: Partial<SpiderTask> = {
        source: 'shixian' as any,
        title: $item.find('.title').text(),
        desc: $item.find('.describe').text(),
        url: 'https://shixian.com' + $item.find('.info > a').attr('href'),
        fixedPrice: $item.find('.price').text(),
        cycle: Number(
          $item
            .find('.about dl:first-child dd')
            .text()
            .replace('工期：', '')
            .replace('天', '')
        ),
        cycleName: '天',
        date: new Date().toISOString() as any,
        auditAt: new Date().toISOString() as any,
        handleAt: new Date().toISOString() as any,
        applyCount: Number($item.find('.number').text()), // 已经投递人数
        status: $item.find('.col-sm-2:last span').text(),
        userName: $item.find('.info .user .name').text(),
        userUrl: $item.find('.info .user .name').attr('href'),
        tags: $item.find('.skill-tags').text(),
      }
      task.sourceId = task.url?.replace('https://shixian.com/jobs/', '')

      tasks.push(task)
    })

    await asyncForEach(tasks, async (task) => {
      console.log('task: ', task)
      const [isExist] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'shixian'),
            eq(freelancerTask.title, `${task.title}`),
          ),
        )
        .limit(1)

      const [existing] = await this.drizzle.db
        .select()
        .from(freelancerTask)
        .where(
          and(
            eq(freelancerTask.source, 'shixian'),
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

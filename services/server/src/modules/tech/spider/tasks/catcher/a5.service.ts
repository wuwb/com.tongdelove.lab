import { FreelancerService } from '@/modules/tech/freelancer/freelancer.service'
import { PrismaService } from '@/core/database/prisma/prisma.service'
import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import * as cheerio from 'cheerio'
import { SourceType, SpiderTask } from '../../spider.interface'
import iconv from 'iconv-lite'
import { SourceEnum, Prisma } from '@prisma/client'

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
    private readonly prisma: PrismaService,
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
        new Prisma.Decimal(
          +$item.find('.col-sm-7 h3 a i.fa-cny').text().replace('&nbsp;', '')
        )
      )
      console.log('date: ', new Prisma.Decimal(0))

      let task: Partial<SpiderTask> = {
        source: SourceEnum['a5'],
        title: $item.find('.col-sm-7 h3 a').text(),
        desc: $item.find('.col-sm-7 .m-tk-infos').text(),
        url: $item.find('.col-sm-7 h3 a').attr('href') ?? '',
        // minPrice: new Prisma.Decimal(+$item.find('.col-sm-7 h3 a i.fa-cny').text().replace('&nbsp;', '')),
        // maxPrice: new Prisma.Decimal(0),
        fixedPrice: $item.find('.col-sm-2 .m-tk-nomoney').text(),
        bargain: false,
        cycle: 0,
        cycleName: '天',
        date: new Date(),
        applyCount: Number($item.find('.col-sm-3 p em').text()), // 已经投递人,
        visitCount: 0,
        status: '',
        auditStatus: 0,
        auditReason: '',
        auditAt: new Date(),
        handleStatus: 0,
        handleAt: new Date(),
        userId: '',
        type: 0,
        application: 0,
        tags: '',
      }
      task.sourceId = task.url?.replace('task-id-', '').replace('.html', '')

      tasks.push(task)
    })

    await asyncForEach(tasks, async (task) => {
      let isExist = await this.prisma.freelancerTask.findFirst({
        where: {
          source: task.source,
          title: task.title,
        },
      })
      console.log('task: ', task)
      let remindTask = await this.prisma.freelancerTask.upsert({
        where: {
          source_title: {
            source: task.source,
            title: `${task.title}`,
          },
        },
        create: <any>task,
        update: <any>task,
      })

      if (!isExist) {
        this.freelancerService.remind(remindTask)
      }
    })
  }
}

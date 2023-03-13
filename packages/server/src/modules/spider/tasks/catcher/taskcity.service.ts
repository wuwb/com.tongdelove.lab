import { FreelancerService } from "@/modules/freelancer/freelancer.service";
import { PrismaService } from '@/processors/prisma/prisma.service';
import { SourceType, SpiderTask } from "@/modules/spider/spider.interface";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import * as cheerio from 'cheerio';
import { TaskcityDemo } from './taskcity.demo';
import { SourceEnum, Prisma } from '@prisma/client';
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// 智城
// https://www.taskcity.com/projects
@Injectable()
export class TaskcityService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly freelancerService: FreelancerService,
    ) {

    }

    async spider() {
        const response = await this.httpService.axiosRef.get('https://www.taskcity.com/projects', {
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
            }
        });

        const $ = cheerio.load(response.data);

        const tasks: Partial<SpiderTask>[] = [];

        $('.panel-body .col-sm-9 .media .media-body').each((index, item) => {
            const $item = $(item);
            const rightTest = $item.find('.col-sm-4 p').text();
            console.log('rightTest: ', rightTest);

            let task: Partial<SpiderTask> = {
                source: SourceEnum['taskcity'],
                title: $item.find('.col-sm-8 .media-heading a').text(),
                url: 'https://taskcity.com' + $item.find('.col-sm-8 .media-heading a').attr('href'),
                desc: $item.find('.col-sm-8 p').text(),
                minPrice: new Prisma.Decimal(0),
                fixedPrice: <any>rightTest.match(/项目预算：[\u4e00-\u9fa5]+/g),
                date: <any>rightTest.match(/(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/g),
                num: rightTest.match(/项目竞标： [1-9]\d*/g),
                status: <any>rightTest.match(/[\u4e00-\u9fa5]{0,2}竞标中/g),
            }
            task.sourceId = task.url?.replace('https://taskcity.com/projects/', '');

            tasks.push(task);
        });

        console.log('tasks: ', tasks);


        // let isExist = false;
        // let remindItem;

        // await asyncForEach(data, async (item: CodemartTask) => {
        //   if (isExist) {
        //     return Promise.resolve();
        //   }

        //   const ifExist = await this.prisma.freelancerTask.findFirst({
        //     where: {
        //       url: `https://codemart.com/project/${item.id}`,
        //     }
        //   });
        //   if (ifExist) {
        //     isExist = true;
        //     return Promise.resolve();
        //   }

        //   // 原始记录为招募中，最新抓取记录为已完成招募的话，更新记录，
        //   // 原始记录状态为已完成招募的话，丢弃记录，不再进行更新。
        //   if (item.statusText !== '招募中') {
        //     return Promise.resolve();
        //   }

        //   // 大于 30 天， 3600*24*30*1000
        //   if (+new Date() - +item.pubTime > 2592000000) {
        //     return Promise.resolve();
        //   }

        //   // 改成 upsert，已经存在的话更新状态，包括申请人数等信息，
        //   // 等服务器负载过高的时候再考虑简化算法
        //   remindItem = await this.prisma.freelancerTask.create({
        //     data: {
        //       title: item.name,
        //       content: item.description,
        //       price: item.price,
        //       duration: +item.duration,
        //       time: new Date(+item.pubTime),
        //       origin: 'codemart', // codemart
        //       url: `https://codemart.com/project/${item.id}`,
        //       originId: `${item.id}`,
        //       applyCount: item.applyCount ? + item.applyCount : 0,
        //       visitCount: +item.visitCount,
        //       bargain: item.bargain,
        //       status: item.status,
        //       type: item.typeText,
        //     },
        //   });
        //   // this.freelancerService.remind(remindItem);
        // });

    }
}


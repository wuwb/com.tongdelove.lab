import { FreelancerService } from "@/modules/tech/freelancer/freelancer.service";
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CodemartTask } from '../interfaces/codemart.interface';
import * as cheerio from 'cheerio';
import { SourceType, SpiderTask } from "@/modules/tech/spider/spider.interface";
import { SourceEnum, Prisma } from '@prisma/client';
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// https://www.yuanjisong.com/job
// https://www.yuanjisong.com/job/allcity/page2
@Injectable()
export class YuanjisongService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly freelancerService: FreelancerService,
    ) {

    }

    async spider() {
        const response = await this.httpService.axiosRef.get('https://www.yuanjisong.com/job', {
            headers: {
                'accept': 'application/json',
                'accept-encoding': 'gzip, deflate, br',
                'accept-language': 'zh,zh-CN;q=0.9,zh-TW;q=0.8,en;q=0.7,en-US;q=0.6,ja;q=0.5',
            }
        });

        const $ = cheerio.load(response.data);

        const tasks: any = [];

        $('.consultant_title').each((index, item) => {
            const $item = $(item);

            console.log('date: ', $item.find('dl dd span.margin_left_1 a').text());
            console.log('type: ', $item.find('p span').text());

            let task: Partial<SpiderTask> = {
                source: SourceEnum['yuanjisong'],
                title: $item.find('a h4 dl dd b').text(),
                desc: $item.find('.margin_bottom_10').text(),
                url: $item.find('a').attr('href'),
                fixedPrice: $item.find('p span.rixin-text-jobs').text(),
                userName: $item.find('dl dd a.margin_left_1 span').text(),
                userUrl: $item.find('dl dd a.margin_left_1').attr('href'),
                date: new Date(),
                applyCount: Number($item.find('div span i.i_post_num').text()), // 已经投递人
                type: 0,
                auditAt: new Date(),
                handleAt: new Date(),
            }
            task.sourceId = task.url?.replace('https://www.yuanjisong.com/job/', ''),

                tasks.push(task);
        });

        await asyncForEach(tasks, async (task) => {
            const isExist = await this.prisma.freelancerTask.findFirst({
                where: {
                    source: SourceEnum['yuanjisong'],
                    title: task.title,
                }
            });

            // 改成 upsert，已经存在的话更新状态，包括申请人数等信息，
            // 等服务器负载过高的时候再考虑简化算法
            let remindTask = await this.prisma.freelancerTask.upsert({
                where: {
                    source_title: {
                        source: SourceEnum['yuanjisong'],
                        title: task.title,
                    }
                },
                create: <any>task,
                update: <any>task,
            });
            if (!isExist) {
                // this.freelancerService.remind(remindTask);
            }
        });

    }
}


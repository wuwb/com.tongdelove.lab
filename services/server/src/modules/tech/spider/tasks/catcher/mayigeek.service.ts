import { FreelancerService } from "@/modules/tech/freelancer/freelancer.service";
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { HttpService } from "@nestjs/axios";
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from "@nestjs/common";
import { Queue } from 'bull';
import { MayigeekTask } from "../interfaces/mayigeek.interface";
import { SourceType, SpiderTask } from '../../spider.interface';
import { SourceEnum, Prisma } from '@prisma/client';
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

// https://www.mayigeek.com/api/public/searchProjects?page=1&perpage=8&statusStr=&teriminal=&order_by=
@Injectable()
export class MayigeekService {
    url: string;

    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService,
        private readonly freelancerService: FreelancerService,
        @InjectQueue('urls')
        private readonly urlsQueue: Queue,
        @InjectQueue('remind')
        private readonly remindQueue: Queue,
    ) {
        this.url = 'https://www.mayigeek.com/api/public/searchProjects';
    }

    async spider() {
        const response = await this.httpService.axiosRef.get(`${this.url}?page=1&perpage=8&statusStr=&teriminal=&order_by=`, {
            headers: {
                'accept': 'application/json, text/plain, */*',
                'referer': 'https://www.mayigeek.com/tab/taskList',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            }
        });

        const { info: data } = response.data;

        console.log('data: ', data.info.list);

        await asyncForEach(data.info.list, async (item: MayigeekTask) => {
            const task: Partial<SpiderTask> = {
                source: SourceEnum['mayigeek'],
                sourceId: item.id,
                title: item.name,
                desc: item.desc,
                url: `https://www.mayigeek.com/tab/projectDetail?id=${item.id}`,
                fixedPrice: item.min_price.toString(),
                bargain: false,
                cycle: +item.day,
                cycleName: '天',
                date: new Date(item.create_date),
                applyCount: Number(item.apply_times),
                visitCount: Number(item.browse_times),
                status: item.status,
                auditStatus: 0,
                auditReason: '',
                auditAt: new Date(),
                handleStatus: 0,
                handleAt: new Date(),
                userId: '',
                type: 0,
                application: 0,
                tags: '',
            };

            let isExist = await this.prisma.freelancerTask.findFirst({
                where: {
                    source: SourceEnum['mayigeek'],
                    title: task.title,
                }
            });

            let remindTask = await this.prisma.freelancerTask.upsert({
                where: {
                    source_title: {
                        source: SourceEnum['mayigeek'],
                        title: `${task.title}`
                    }
                },
                create: <any>task,
                update: <any>task,
            });

            if (!isExist) {
                // 链接添加到 redis 队列
                await this.remindQueue.add({
                    data: JSON.stringify(remindTask),
                });
            }
        });
    }
}

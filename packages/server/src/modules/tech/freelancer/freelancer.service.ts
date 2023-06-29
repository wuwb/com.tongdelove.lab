import { DingdingService } from '@/core/sms/dingding/dingding.service';
import { WebhookService } from '@/core/sms/webhook/webhook.service';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { ISourceType } from '../spider/spider.interface';
import { SourceEnum } from "@prisma/client";
import { ApiException } from '@/common/exceptions/api.exception';


@Injectable()
export class FreelancerService {
    private readonly logger = new Logger(FreelancerService.name);

    constructor(
        public readonly prisma: PrismaService,
        private readonly dingdingService: DingdingService,
        private readonly webhookService: WebhookService,
    ) { }

    async getFreeProjects(page, limit) {
        const skip = (page - 1) * limit;

        const data = await this.prisma.freelancerTask.findMany({
            skip: skip,
            take: limit,
        });
        const total = await this.prisma.freelancerTask.count();

        if (!data) {
            throw new ApiException(10011, `No data found`);
        }
        return {
            data,
            total
        };
    }

    async getTaskById(id: string) {
        const result = await this.prisma.freelancerTask.findUnique({
            where: {
                id,
            }
        });

        return result;
    }

    async remind(data) {
        const remindTarget = await this.prisma.subscribesWebhook.findMany({
            where: {
                remindSource: SourceEnum[data.source] // 'codemar',
            }
        });

        if (!remindTarget || remindTarget.length === 0) {
            return;
        }

        let result: any[] = [];

        for (var i = 0, len = remindTarget.length; i < len; i++) {
            let item: any = remindTarget[i];

            if (item.webhookType === 'feishu') {
                //
            } else if (item.webhookType === 'dingding') {
                let url = `${item.webhook}?token=${item.secret}`;
                await this.dingdingService.sendTextToWebhook(url, data);
            } else if (item.webhookType === 'wechat') {
                let url = `${item.webhook}`;
                let tmp = await this.webhookService.sendMarkdown(url, `[${data.source}] ${data.title} \n ${data.desc} \n ${data.date} \n [查看详情](${data.url})`);
                result.push(tmp);
            }
        }
        return result;
    }

    async subscribe(webhook, user) {
        // 加入事物
        try {
            const subscribesWebhook = await this.prisma.subscribesWebhook.create({
                data: {
                    webhook: webhook.webhook,
                    secret: webhook.secret,
                    webhookType: webhook.webhookType,
                    remindSource: SourceEnum[webhook.remindSource], // 转 enum
                    remindType: webhook.remindType,
                }
            });
            this.logger.log('subscribesWebhook: ', subscribesWebhook);
            const bind = await this.prisma.subscribesWebhook2user.create({
                data: {
                    webhookId: subscribesWebhook.id,
                    userId: user.id,
                }
            });
            return bind;
        } catch (err) {
            this.logger.log(err);
        }
    }
}

import { User } from '@/common/decorators/user.decorator';
import { ParseIntPipe } from '@/common/pipes/parse-int.pipe';
import { JwtAuthGuard } from '@/modules/system/auth/guards/jwt-auth.guard';
import { DingdingService } from '@/core/sms/dingding/dingding.service';
import { WebhookService } from '@/core/sms/webhook/webhook.service';
import { HttpService } from '@nestjs/axios';
import {
    Body, Controller, Get, HttpException, Logger, Param, Post, Query, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PrismaService } from '@/core/database/prisma/prisma.service';
import { FreelancerService } from './freelancer.service';
import { CurrentUser } from '@/common/decorators/current-user.decorator';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';
import { ISourceType } from '../spider/spider.interface';
import { SourceEnum } from '@prisma/client';

@Controller('api/freelancer')
@ApiTags('freelancer')
export class FreelancerController {
    private readonly logger = new Logger(FreelancerController.name);

    constructor(
        public readonly prisma: PrismaService,
        public readonly freelancerService: FreelancerService,
        public readonly dingdingService: DingdingService,
        public readonly httpService: HttpService,
        private readonly webhookService: WebhookService,
    ) { }

    @Get('tasks')
    async getTasks(@Query('pageSize', new ParseIntPipe()) pageSize: number = 10, @Query('page') page: number = 1) {
        let data = await this.freelancerService.getFreeProjects({
            take: pageSize,
            skip: page - 1,
        });

        this.logger.debug(data);

        return data;
    }

    @Get('tasks/:id')
    async getTask(@Param('id') id: string = '1') {
        let result = await this.freelancerService.getTaskById(id);

        return result;
    }

    // 企业微信群订阅测试
    // https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=e356e57c-53d2-47fc-8dea-cce467270129
    @UseGuards(JwtAuthGuard)
    @Post('subscribe')
    async getSubscribe(@Body() body: CreateSubscribeDto, @User() user) {
        this.logger.log('-------------------------------------------------------');
        this.logger.log('body: ', body, user);
        this.logger.debug('body: ', JSON.stringify(body));
        this.logger.log('-------------------------------------------------------');
        let webhook: any;
        if (body.source.length === 0) {
            throw new HttpException('请勾选订阅源', 500);
        }

        if (
            body.wechatWebhook.webhook !== ''
            && body.wechatWebhook.webhook.indexOf('https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=') !== 0) {
            throw new HttpException('企业微信群机器人链接错误', 500);
        }

        for (var i = 0; i < body.source.length; i++) {
            if (body.dingdingWebhook.webhook !== '') {
                webhook = {
                    webhook: body.dingdingWebhook.webhook,
                    secret: body.dingdingWebhook.secret,
                    webhookType: 'dingding',
                    remindSource: SourceEnum[body.source[i]!],
                    remindType: 'project',
                }
                await this.freelancerService.subscribe(webhook, user);
            }
            if (body.feishuWebhook.webhook !== '') {
                webhook = {
                    webhook: body.feishuWebhook.webhook,
                    secret: body.feishuWebhook.secret,
                    webhookType: 'feishu',
                    remindSource: SourceEnum[body.source[i]!],
                    remindType: 'project',
                }
                await this.freelancerService.subscribe(webhook, user);
            }
            if (body.wechatWebhook.webhook !== '') {
                webhook = {
                    webhook: body.wechatWebhook.webhook,
                    secret: '',
                    webhookType: 'wechat',
                    _remindSource: SourceEnum[body.source[i]!],
                    get remindSource() {
                        return this._remindSource;
                    },
                    set remindSource(value) {
                        this._remindSource = value;
                    },
                    remindType: 'project',
                }
                await this.freelancerService.subscribe(webhook, user);
            }
        }
        return '订阅成功';
    }

    @Post('subscribe-test')
    async subscribeTest(@Body() body: CreateSubscribeDto) {
        this.logger.log(body);
        // 获取 tasks 表第一条数据进行推搡
        if (body.dingdingWebhook.webhook !== '') {
            await this.dingdingService.sendTextToWebhook(`${body.dingdingWebhook.webhook}?access_token=${body.dingdingWebhook.secret}`, '测试内容')
        }

        if (body.feishuWebhook.webhook !== '') {
            await this.dingdingService.sendTextToWebhook(`${body.feishuWebhook.webhook}?access_token=${body.feishuWebhook.secret}`, '订阅测试');
        }

        if (body.wechatWebhook.webhook !== '') {
            let result = await this.webhookService.sendText(body.wechatWebhook.webhook, '订阅测试');
            this.logger.log(result);
        }

        return '已发送测试消息';
    }

    @Get('remind-test')
    async remindTest() {
        let result = await this.freelancerService.remind({
            "id": 247,
            "source": "codemart",
            "sourceId": "34059",
            "title": "网狐荣耀微星游戏搭建及二开",
            "desc": "网狐荣耀微星游戏搭建及二开，增加游戏功能，例如排行榜，游客登录，对接三方支付，更新游戏UI界面，有设计图，增加大转盘，排行榜奖励，推广功能等子功能模块，需要对该类型开发比较熟悉，上手快的开发，最好是全栈",
            "minPrice": "0",
            "maxPrice": "0",
            "fixedPrice": "5000",
            "bargain": false,
            "cycle": 7,
            "cycleName": "天",
            "date": "2022-10-27T04:36:09.000Z",
            "url": "https://codemart.com/project/34059",
            "applyCount": 3,
            "visitCount": 90,
            "status": "RECRUITING",
            "auditStatus": 0,
            "auditReason": "",
            "auditAt": "2022-10-29T08:10:04.475Z",
            "handleStatus": 0,
            "handleAt": "2022-10-29T08:10:04.475Z",
            "userId": 0,
            "userName": "",
            "userUrl": "",
            "type": 0,
            "application": 0,
            "tags": "",
            "createdAt": "2022-10-29T07:50:03.239Z",
            "updatedAt": "2022-10-29T08:10:04.482Z"
        });

        return result;
    }
}

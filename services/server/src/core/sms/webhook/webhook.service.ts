import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { $defaultHttp } from '@/common/interceptors/axios.interceptor';

type WechatBotNewsArticle = {
    title: string;
    description: string;
    url: string;
    picurl: string[];
}

type WechatBotNews = {
    articles: WechatBotNewsArticle[];
}

type WechatBotTextMsgBody = {
    content: string;
    mentioned_list?: string[];
    mentioned_mobile_list?: string[];
}

// https://developer.work.weixin.qq.com/document/path/91770
// https://open.dingtalk.com/document/group/custom-robot-access
@Injectable()
export class WebhookService {
    private readonly logger = new Logger(WebhookService.name);

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    async sendText(url: string, content: string, mentioned_list: string[] = [], mentioned_mobile_list: string[] = []) {
        // 过滤
        // 文本内容，最长不超过2048个字节，必须是utf8编码
        this.logger.debug(url);
        let data: WechatBotTextMsgBody = {
            content,
        };

        if (mentioned_list) {
            data.mentioned_list = mentioned_list;
        }

        if (mentioned_mobile_list) {
            data.mentioned_mobile_list = mentioned_mobile_list;
        }
        this.logger.debug(data);

        const result = await this.httpService.axiosRef.post(url, {
            msgtype: "text",
            text: data,
        });

        return result;
    }

    async sendMarkdown(url: string, content) {
        // 过滤
        this.logger.debug(url);

        // markdown内容，最长不超过4096个字节，必须是utf8编码
        let result = await this.httpService.axiosRef.post(url, {
            "msgtype": "markdown",
            "markdown": {
                "content": content
            },
        });
        return result.data;
    }

    async sendImage(url: string, base64, md5) {
        let result = await this.httpService.axiosRef.post(url, {
            "msgtype": "image",
            "image": {
                "base64": base64,
                "md5": md5,
            },
        });
        return result;

    }

    async sendNews(url: string, news: WechatBotNews) {
        let result = await this.httpService.axiosRef.post(url, {
            "msgtype": "news",
            "news": news,
        });
        return result;

    }

    async sendFile(url: string, mediaId) {
        let result = await this.httpService.axiosRef.post(url, {
            "msgtype": "file",
            "file": {
                "media_id": mediaId,
            }
        });
        return result;

    }

    // 文本通知模板
    async sendTextNoticeCard() {

    }
    // 图文展示模板卡片
    async sendNewsNoticeCard() {

    }

    // 媒体上传

}

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

// https://open.dingtalk.com/document/group/custom-robot-access
@Injectable()
export class DingdingService {

    constructor(
        private readonly httpService: HttpService,
    ) {
    }

    // curl 'https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx' \
    //  -H 'Content-Type: application/json' \
    //  -d '{"msgtype": "text","text": {"content":"我就是我, 是不一样的烟火"}}'
    async sendTextToWebhook(url: string, text: string, atMobiles = [], atUserIds = [], isAtAll = false) {
        const result = await this.httpService.post(url, {
            "at": {
                "atMobiles": atMobiles,
                "atUserIds": atUserIds,
                "isAtAll": isAtAll,
            },
            "text": {
                "content": text,
            },
            "msgtype": "text"
        });
        console.log('result: ', result);
        return result;
    }

}

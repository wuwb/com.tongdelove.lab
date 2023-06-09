import { ConfigService } from "@/config/config.service";
import { Injectable } from "@nestjs/common";
import axios from "axios";



@Injectable()
export class SendgridConfigService {
    constructor(
        private readonly configService: ConfigService,
    ) { }

    async pushToRobot({ data, nums }, links) {
        return axios('https://oapi.dingtalk.com/robot/send?', {
            method: 'post',
            params: {
                access_token: this.configService.get('dingAccessToken'), // 钉钉群
            },
            data: {
                feedCard: {
                    links,
                },
                msgtype: 'feedCard',
            },
        }).then((res) => {
            const { errmsg, errcode } = res.data;
            return {
                errcode,
                errmsg,
            };
        });
    }
}

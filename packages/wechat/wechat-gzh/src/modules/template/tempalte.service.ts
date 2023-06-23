// 声明使用严格模式
"use strict";

// 导入模块
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { OFFICIAL_SEND_TEMPLATE_MESSAGE_URL } from "../constants/official.constant";
import { OfficialErrorWrapper } from "../decorators/error-wrapper.decorator";
import { OfficialUtil } from "../utils/official.util";
import * as JsonBig from "json-bigint";
import { OfficialError } from "../errors/official.error";
import { lastValueFrom } from "rxjs";

@Injectable()
export class TemplateService {
    constructor(
        private readonly httpService: HttpService,
        private readonly officialUtil: OfficialUtil
    ) { }

    /**
     * 发送模板消息
     * @param appid 公众号appID
     * @param openid 接收人openid
     * @param templateId 模板消息ID
     * @param data 消息内容
     * @param options 附加参数
     * @returns 模板消息发送结果
     */
    @OfficialErrorWrapper()
    async sendTemplateMessage(
        appid: string,
        openid: string,
        templateId: string,
        data: Record<string, any>,
        options?: Record<string, any>
    ): Promise<{ success: boolean, data: { messageId: string, message: string } }> {
        const bodyData = {
            touser: openid,
            template_id: templateId,
            data,
            ...options
        };
        const { data: res } = await lastValueFrom(this.httpService.post(
            OFFICIAL_SEND_TEMPLATE_MESSAGE_URL,
            bodyData,
            {
                params: { access_token: await this.officialUtil.getAccessToken(appid) },
                transformResponse: [res => JsonBig.parse(res)]
            }
        ));
        if (res.errcode) throw new OfficialError(res.errmsg?.toString());
        return { success: true, data: { messageId: res.msgid, message: JSON.stringify(bodyData) } };
    }
}

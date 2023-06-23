import { Injectable } from "@nestjs/common";
import { createHash } from "node:crypto";
import { OfficialErrorWrapper } from "../decorators/error-wrapper.decorator";
import { OfficialUtil } from "../utils/official.util";

@Injectable()
export class JSSDKService {
    constructor(
        private readonly officialUtil: OfficialUtil
    ) { }

    /**
     * 生成JSSDK Ticket
     * @param appid 公众号appID
     * @param url url地址，不需要encode
     * @returns JSSDK Ticket
     */
    @OfficialErrorWrapper()
    async generateTicket(
        appid: string,
        url: string
    ): Promise<{ success: boolean, data: { timestamp: number, nonceStr: string, signature: string } }> {
        const ticket = await this.officialUtil.getJSSDKTicket(appid);
        const timestamp = Math.floor(Date.now() / 1000);
        const nonceStr = Math.random().toString(36).substring(2, 15);
        const rawStr = `jsapi_ticket=${ticket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${url}`;
        const signature = createHash('sha1').update(rawStr).digest('hex');
        return {
            success: true,
            data: {
                timestamp,
                nonceStr,
                signature
            }
        };
    }
}

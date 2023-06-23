import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
    /**
     * 生成JSSDK Ticket
     * @param appid 公众号appID
     * @param url url地址，不需要encode
     * @returns JSSDK Ticket
     */
    async generateTicket(appid: string, url: string): Promise<GenerateJSSDKTicketResponse> {

    }
}

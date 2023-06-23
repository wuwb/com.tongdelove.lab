import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { OPTIONS_PROVIDER } from '../constants/common.constant';
import { PLACE_ORDER_MP_URL } from '../constants/wechat-pay-mp.constant';
import { WechatPayErrorWrapper } from '../decorators/error-wrapper.decorator';
import { AuthUtil } from '../utils/auth.util';
import { DateUtil } from '../utils/date.util';
import { SignUtil } from '../utils/sign.util';

@Injectable()
export class PayMpService {
    constructor(
        @Inject(OPTIONS_PROVIDER) private readonly options: any,
        private readonly httpService: HttpService,
        private readonly authUtil: AuthUtil,
        private readonly signUtil: SignUtil,
        private readonly dateUtil: DateUtil
    ) { }

    /**
     * 统一下单接口
     * @param params 小程序支付下单参数
     * @returns 统一下单结果
     */
    @WechatPayErrorWrapper()
    async placeOrder(params: any) {
        Object.assign(params, { appid: this.options.appid, mchid: this.options.mchid });
        if (params.time_expire)
            Object.assign(params, { time_expire: this.dateUtil.parseWechatPayDate(params.time_expire) });

        const { data: res } = await firstValueFrom(
            this.httpService.post(
                PLACE_ORDER_MP_URL,
                params,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': '127.0.0.1',
                        Authorization: this.authUtil.authorization(HttpMethod.POST, PLACE_ORDER_MP_URL, params)
                    }
                }
            )
        );

        const timeStamp = Math.floor(Date.now() / 1000) + '';
        const nonceStr = Math.random().toString(36).substring(2, 15);
        const data = {
            appId: this.options.appid,
            timeStamp,
            nonceStr,
            package: `prepay_id=${res.prepay_id}`,
            signType: WechatPaySignType.RSA,
            paySign: this.signUtil.sha256WithRsa([this.options.subAppid || this.options.appid, timeStamp, nonceStr, `prepay_id=${res.prepay_id}`, ''].join('\n'))
        };
        if (this.options.subAppid) Object.assign(data, { subAppId: this.options.subAppid });
        return { success: true, data };
    }
}

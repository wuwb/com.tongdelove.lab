import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { OPTIONS_PROVIDER } from '@/common/constants/common.constant';
import { PLACE_ORDER_JSAPI_URL } from '../constants/wechat-pay-jsapi.constant';
import { WechatPayErrorWrapper } from '../decorators/error-wrapper.decorator';
import { AuthUtil } from '@/utils/auth.util';
import { DateUtil } from '@/utils/date.util';
import { SignUtil } from '@/utils/sign.util';

@Injectable()
export class PayJSAPIService {
    constructor(
        @Inject(OPTIONS_PROVIDER) private readonly options: any,
        private readonly httpService: HttpService,
        private readonly authUtil: AuthUtil,
        private readonly signUtil: SignUtil,
        private readonly dateUtil: DateUtil
    ) { }

    /**
     * 统一下单接口
     * @param params JSAPI支付下单参数
     * @returns 统一下单结果
     */
    @WechatPayErrorWrapper()
    async placeOrder(params: any) {
        Object.assign(params, {
            sp_appid: this.options.appid,
            sp_mchid: this.options.mchid,
            sub_mchid: this.options.subMchid
        });
        if (this.options.subAppid) Object.assign(params, { sub_appid: this.options.subAppid });
        if (params.time_expire)
            Object.assign(params, { time_expire: this.dateUtil.parseWechatPayDate(params.time_expire) });

        const { data: res } = await firstValueFrom(
            this.httpService.post(
                PLACE_ORDER_JSAPI_URL,
                params,
                {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'User-Agent': '127.0.0.1',
                        Authorization: this.authUtil.authorization(HttpMethod.POST, PLACE_ORDER_JSAPI_URL, params)
                    }
                }
            )
        );

        const timeStamp = Math.floor(Date.now() / 1000) + '';
        const nonceStr = Math.random().toString(36).substring(2,

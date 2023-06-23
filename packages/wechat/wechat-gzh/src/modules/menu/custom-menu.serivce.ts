import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { OFFICIAL_CREATE_CUSTOM_MENU_URL } from "../constants/official.constant";
import { OfficialErrorWrapper } from "../decorators/error-wrapper.decorator";
import { OfficialError } from "../errors/official.error";
import { OfficialUtil } from "../utils/official.util";

@Injectable()
export class OfficialCustomMenuService {
    constructor(
        private readonly httpService: HttpService,
        private readonly officialUtil: OfficialUtil
    ) { }

    /**
     * 创建公众号个性化菜单
     * @param appid 公众号appID
     * @param data 公众号个性化菜单信息
     * @returns 创建结果
     */
    @OfficialErrorWrapper()
    async create(
        appid: string,
        data: Record<string, any>
    ): Promise<{ success: boolean, data: { menuid: number } }> {
        const { data: res } = await lastValueFrom(this.httpService.post(
            OFFICIAL_CREATE_CUSTOM_MENU_URL,
            data,
            {
                params: { access_token: await this.officialUtil.getAccessToken(appid) }
            }
        ));
        console.log(res);
        if (res.errcode) throw new OfficialError(res.errmsg?.toString());
        return { success: true, data: { menuid: res.menuid } };
    }
}

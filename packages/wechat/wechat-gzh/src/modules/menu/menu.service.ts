// 声明使用严格模式
"use strict";

// 导入模块
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { OFFICIAL_CREATE_MENU_URL, OFFICIAL_DELETE_MENU_URL, OFFICIAL_GET_MENU_URL } from "../constants/official.constant";
import { OfficialError } from "../errors/official.error";
import { OfficialErrorWrapper } from "../decorators/error-wrapper.decorator";
import { OfficialUtil } from "../utils/official.util";

@Injectable()
export class MenuService {
    constructor(
        private readonly httpService: HttpService,
        private readonly officialUtil: OfficialUtil
    ) { }

    /**
     * 创建/更新公众号菜单
     * @param appid 公众号appID
     * @param data 公众号菜单信息
     * @returns 创建/更新结果
     */
    @OfficialErrorWrapper()
    async create(appid: string, data: any): Promise<{ success: boolean, data: boolean }> {
        const { data: res } = await lastValueFrom(this.httpService.post(
            OFFICIAL_CREATE_MENU_URL,
            data,
            {
                params: { access_token: await this.officialUtil.getAccessToken(appid) },
            }
        ));
        if (res.errcode) {
            throw new OfficialError(res.errmsg?.toString());
        }
        return { success: true, data: true };
    }

    /**
     * 删除公众号菜单
     * @param appid 公众号appID
     * @returns 删除结果
     */
    @OfficialErrorWrapper()
    async delete(appid: string): Promise<{ success: boolean, data: boolean }> {
        const { data } = await lastValueFrom(this.httpService.get(
            OFFICIAL_DELETE_MENU_URL,
            {
                params: {
                    access_token: await this.officialUtil.getAccessToken(appid)
                },
            }
        ));
        if (data.errcode) throw new OfficialError(data.errmsg?.toString());
        return { success: true, data: true };
    }

    /**
     * 查询公众号菜单信息
     * @param appid 公众号appID
     * @returns 查询结果
     */
    @OfficialErrorWrapper()
    async query(appid: string): Promise<{ success: boolean, data: any }> {
        const { data } = await lastValueFrom(this.httpService.get(
            OFFICIAL_GET_MENU_URL,
            {
                params: {
                    access_token: await this.officialUtil.getAccessToken(appid)
                },
            }
        ));
        if (data.errcode) throw new OfficialError(data.errmsg?.toString());
        return { success: true, data: data.menu };
    }
}

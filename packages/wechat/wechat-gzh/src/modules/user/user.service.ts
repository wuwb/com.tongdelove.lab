import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { OFFICIAL_GET_USER_TOKEN_URL, OFFICIAL_GET_USER_INFO_BY_OPEN_ID_URL, OFFICIAL_GET_USER_INFO_BY_TOKEN_URL, OFFICIAL_BATCH_GET_USER_INFO_BY_OPEN_ID_URL, OFFICIAL_GET_USER_OPENID_LIST_URL } from '../constants/official.constant';
import { OfficialErrorWrapper } from '../decorators/error-wrapper.decorator';
import { OfficialUtil } from '../utils/official.util';
import jsonBigInt from 'json-bigint';
import { lastValueFrom } from 'rxjs';
import { OfficialError } from '../errors/official.error';

@Injectable()
export class OfficialUserService {
    constructor(
        private readonly httpService: HttpService,
        private readonly officialUtil: OfficialUtil,
    ) { }

    /**
     * 解析用户临时code
     * @param appid 公众号appid
     * @param code 用户临时code
     * @returns 解析结果
     */
    @OfficialErrorWrapper()
    async resolveCode(appid: string, code: string) {
        const client = await this.officialUtil.getClient(appid);
        const { data } = await lastValueFrom(
            this.httpService.get(OFFICIAL_GET_USER_TOKEN_URL, {
                params: {
                    appid: appid,
                    secret: client.appSecret,
                    code: code,
                    grant_type: 'authorization_code',
                },
            }),
        );
        if (data.errcode) throw new OfficialError(data.errmsg?.toString());
        return {
            success: true,
            data: {
                access_token: data.access_token,
                expires_in: data.expires_in,
                refresh_token: data.refresh_token,
                openid: data.openid,
                scope: data.scope,
            },
        };
    }

    /**
     * 获取用户基本信息（UnionID机制）
     * @param appid 公众号appID
     * @param openid 公众号openid
     * @param lang 返回国家地区语言版本，默认简体中文
     * @returns 公众号用户信息
     */
    @OfficialErrorWrapper()
    async getInfo(
        appid: string,
        openid: string,
        lang = "zh_CN" /* OfficialLanguageType.ZH_CN */,
    ) {
        const { data } = await lastValueFrom(
            this.httpService.get(OFFICIAL_GET_USER_INFO_BY_OPEN_ID_URL, {
                params: {
                    access_token: await this.officialUtil.getAccessToken(appid),
                    openid: openid,
                    lang,
                },
                transformResponse: [res => jsonBigInt.parse(res)],
            }),
        );
        if (data.errcode) {
            throw new OfficialError(data.errmsg?.toString());
        }
        const userInfo = {
            subscribe: data.subscribe,
            openid: data.openid,
            nickname: data.nickname,
            sex: data.sex,
            city: data.city,
            country: data.country,
            province: data.province,
            language: data.language,
            headimgurl: data.headimgurl,
            subscribe_time: data.subscribe_time,
            remark: data.remark,
            groupid: data.groupid,
            tagid_list: data.tagid_list,
            subscribe_scene: data.subscribe_scene,
            qr_scene: data.qr_scene,
            qr_scene_str: data.qr_scene_str,
        };
        if (data.unionid) {
            Object.assign(userInfo, { unionid: data.unionid });
        }
        return { success: true, data: userInfo };
    }

    /**
     * 使用Token获取用户基本信息
     * @param openid 公众号用户openid
     * @param token 通过用户临时code解析出来的token
     * @param lang 返回国家地区语言版本，默认简体中文
     * @returns 公众号用户信息
     */
    @OfficialErrorWrapper()
    async getInfoByToken(
        openid: string,
        token: string,
        lang = "zh_CN" /* OfficialLanguageType.ZH_CN */,
    ) {
        const { data } = await lastValueFrom(
            this.httpService.get(OFFICIAL_GET_USER_INFO_BY_TOKEN_URL, {
                params: {
                    access_token: token,
                    openid: openid,
                    lang,
                },
            }),
        );
        if (data.errcode) {
            throw new OfficialError(data.errmsg?.toString());
        }
        return {
            success: true,
            data: {
                unionid: data.unionid,
                openid: data.openid,
                nickname: data.nickname,
                sex: data.sex,
                city: data.city,
                country: data.country,
                province: data.province,
                headimgurl: data.headimgurl,
                privilege: data.privilege
            }
        };
    }
    /**
     * 批量获取用户基本信息（UnionID机制）
     * @param appid 公众号appID
     * @param params 用户openid和语言列表
     * @returns 用户信息列表
     */
    async batchGetInfo(appid, params) {
        const { data } = await lastValueFrom(this.httpService.post(OFFICIAL_BATCH_GET_USER_INFO_BY_OPEN_ID_URL, {
            user_list: params
        }, {
            params: { access_token: await this.officialUtil.getAccessToken(appid) },
            transformResponse: [res => jsonBigInt.parse(res)]
        }));
        if (data.errcode) {
            throw new OfficialError(data.errmsg?.toString());
        }
        const { user_info_list: userInfoList } = data;
        const userList = userInfoList?.map(userInfo => {
            const user = {
                subscribe: userInfo.subscribe,
                openid: userInfo.openid,
                nickname: userInfo.nickname,
                sex: userInfo.sex,
                city: userInfo.city,
                country: userInfo.country,
                province: userInfo.province,
                language: userInfo.language,
                headimgurl: userInfo.headimgurl,
                subscribe_time: userInfo.subscribe_time,
                remark: userInfo.remark,
                groupid: userInfo.groupid,
                tagid_list: userInfo.tagid_list,
                subscribe_scene: userInfo.subscribe_scene,
                qr_scene: userInfo.qr_scene,
                qr_scene_str: userInfo.qr_scene_str
            };
            if (userInfo.unionid)
                Object.assign(user, { unionid: userInfo.unionid });
            return user;
        });
        return { success: true, data: userList };
    }
    /**
     * 获取关注公众号的openid列表
     * @param appid 公众号appID
     * @param nextOpenid 下一次拉取的起始值
     * @returns 关注者的openid列表信息
     */
    async getSubscriberOpenidList(appid, nextOpenid) {
        const { data } = await lastValueFrom(this.httpService.get(OFFICIAL_GET_USER_OPENID_LIST_URL, {
            params: { access_token: await this.officialUtil.getAccessToken(appid), next_openid: nextOpenid },
            transformResponse: [res => jsonBigInt.parse(res)]
        }));
        if (data.errcode)
            throw new OfficialError(data.errmsg?.toString());
        return {
            success: true,
            data: {
                total: data.total,
                count: data.count,
                openidList: data.data.openid,
                nextOpenid: data.next_openid
            }
        };
    }
}

import { ModuleMetadata, Type } from '@nestjs/common';
import { RedisOptions } from 'ioredis';
/** 公众号独立配置 */
export interface OfficialOptions {
    /** 公众号AppId */
    appid: string;
    /** 公众号AppSecret */
    appSecret: string;
    /** 公众号服务器配置Token */
    authToken: string;
    /** 公众号服务器配置消息加密解密密钥 */
    encodingAESKey: string;
}
/** 同步传入配置 */
export interface OfficialModuleOptions {
    /** Redis配置 */
    redis: RedisOptions;
    /** 客户端单独配置 */
    config?: OfficialOptions[];
    /**
     * 是否初始化Access Token，默认不初始化，用于开发环境
     * @default false
     */
    initAccessToken?: boolean;
}
export interface OfficialOptionsFactory {
    createOfficialOptions(): OfficialModuleOptions | Promise<OfficialModuleOptions>;
}
/** 异步传入配置 */
export interface OfficialModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useExisting?: Type<OfficialOptionsFactory>;
    useClass?: Type<OfficialOptionsFactory>;
    useFactory?: (...args: any[]) => OfficialModuleOptions | Promise<OfficialModuleOptions>;
    inject?: any[];
}

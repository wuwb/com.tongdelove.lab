import { Global, Module } from "@nestjs/common";
import { HttpModule } from "@nestjs/axios";
import { ModuleRef } from "@nestjs/core";
import { X509Certificate } from "node:crypto";
import { OPTIONS_PROVIDER } from "./constants/common.constant";
import { WechatPayMpService } from "./services/mp.service";
import { DateUtil } from "@/utils/date.util";
import { SignUtil } from "@/utils/sign.util";
import { WechatPayAuthService } from "./services/auth.service";
import { AuthUtil } from "@/utils/auth.util";
import { WechatPayJSAPIService } from "./services/jsapi.service";
import { DecryptStrategy } from "./strategies/decrypt.strategy";
import { WechatPayDecryptService } from "./services/decrypt.service";

@Global()
@Module({})
export class PayCoreModule {
    constructor(private readonly moduleRef: ModuleRef) { }

    /**
     * 同步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRoot(options: any) {
        return {
            module: PayCoreModule,
            imports: [HttpModule],
            providers: [
                WechatPayAuthService,
                WechatPayMpService,
                WechatPayJSAPIService,
                WechatPayDecryptService,
                DecryptStrategy,
                AuthUtil,
                DateUtil,
                SignUtil,
                { provide: OPTIONS_PROVIDER, useValue: options }
            ],
            exports: [
                WechatPayAuthService,
                WechatPayMpService,
                WechatPayJSAPIService,
                WechatPayDecryptService
            ]
        };
    }

    /**
     * 异步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRootAsync(options: any) {
        const asyncProviders = this.createAsyncProviders(options);
        return {
            module: PayCoreModule,
            imports: [...(options.imports || []), HttpModule],
            providers: [
                ...asyncProviders,
                WechatPayAuthService,
                WechatPayMpService,
                WechatPayJSAPIService,
                WechatPayDecryptService,
                DecryptStrategy,
                AuthUtil,
                DateUtil,
                SignUtil
            ],
            exports: [
                WechatPayAuthService,
                WechatPayMpService,
                WechatPayJSAPIService,
                WechatPayDecryptService
            ]
        };
    }

    /**
     * 创建异步Provider列表
     * @param options 异步配置
     * @returns Provider列表
     */
    private static createAsyncProviders(options: any) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass
            }
        ];
    }

    /**
     * 创建异步Provider
     * @param options 异步配置
     * @returns Provider
     */
    private static createAsyncOptionsProvider(options: any) {
        if (options.useFactory) {
            return {
                provide: OPTIONS_PROVIDER,
                useFactory: options.useFactory,
                inject: options.inject || []
            };
        }
        const inject = [options.useClass || options.useExisting];
        return {
            provide: OPTIONS_PROVIDER,
            useFactory: async (optionsFactory: any) =>
                await optionsFactory.createWechatPayOptions(),
            inject
        };
    }

    onModuleInit() {
        const options = this.moduleRef.get(OPTIONS_PROVIDER);
        // * 如果没有传入证书序列号，从证书公钥中提取序列号。
        if (!options.serialNo && options.publicKey) {
            options.serialNo = new X509Certificate(options.publicKey).serialNumber.toUpperCase();
        }
    }
}

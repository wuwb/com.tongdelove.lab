import { HttpModule } from '@nestjs/axios';
import { Global, Module, ModuleRef, OnModuleDestroy } from '@nestjs/common';
import { OPTIONS_PROVIDER, ACCESS_TOKEN_CONFIG_PROVIDER, REDIS_CLIENT_PROVIDER } from './constants/common.constant';
import { createRedisClientProvider } from './providers/redis-client.provider';
import { MpCheckSecurityService } from './services/check-security.service';
import { MpService } from './services/mp.service';
import { IricUtil } from './utils/iric.util';
import { MpUtil } from './utils/mp.util';

@Global()
@Module({})
export class MpCoreModule implements OnModuleDestroy {
    constructor(private readonly moduleRef: ModuleRef) { }

    /**
     * 同步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRoot(options: any) {
        return {
            module: MpCoreModule,
            imports: [HttpModule],
            providers: [
                createRedisClientProvider(),
                { provide: OPTIONS_PROVIDER, useValue: options },
                { provide: ACCESS_TOKEN_CONFIG_PROVIDER, useValue: { AccessToken: '', ExpiresAt: null } },
                MpService,
                MpCheckSecurityService,
                MpUtil,
                IricUtil
            ],
            exports: [MpService, MpCheckSecurityService]
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
            module: MpCoreModule,
            imports: [...(options.imports || []), HttpModule],
            providers: [
                ...asyncProviders,
                createRedisClientProvider(),
                { provide: ACCESS_TOKEN_CONFIG_PROVIDER, useValue: { AccessToken: '', ExpiresAt: null } },
                MpService,
                MpCheckSecurityService,
                MpUtil,
                IricUtil
            ],
            exports: [MpService, MpCheckSecurityService]
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
            useFactory: async (optionsFactory: any) => await optionsFactory.createMpOptions(),
            inject
        };
    }

    onModuleDestroy() {
        const redisClient = this.moduleRef.get(REDIS_CLIENT_PROVIDER);
        if (redisClient) redisClient.disconnect();
    }
}

import { DynamicModule, Module, Provider } from '@nestjs/common';
import { WECHAT_PAY_MANAGER, WECHAT_PAY_MODULE_OPTIONS } from './constants';
import { WechatPayModuleAsyncOptions, WechatPayOptionsFactory } from './interface';
import { createWechatPayManager } from './providers';

@Module({})
export class WechatPayModule {

    static resigterAsync(options: WechatPayModuleAsyncOptions): DynamicModule {
        return {
            module: WechatPayModule,
            imports: options.imports,
            providers: [
                ...this.createAsyncProviders(options),
                ...(options.extraProviders || [])
            ],
            exports: [options?.name || WECHAT_PAY_MANAGER],
        }
    }

    private static createAsyncProviders(options: WechatPayModuleAsyncOptions) {
        if (options.useExisting || options.useFactory) {
            return [
                this.createAsyncOptionsProvider(options),
                createWechatPayManager(options.name)
            ];
        }
        if (options.useClass) {
            return [
                this.createAsyncOptionsProvider(options),
                {
                    provide: options.useClass,
                    useClass: options.useClass,
                },
                createWechatPayManager(options.name),
            ];
        }
        return [];
    }

    private static createAsyncOptionsProvider(options: WechatPayModuleAsyncOptions): Provider {
        if (options.useFactory) {
            return {
                provide: WECHAT_PAY_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        return {
            provide: WECHAT_PAY_MODULE_OPTIONS,
            useFactory: async (optionsFactory: WechatPayOptionsFactory) => optionsFactory.createWechatPayOptions(),
            inject: [options?.useExisting || options?.useClass || ''],
        };
    }
}

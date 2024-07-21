import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { OPTIONS_PROVIDER } from './constants/common.constant'
import { createAliOSSClientProvider } from './providers/ali-oss-client.provider'
import { createAliSTSClientProvider } from './providers/ali-sts-client.provider'
import { AliOSSService } from './services/ali-oss.service'
import { AliOSSAuthService } from './services/auth.service'
import { AliOSSBucketService } from './services/bucket.service'

@Global()
@Module({})
export class AliOSSCoreModule {
  /**
   * 同步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRoot(options): DynamicModule {
    return {
      module: AliOSSCoreModule,
      providers: [
        { provide: OPTIONS_PROVIDER, useValue: options },
        createAliOSSClientProvider(),
        createAliSTSClientProvider(),
        AliOSSService,
        AliOSSBucketService,
        AliOSSAuthService,
      ],
      exports: [AliOSSService, AliOSSBucketService, AliOSSAuthService],
    }
  }

  /**
   * 异步方式配置
   * @param options 配置信息
   * @returns 动态模块
   */
  static forRootAsync(options): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options)
    return {
      module: AliOSSCoreModule,
      imports: [...(options.imports || [])],
      providers: [
        ...asyncProviders,
        createAliOSSClientProvider(),
        createAliSTSClientProvider(),
        AliOSSService,
        AliOSSBucketService,
        AliOSSAuthService,
      ],
      exports: [AliOSSService, AliOSSBucketService, AliOSSAuthService],
    }
  }

  /**
   * 创建异步Provider列表
   * @param options 异步配置
   * @returns Provider列表
   */
  private static createAsyncProviders(options): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }
    const useClass = options.useClass!
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: useClass,
        useClass,
      },
    ]
  }

  /**
   * 创建异步Provider
   * @param options 异步配置
   * @returns Provider
   */
  private static createAsyncOptionsProvider(options): Provider {
    if (options.useFactory) {
      return {
        provide: OPTIONS_PROVIDER,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }
    const inject = [options.useClass || options.useExisting]
    return {
      provide: OPTIONS_PROVIDER,
      useFactory: async (optionsFactory) =>
        await optionsFactory.createMpOptions(),
      inject,
    }
  }
}

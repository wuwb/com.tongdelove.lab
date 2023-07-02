import { DynamicModule, Module } from '@nestjs/common';
import { AliOSSCoreModule } from './ali-oss-core.module';

@Module({})
export class AliOSSModule {
    /**
     * 同步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRoot(options): DynamicModule {
        return {
            module: AliOSSModule,
            imports: [AliOSSCoreModule.forRoot(options)],
        };
    }

    /**
     * 异步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRootAsync(options): DynamicModule {
        return {
            module: AliOSSModule,
            imports: [AliOSSCoreModule.forRootAsync(options)],
        };
    }
}

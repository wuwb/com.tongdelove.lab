import { Module, Inject, Injectable } from '@nestjs/common';
import { PayCoreModule } from "./PayCoreModule";

@Module({

})
export class PayModule {
    /**
     * 同步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRoot(options: any) {
        return {
            module: PayModule,
            imports: [PayCoreModule.forRoot(options)]
        };
    }
    /**
     * 异步方式配置
     * @param options 配置信息
     * @returns 动态模块
     */
    static forRootAsync(options: any) {
        return {
            module: PayModule,
            imports: [PayCoreModule.forRootAsync(options)]
        };
    }
}

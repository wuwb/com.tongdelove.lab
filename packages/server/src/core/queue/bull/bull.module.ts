import { Global, Module } from "@nestjs/common";
import { BullModule as BaseBullModule, BullModuleOptions } from '@nestjs/bull';
import { BullService } from "./bull.service";
import { ConfigService } from "@/config/config.service";
import { ConfigModule } from "@/config/config.module";
import { BullConfigService } from "./bull-config.service";

@Global()
@Module({
    imports: [
        // https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queue
        /* 启用队列 */
        BaseBullModule.forRootAsync('master', {
            useClass: BullConfigService,
        }),
    ],
    providers: [BullService],
    exports: [BullService],
})
export class BullModule { }

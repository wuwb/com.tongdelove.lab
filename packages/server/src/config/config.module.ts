import { Module, OnApplicationBootstrap, OnApplicationShutdown } from "@nestjs/common";
import { ConfigService } from "./config.service";

// 应用初始化的时候对配置模块进行初始化
@Module({
    exports: [
        ConfigService,
    ],
    providers: [
        ConfigService,
    ]
})
export class ConfigModule implements OnApplicationBootstrap, OnApplicationShutdown {
    async onApplicationBootstrap() {
    }

    async onApplicationShutdown(signal?: string) {
    }
}

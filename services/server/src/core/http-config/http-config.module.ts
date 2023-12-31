import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpConfigService } from "@/core/http-config/http-config.service";

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [HttpConfigService]

})
export class HttpConfigModule {

}

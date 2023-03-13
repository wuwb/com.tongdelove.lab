import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HttpConfigService } from "@/processors/http-config/http-config.service";

@Module({
  imports: [
    ConfigModule,
  ],
  providers: [HttpConfigService]

})
export class HttpConfigModule {

}

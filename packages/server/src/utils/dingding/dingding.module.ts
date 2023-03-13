import { HttpConfigService } from "@/processors/http-config/http-config.service";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { DingdingService } from "./dingding.service";

@Module({
  imports: [
    HttpModule,
  ],
  providers: [DingdingService],
  exports: [
    DingdingService,
  ],
})
export class DingdingModule {

}

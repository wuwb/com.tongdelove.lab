import { FreelancerModule } from '@/modules/tech/freelancer/freelancer.module'
import { HttpModule } from '@nestjs/axios'
import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { SpiderController } from './spider.controller'
import { A5Service } from './tasks/catcher/a5.service'
import { CodemartService } from './tasks/catcher/codemart.service'
import { MayigeekService } from './tasks/catcher/mayigeek.service'
import { OschinaService } from './tasks/catcher/oschina.service'
import { YuanjisongService } from './tasks/catcher/yuanjisong.service'
import { RrkfService } from './tasks/catcher/rrkf.service'
import { ShixianService } from './tasks/catcher/shixian.service'
import { UrlsProcessor } from './tasks/processors/urls.processor'
import { RemindProcessor } from './tasks/processors/remind.processor'
import { LoggerModule } from '@/core/logger/winston/logger.module'

@Module({
  imports: [
    LoggerModule,
    HttpModule,
    FreelancerModule,
    BullModule.registerQueue({
      configKey: 'master',
      name: 'urls',
    }),
    BullModule.registerQueue({
      configKey: 'master',
      name: 'remind',
    }),
  ],
  controllers: [SpiderController],
  providers: [
    UrlsProcessor,
    RemindProcessor,
    CodemartService,
    OschinaService,
    YuanjisongService,
    A5Service,
    MayigeekService,
    RrkfService,
    ShixianService,
  ],
  exports: [
    CodemartService,
    OschinaService,
    YuanjisongService,
    A5Service,
    MayigeekService,
    RrkfService,
    ShixianService,
  ],
})
export class SpiderModule {}

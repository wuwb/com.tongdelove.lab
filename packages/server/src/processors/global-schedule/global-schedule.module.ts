import { FreelancerModule } from '@/modules/freelancer/freelancer.module';
import { LoggerModule } from '@/processors/logger/logger.module';
import { SpiderModule } from '@/modules/spider/spider.module';
import { Module } from '@nestjs/common';
import { GlobalScheduleService } from './global-schedule.service';

@Module({
  imports: [
    LoggerModule,
    SpiderModule,
    FreelancerModule,
  ],
  providers: [
    GlobalScheduleService,
  ],
  exports: [
    GlobalScheduleService,
  ]
})
export class GlobalScheduleModule { }

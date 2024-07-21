import { FreelancerModule } from '@/modules/tech/freelancer/freelancer.module'
import { ScheduleModule as NestScheduleModule } from '@nestjs/schedule'
import { SpiderModule } from '@/modules/tech/spider/spider.module'
import { Module } from '@nestjs/common'
import { GlobalScheduleService } from './global-schedule.service'
import { LoggerModule } from '@/core/logger/winston/logger.module'

@Module({
  imports: [
    LoggerModule,
    NestScheduleModule.forRoot(),
    SpiderModule,
    FreelancerModule,
  ],
  providers: [GlobalScheduleService],
  exports: [GlobalScheduleService],
})
export class GlobalScheduleModule {}

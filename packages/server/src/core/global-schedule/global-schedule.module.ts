import { FreelancerModule } from '@/modules/tech/freelancer/freelancer.module';
import { LoggerModule } from '@/core/logger/logger/logger.module';
import { ScheduleModule as BaseScheduleModule } from '@nestjs/schedule';
import { SpiderModule } from '@/modules/tech/spider/spider.module';
import { Module } from '@nestjs/common';
import { GlobalScheduleService } from './global-schedule.service';

@Module({
    imports: [
        LoggerModule,
        BaseScheduleModule.forRoot(),
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

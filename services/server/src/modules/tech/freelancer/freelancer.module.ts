import { HttpExceptionFilter } from '@/common/filters/http-exception.filter'
import { DingdingModule } from '@/core/sms/dingding/dingding.module'
import { WebhookModule } from '@/core/sms/webhook/webhook.module'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { APP_FILTER } from '@nestjs/core'
import { FreelancerCrudController } from './crud/freelancer-crud.controller'
import { FreelancerCrudService } from './crud/freelancer-crud.service'
import { FreelancerController } from './freelancer.controller'
import { FreelancerService } from './freelancer.service'

@Module({
  imports: [HttpModule, DingdingModule, WebhookModule],
  controllers: [FreelancerCrudController, FreelancerController],
  providers: [
    FreelancerCrudService,
    FreelancerService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
  exports: [FreelancerService],
})
export class FreelancerModule {}

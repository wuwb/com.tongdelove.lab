import { Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { TemuRequestController } from './temu-request.controller'
import { TemuRequestService } from './temu-request.service'
import { CleaningService } from './cleaning.service'
import { TemuCleaningProcessor } from './processors/temu-cleaning.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'temu-cleaning',
      redis: process.env.REDIS_URL || 'redis://localhost:6379',
    }),
  ],
  controllers: [TemuRequestController],
  providers: [TemuRequestService, CleaningService, TemuCleaningProcessor],
  exports: [TemuRequestService, CleaningService],
})
export class TemuRequestModule {}

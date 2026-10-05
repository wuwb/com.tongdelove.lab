import { Module } from '@nestjs/common'
import { LabAppleGuideController } from './apple-guide.controller'
import { LabAppleGuideService } from './apple-guide.service'

@Module({
  controllers: [LabAppleGuideController],
  providers: [LabAppleGuideService],
  exports: [LabAppleGuideService],
})
export class LabAppleGuideModule {}

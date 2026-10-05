import { Module } from '@nestjs/common'
import { LabLinkController } from './link.controller'
import { LabLinkService } from './link.service'

@Module({
  controllers: [LabLinkController],
  providers: [LabLinkService],
  exports: [LabLinkService],
})
export class LabLinkModule {}

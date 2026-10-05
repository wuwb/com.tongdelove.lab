import { Module } from '@nestjs/common'
import { LabAuthAdapterController } from './auth-adapter.controller'
import { LabAuthAdapterService } from './auth-adapter.service'

@Module({
  controllers: [LabAuthAdapterController],
  providers: [LabAuthAdapterService],
  exports: [LabAuthAdapterService],
})
export class LabAuthAdapterModule {}

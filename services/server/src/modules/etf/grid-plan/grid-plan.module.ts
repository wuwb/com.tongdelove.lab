import { Module } from '@nestjs/common'
import { GridPlanController } from './grid-plan.controller'
import { GridPlanService } from './grid-plan.service'

@Module({
  controllers: [GridPlanController],
  providers: [GridPlanService],
  exports: [GridPlanService],
})
export class EtfGridPlanModule {}

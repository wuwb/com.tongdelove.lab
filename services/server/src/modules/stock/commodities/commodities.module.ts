import { Module } from '@nestjs/common'
import { CommoditiesService } from './commodities.service'

@Module({
  imports: [],
  providers: [CommoditiesService],
  exports: [CommoditiesService],
})
export class CommoditiesModule {}

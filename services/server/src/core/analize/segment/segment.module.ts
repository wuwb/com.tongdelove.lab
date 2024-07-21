import { Module } from '@nestjs/common'
import { SegmentAnalyticsModule as BaseSegmentAnalyticsModule } from '@/shared/services/segmentAnalytics/segmentAnalytics.module'
import { SegmentAnalyticsOptionsService } from '@/shared/services/segmentAnalytics/segmentAnalyticsOptionsService'

@Module({
  imports: [
    // segment 分析，开始时候不用开启
    BaseSegmentAnalyticsModule.registerAsync({
      useClass: SegmentAnalyticsOptionsService,
    }),
  ],
})
export class SegmentAnalyticsModule {}

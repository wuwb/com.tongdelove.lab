import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { TerminusModule } from '@nestjs/terminus'
import { HealthService } from './health.service'
import { DrizzleHealthIndicator } from './prisma.health'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, DrizzleHealthIndicator],
  exports: [HealthService],
})
export class HealthModule {}

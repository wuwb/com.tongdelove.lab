import { Module } from '@nestjs/common'
import { HealthController } from './health.controller'
import { TerminusModule } from '@nestjs/terminus'
import { HealthService } from './health.service'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService],
  exports: [HealthService],
})
export class HealthModule {}

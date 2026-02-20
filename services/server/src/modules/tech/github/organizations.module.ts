import { Module } from '@nestjs/common'
import { OrganizationsService } from './organizations.service'
import { LoggerModule } from '@/core/logger/winston/logger.module'

@Module({
  imports: [LoggerModule],
  providers: [OrganizationsService],
  exports: [OrganizationsService],
})
export class OrganizationsModule {}

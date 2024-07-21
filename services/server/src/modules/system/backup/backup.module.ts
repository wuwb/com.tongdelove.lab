import { Module } from '@nestjs/common'
import { BackupService } from './backup.service'
import { BackupController } from './backup.controller'
import { ConfigService } from '@/config/config.service'

@Module({
  controllers: [BackupController],
  providers: [BackupService, ConfigService],
  exports: [BackupService],
})
export class BackupModule {}

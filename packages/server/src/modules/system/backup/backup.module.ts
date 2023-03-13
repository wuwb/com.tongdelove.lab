import { Module } from '@nestjs/common';
import { BackupService } from './backup.service';
import { BackupController } from './backup.controller';
import { CacheService } from '@/processors/cache/cache.service';
import { ConfigService } from '@/config/config.service';

@Module({
  controllers: [BackupController],
  providers: [
    BackupService,
    CacheService,
    ConfigService,
  ]
})
export class BackupModule { }

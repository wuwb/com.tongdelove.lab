import { Controller, Delete, Get, Param } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BackupService } from "./backup.service";

@Controller('backup')
export class BackupController {
  constructor(
    private readonly backupService: BackupService,
    private readonly configService: ConfigService,
  ) { }

  @Get()
  async backups() {
    return this.backupService.backups()
  }

  @Delete('/:filename')
  async delete(@Param('filename') filename: string) {
    if (!filename) {
      return;
    }
    return this.backupService.deleteBackup(filename);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BackupService } from './backup.service';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';
import { ConfigService } from "@nestjs/config";
import { ApiTags } from '@nestjs/swagger';

@ApiTags('system/backup')
@Controller('backup')
export class BackupController {
    constructor(
        private readonly backupService: BackupService,
        private readonly configService: ConfigService,

    ) { }

    @Get()
    async backups() {
        return this.backupService.backup()
    }


    async delete(@Param('filename') filename: string) {
        if (!filename) {
            return;
        }
        return this.backupService.deleteBackup(filename);
    }

    @Post()
    create(@Body() createBackupDto: CreateBackupDto) {
        return this.backupService.create(createBackupDto);
    }

    @Get()
    findAll() {
        return this.backupService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.backupService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBackupDto: UpdateBackupDto) {
        return this.backupService.update(+id, updateBackupDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
    	if (!id) {
	    return ;
	}
        return this.backupService.remove(+id);
    }
}

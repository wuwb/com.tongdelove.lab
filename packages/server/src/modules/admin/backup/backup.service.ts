import { BadRequestException, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { existsSync } from "fs";
import { readFile, readdir, rm, writeFile } from 'fs/promises'
import { join } from "path";
import { Readable } from "stream";


const BACKUP_DIR = '/backup';


@Injectable()
export class BackupService {
  constructor(
    private readonly configService: ConfigService,
  ) {

  }

  async backup() { }

  async backups() { }

  async getBackupFileStream(dirname: string) {
    const path = this.checkBackupExist(dirname)
    const stream = new Readable()

    stream.push(await readFile(path))
    stream.push(null)

    return stream
  }

  private checkBackupExist(dirname: string) {
    const path = join(BACKUP_DIR, dirname, `backup-${dirname}.zip`)
    if (!existsSync(path)) {
      throw new BadRequestException('文件不存在')
    }
    return path
  }

  async saveTempBackupByUpload(buffer: Buffer) {

  }

  async rstore(restoreFilePath: string) {

  }

  async rollbackTo(dirname: string) {

  }

  async deleteBackup(filename: string) {
    const path = join(BACKUP_DIR, filename);
    if (!existsSync(path)) {
      throw new BadRequestException('文件不存在')
    }
    try {
      await rm(path, { recursive: true })
      return true
    } catch (error) {
      throw new BadRequestException('删除失败')
    }
  }

}

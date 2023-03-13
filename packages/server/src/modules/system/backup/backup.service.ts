import { ConfigService } from '@/config/config.service';
import { CacheService } from '@/processors/cache/cache.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync, statSync } from 'fs';
import { readFile, readdir, rm, writeFile } from 'fs/promises';
import { join, resolve } from 'path';
import { CreateBackupDto } from './dto/create-backup.dto';
import { UpdateBackupDto } from './dto/update-backup.dto';

const BACKUP_DIR = '/'; // todo 放到 common/constants

@Injectable()
export class BackupService {
  constructor(
    private readonly configService: ConfigService,
    private readonly cacheService: CacheService,
  ) {

  }

  async backup() {
    // 读取配置，查看是否开启备份功能，未开启的话，停止备份

    // 获取备份路径，不存在的话进行创建，
    try {
      /**
       * 打包数据库
       *    执行 mysql 备份命令
       *    对备份文件进行压缩打包
       * 打包数据
       *    rsync 命令备份
       */
    } catch (err) {
      console.error('备份失败');
      throw err;
    }
    return {
      buffer: await readFile('/'),
      path: '/',
    }
  }

  async getFileStream() { }

  checkBackupExist() { }

  async restore() { }

  async rollbackTo(dirname: string) {

  }

  async deleteBackup(filename: string) {
    const path = join(BACKUP_DIR, filename);
    if (!existsSync(path)) {
      throw new BadRequestException('文件不存在')
    }
  }

  create(createBackupDto: CreateBackupDto) {
    return 'This action adds a new backup';
  }

  findAll() {
    return `This action returns all backup`;
  }

  // 查询备份列表
  findMany() {

  }

  findOne(id: number) {
    return `This action returns a #${id} backup`;
  }

  update(id: number, updateBackupDto: UpdateBackupDto) {
    return `This action updates a #${id} backup`;
  }

  remove(id: number) {
    return `This action removes a #${id} backup`;
  }
}

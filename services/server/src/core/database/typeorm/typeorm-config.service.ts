import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { isDevMode } from '@/app.environment'

@Injectable()
export class TypeormConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const {
      host,
      port,
      username,
      password,
      database,
      entityPrefix,
      connectionLimit,
      keepConnectionAlive,
      retryDelay,
    } = {
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      username: this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      entityPrefix: process.env.DATABASE_TABLE_PREFIX || 'dw_',
      connectionLimit: parseInt(process.env.MYSQL_CONNECTION_LIMIT!) || 20,
      keepConnectionAlive:
        !!process.env.MYSQL_KEEP_CONNECTION_ALIVE ||
        this.configService.get<boolean>('MYSQL_KEEP_CONNECTION_ALIVE'),
      retryDelay: parseInt(process.env.MYSQL_RETRY_DELAY!) || 300,
    }
    return {
      // typeorm bug, https://github.com/nestjs/nest/issues/1119
      // 将 type 定义为 type: 'mysql' | 'mariadb'; 解决此issue
      type: this.configService.get<any>('database.type'),
      host,
      port,
      username,
      password,
      database,
      entityPrefix,
      // don't change the below settings
      // entities: ['dist/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      // use utf8mb4 to fix emoji storage issue
      charset: 'utf8mb4',
      // print SQL logs in dev mode only
      logging: isDevMode,
      connectTimeout: 60000,
      supportBigNumbers: true,
      bigNumberStrings: true,
      // don't change synchronize setting
      synchronize: this.configService.get<boolean>('database.synchronize'),
      // connection pool settings
      keepConnectionAlive,
      retryDelay,
      verboseRetryLog: true,
      extra: {
        connectionLimit,
      },
    }
  }
}

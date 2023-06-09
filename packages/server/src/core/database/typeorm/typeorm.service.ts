import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {

  constructor(
    private readonly configService: ConfigService,
  ) { }

  // {
  //   host: this.configService.get('database.host'),  // '127.0.0.1',
  //   port: this.configService.get('database.port'), //3306,
  //   username: this.configService.get('database.username'), // 'root',
  //   password: this.configService.get('database.password'), // '202402.',
  //   database: this.configService.get('database.database'),// 'test',
  //   entities,
  //   logging: this.configService.get('database.logging'),
  //   synchronize: this.configService.get('database.synchronize'), // 开发环境
  //   timezone: '+08:00', // 东八区
  //   autoLoadEntities: true,
  //   cache: {
  //     duration: 60000, // 1分钟的缓存
  //   },
  //   extra: {
  //     // poolMax: 32,
  //     // poolMin: 16,
  //     // queueTimeout: 60000,
  //     // pollPingInterval: 60, // 每隔60秒连接
  //     // pollTimeout: 60, // 连接有效60秒
  //     // socketPath: "/user/eqielb/Library/Application Support/Local/run/Km-fFAuP2/mysql/mysqld.sock"
  //   },
  // }
  createTypeOrmOptions(): TypeOrmModuleOptions {
    let options: TypeOrmModuleOptions = {
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: '202402.',
      database: 'typeorm',
      synchronize: true,
      logging: true,
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      migrations: [
        'src/migration/**/*.ts',
      ],
      subscribers: [
        'src/subscriber/**/*.ts',
      ],
    };

    // if (this.configService.DB_TYPE === 'mysql') {
    options = {
      ...options,
      ...{
        type: 'mysql',
        charset: 'utf8mb4',
        collation: 'utf8mb4_unicode_ci',
        // https://stackoverflow.com/questions/35553432/error-handshake-inactivity-timeout-in-node-js-mysql-module
        keepConnectionAlive: true,

        // Ignoring invalid configuration option passed to Connection: acquireTimeout. 
        // This is currently a warning, but in future versions of MySQL2, 
        // an error will be thrown if you pass an invalid configuration option to a Connection
        // acquireTimeout: 20 * 1000, // 20s
      },
    };
    //   }

    return options;
  }
}

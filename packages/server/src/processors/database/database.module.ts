import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { Post } from './models/post.model';
import { User } from './models/user.model';
import { DatabaseService } from './database.service';

const entities = [User, Post];
const models = TypeOrmModule.forFeature(entities);

// TODO 从配置文件读取配置信息
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
      ],
      inject: [
        ConfigService,
      ],
      useClass: DatabaseService,
    }),
    models,
  ],
  providers: [],
  exports: [models],
})
export class DatabaseModule {
  constructor(private readonly connection: Connection) { }
}

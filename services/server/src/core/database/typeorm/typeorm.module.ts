import { Injectable, Module } from '@nestjs/common'
import { TypeormService } from './typeorm.service'
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@/config/config.service'
import { ConfigModule } from '@/config/config.module'

@Module({
  imports: [
    BaseTypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: TypeormService,
    }),
  ],
  providers: [TypeormService],
  exports: [TypeormService],
})
export class TypeormModule { }

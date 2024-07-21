import { Injectable, Module } from '@nestjs/common'
import { TypeormService } from './typeorm.service'
import { TypeOrmModule as BaseTypeOrmModule } from '@nestjs/typeorm'
import { ConfigService } from '@/config/config.service'
import { TypeormConfigService } from './typeorm-config.service'

@Module({
  imports: [
    BaseTypeOrmModule.forRootAsync({
      useClass: TypeormConfigService,
      inject: [ConfigService],
    }),
  ],
  providers: [TypeormService],
  exports: [TypeormService],
})
export class TypeormModule {}

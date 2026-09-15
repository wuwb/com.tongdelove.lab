import { Global, Module } from '@nestjs/common'
import { MyLoggerService } from './logger.service'
import { WinstonModule } from 'nest-winston'
import { LoggerConfigService } from './wiston-config.service'

@Module({
  imports: [
    WinstonModule.forRootAsync({
      imports: [],
      useClass: LoggerConfigService,
    }),
  ],
  providers: [MyLoggerService],
  exports: [MyLoggerService],
})
export class LoggerModule {}

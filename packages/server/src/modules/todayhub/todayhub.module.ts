import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware';
import { TodayhubContriller } from './todayhub.contriller';
import { TodayhubService } from './todayhub.service';

@Module({
  controllers: [TodayhubContriller],
  providers: [TodayhubService]
})
export class TodayhubModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('todayhub');
  }
}

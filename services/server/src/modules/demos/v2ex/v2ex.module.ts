import { AuthModule } from '@/modules/system/auth/auth.module'
import { MiddlewareConsumer, Module } from '@nestjs/common'
import { LoggerMiddleware } from '@/common/middlewares/logger.middleware'
import { V2exController } from './v2ex.controller'
import { V2exService } from './v2ex.service'

@Module({
  imports: [AuthModule],
  controllers: [V2exController],
  providers: [V2exService],
})
export class V2exModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('v2ex')
  }
}

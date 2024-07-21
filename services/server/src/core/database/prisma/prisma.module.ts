import { Global, Module, Logger } from '@nestjs/common'
import { PrismaService } from './prisma.service'
import { PrismaModule as BasePrismaModule, loggingMiddleware } from 'prisma'

@Module({
  imports: [
    // BasePrismaModule.forRoot({
    //     isGlobal: true,
    //     prismaServiceOptions: {
    //         middlewares: [
    //             // configure your prisma middleware
    //             loggingMiddleware({
    //                 logger: new Logger('PrismaMiddleware'),
    //                 logLevel: 'log',
    //             }),
    //         ],
    //     },
    // }),
  ],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}

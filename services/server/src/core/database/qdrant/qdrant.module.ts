import { Global, Module, Logger } from '@nestjs/common'
import { QdrantService } from './qdrant.service'
// import { PrismaModule as BasePrismaModule, loggingMiddleware } from 'prisma'

@Module({
  controllers: [],
  providers: [QdrantService],
  exports: [QdrantService],
})
export class PrismaModule {}

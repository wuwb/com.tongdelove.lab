import { Module } from '@nestjs/common'
import { LabPostController } from './post.controller'
import { LabPostService } from './post.service'

@Module({
  controllers: [LabPostController],
  providers: [LabPostService],
  exports: [LabPostService],
})
export class LabPostModule {}

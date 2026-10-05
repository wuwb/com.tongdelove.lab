import { Module } from '@nestjs/common'
import { LabPoemController } from './poem.controller'
import { LabPoemService } from './poem.service'

@Module({
  controllers: [LabPoemController],
  providers: [LabPoemService],
  exports: [LabPoemService],
})
export class LabPoemModule {}

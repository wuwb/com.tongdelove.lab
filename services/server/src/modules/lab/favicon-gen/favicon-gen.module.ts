import { Module } from '@nestjs/common'
import { LabFaviconGenController } from './favicon-gen.controller'
import { LabFaviconGenService } from './favicon-gen.service'

@Module({
  controllers: [LabFaviconGenController],
  providers: [LabFaviconGenService],
  exports: [LabFaviconGenService],
})
export class LabFaviconGenModule {}

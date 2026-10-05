import { Module } from '@nestjs/common'
import { LabStickerController } from './sticker.controller'
import { LabStickerService } from './sticker.service'

@Module({
  controllers: [LabStickerController],
  providers: [LabStickerService],
  exports: [LabStickerService],
})
export class LabStickerModule {}

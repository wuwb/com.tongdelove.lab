import { Module } from '@nestjs/common'
import { AutohotboxController } from './autohotbox.controller'
import { AutohotboxService } from './autohotbox.service'

@Module({
  imports: [],
  controllers: [AutohotboxController],
  providers: [AutohotboxService],
})
export class AutohotboxModule {}

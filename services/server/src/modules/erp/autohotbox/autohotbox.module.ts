import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AutohotboxController } from './autohotbox.controller'
import { AutohotboxService } from './autohotbox.service'
// import { Autohotbox } from './entities/autohotbox.entity';

@Module({
  imports: [
    // TypeOrmModule.forFeature([
    // Autohotbox,
    // ]),
  ],
  controllers: [AutohotboxController],
  providers: [AutohotboxService],
})
export class AutohotboxModule {}

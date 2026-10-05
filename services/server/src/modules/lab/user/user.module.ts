import { Module } from '@nestjs/common'
import { LabUserController } from './user.controller'
import { LabUserService } from './user.service'

@Module({
  controllers: [LabUserController],
  providers: [LabUserService],
  exports: [LabUserService],
})
export class LabUserModule {}

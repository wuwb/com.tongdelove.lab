import { Module } from '@nestjs/common';
import { AliossController } from './alioss.controller';
import { AliossService } from './alioss.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
  ],
  controllers: [AliossController],
  providers: [AliossService],
})
export class AliossModule {}

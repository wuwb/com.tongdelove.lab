import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TaobaoController } from './taobao.controller';
import { TaobaoService } from './taobao.service';
import { CustomerService } from '@/modules/erp/customer/customer.service';
import { PrismaModule } from '@/processors/prisma/prisma.module';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
  ],
  controllers: [
    TaobaoController,
  ],
  providers: [
    TaobaoService,
    CustomerService,
  ],
  exports: [
  ],
})
export class TaobaoModule { }

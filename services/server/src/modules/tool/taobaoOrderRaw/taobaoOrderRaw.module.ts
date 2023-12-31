import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TaobaoOrderRawController } from './taobaoOrderRaw.controller';
import { TaobaoOrderRawService } from './taobaoOrderRaw.service';
import { CustomerService } from '@/modules/mall/customer/customer.service';

@Module({
    imports: [
        MulterModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                dest: configService.get('MULTER_DEST'),
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [TaobaoOrderRawController],
    providers: [TaobaoOrderRawService, CustomerService],
    exports: [],
})
export class TaobaoOrderRawModule {}

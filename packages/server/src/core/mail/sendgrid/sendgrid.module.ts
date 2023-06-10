import { Module } from '@nestjs/common';
import { sendgridProviders } from './sendgrid.providers';
import { SendgridService } from './sendgrid.service';
import { ConfigModule } from '@nestjs/config';
import sendgridConfig from '@/config/sendgrid.config';
import { ConfigService } from '@/config/config.service';
import { SendgridConfigService } from '@/shared/services/sendgridConfig.service';
import { SendGridModule as BaseSendGridModule } from '@ntegral/nestjs-sendgrid';

@Module({
    imports: [
        BaseSendGridModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useClass: SendgridConfigService,
        }),

        ConfigModule.forFeature(sendgridConfig)
    ],
    providers: [...sendgridProviders, SendgridService],
    exports: [...sendgridProviders, SendgridService]
})
export class SendgridModule { }

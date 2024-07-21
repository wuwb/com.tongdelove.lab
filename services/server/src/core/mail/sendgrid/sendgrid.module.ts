import { Module } from '@nestjs/common'
import { sendgridProviders } from './sendgrid.providers'
import { SendgridService } from './sendgrid.service'
import { ConfigModule } from '@nestjs/config'
import sendgridConfig from '@/config/config/sendgrid.config'
import { SendgridConfigService } from './sendgrid-config.service'
import { SendGridModule as BaseSendGridModule } from '@ntegral/nestjs-sendgrid'

@Module({
  imports: [
    BaseSendGridModule.forRootAsync({
      useClass: SendgridConfigService,
    }),
    ConfigModule.forFeature(sendgridConfig),
  ],
  providers: [...sendgridProviders, SendgridService],
  exports: [...sendgridProviders, SendgridService],
})
export class SendgridModule {}

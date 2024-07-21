import { Module, forwardRef } from '@nestjs/common'
import { TaobaoOrderRawModule } from '@/modules/tool/taobaoOrderRaw/taobaoOrderRaw.module'

@Module({
  imports: [TaobaoOrderRawModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class ToolModule {}

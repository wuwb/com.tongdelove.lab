import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'

@Injectable()
export class PrinterService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {}

  async onModuleDestroy() {}
}

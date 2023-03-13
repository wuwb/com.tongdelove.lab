import { forwardRef, Module } from '@nestjs/common';
import { StockController } from './stock.controller';

@Module({
  imports: [
  ],
  controllers: [
    StockController,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class StockModule { }

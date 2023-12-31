import { forwardRef, Module } from '@nestjs/common';
import { SymbolController } from './symbol/symbol.controller';

@Module({
    imports: [],
    controllers: [SymbolController],
    providers: [],
    exports: [],
})
export class StockModule {}

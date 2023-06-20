import { forwardRef, Module } from '@nestjs/common';
import { LogService } from './log.service';

@Module({
    imports: [
    ],
    controllers: [
    ],
    providers: [
        LogService,
    ],
    exports: [
        LogService,
    ],
})
export class LogModule { }

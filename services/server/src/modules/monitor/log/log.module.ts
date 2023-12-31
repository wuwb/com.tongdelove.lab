import { forwardRef, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LoginLogService } from './LoginLog.service';

@Module({
    imports: [
    ],
    controllers: [
    ],
    providers: [
        LogService,
        LoginLogService,
    ],
    exports: [
        LogService,
        LoginLogService,
    ],
})
export class LogModule { }

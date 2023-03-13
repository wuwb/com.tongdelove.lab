import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HealthModule } from './health/health.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { TransformInterceptor } from './interceptors/transform.interceptor';

@Module({
    imports: [
        HealthModule,
    ],
    exports: [
        HealthModule,
    ],
    providers: [
        { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
        { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    ],
})
export class CoreModule { }

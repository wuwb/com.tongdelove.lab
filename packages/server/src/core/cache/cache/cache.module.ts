import { CacheService } from './cache.service';
import { CacheController } from './cache.controller';
import { Global, Module, DynamicModule } from '@nestjs/common';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@/config/config.service';
import { ConfigModule } from '@/config/config.module';
import { CacheConfigService } from './cache-config.service';

@Module({
    imports: [
        NestCacheModule.registerAsync({
            imports: [
                ConfigModule,
            ],
            inject: [
                ConfigService,
            ],
            useClass: CacheConfigService,
        }),
    ],
    controllers: [
        CacheController,
    ],
    providers: [
        CacheService,
    ],
    exports: [
        CacheService,
    ]
})
export class CacheModule { }

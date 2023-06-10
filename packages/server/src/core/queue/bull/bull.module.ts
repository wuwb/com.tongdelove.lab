import { Global, Module } from "@nestjs/common";
import { BullModule as BaseBullModule } from '@nestjs/bull';
import { BullService } from "./bull.service";
import { ConfigService } from "@/config/config.service";

@Global()
@Module({
    imports: [
        // https://github.com/OptimalBits/bull/blob/master/REFERENCE.md#queue
        /* 启用队列 */
        BaseBullModule.forRootAsync('master', {
            useFactory: async (configService: ConfigService) => ({
                redis: {
                    host: configService.get<string>('bullRedis.host') || 'localhost',
                    port: configService.get<number>('bullRedis.port') || 6379,
                    password: configService.get<string>('bullRedis.password'),
                },
                limiter: {
                    max: 10000,
                    duration: 10000,
                    bounceBack: true,
                },
                prefix: 'td',
                // defaultJobOptions: {},
                settings: {
                    lockDuration: 30000, // Key expiration time for job locks.
                    lockRenewTime: 15000, // Interval on which to acquire the job lock
                    stalledInterval: 30000, // How often check for stalled jobs (use 0 for never checking).
                    maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
                    guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
                    retryProcessDelay: 5000, // delay before processing next job in case of internal error.
                    backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
                    drainDelay: 5, // A timeout for when the queue is in drained state (empty waiting for jobs).
                },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [BullService],
    exports: [BullService],
})
export class BullModule { }

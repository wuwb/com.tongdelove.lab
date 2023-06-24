import { ConfigService } from "@/config/config.service";
import { BullModuleOptions, SharedBullConfigurationFactory } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BullConfigService implements SharedBullConfigurationFactory {

    constructor(
        private readonly configService: ConfigService,
    ) {

    }

    createSharedConfiguration(): BullModuleOptions {
        return {
            url: '',
            // redis: {
            //     host: this.configService.get<string>('bullRedis.host', 'localhost'),
            //     port: this.configService.get<number>('bullRedis.port', 6379),
            //     password: this.configService.get<string>('bullRedis.password', ''),
            // },
            // limiter: {
            //     max: 10000,
            //     duration: 10000,
            //     bounceBack: true,
            // },
            // prefix: 'td',
            // defaultJobOptions: {},
            // settings: {
            //     lockDuration: 30000, // Key expiration time for job locks.
            //     lockRenewTime: 15000, // Interval on which to acquire the job lock
            //     stalledInterval: 30000, // How often check for stalled jobs (use 0 for never checking).
            //     maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
            //     guardInterval: 5000, // Poll interval for delayed jobs and added jobs.
            //     retryProcessDelay: 5000, // delay before processing next job in case of internal error.
            //     backoffStrategies: {}, // A set of custom backoff strategies keyed by name.
            //     drainDelay: 5, // A timeout for when the queue is in drained state (empty waiting for jobs).
            // },
        };
    }
}

import ioredis from 'ioredis';
import { REDIS_CLIENT_PROVIDER, OPTIONS_PROVIDER } from "../constants/common.constant";

export const createRedisClientProvider = () => ({
    provide: REDIS_CLIENT_PROVIDER,
    useFactory: async ({ redis: options }) => new ioredis(options),
    inject: [OPTIONS_PROVIDER]
});

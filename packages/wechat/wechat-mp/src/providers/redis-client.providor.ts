import { REDIS_CLIENT_PROVIDER, OPTIONS_PROVIDER } from "../constants/common.constant";
import Redis from "ioredis";

// 创建 Redis 客户端提供程序
export const createRedisClientProvider = () => ({
    // 提供器标识符
    provide: REDIS_CLIENT_PROVIDER,
    // 使用工厂函数创建 Redis 客户端实例
    useFactory: async ({ redisOptions }) => {
        return redisOptions ? new Redis(redisOptions) : null;
    },
    // 指定工厂函数的依赖项
    inject: [OPTIONS_PROVIDER]
});

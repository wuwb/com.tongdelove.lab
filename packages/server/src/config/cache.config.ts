import { registerAs } from '@nestjs/config';

export default registerAs('cache', () => ({
    redisEXSecond: 60, // 缓存1分钟
}));

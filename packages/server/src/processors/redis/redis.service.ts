import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { HelperService } from '@/utils/helper/helper.service';

type unitType = 'h' | 'm' | 's' | 'ms';

@Injectable()
export class RedisService {

  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly configService: ConfigService,
    private readonly helperService: HelperService,
  ) { }

  async cacheUser(data) {
    const {
      avatar,
      email,
      id,
      isSuper,
      mobile,
      platform,
      status,
      username,
    } = data;
    const userinfo = {
      avatar,
      email,
      id,
      isSuper,
      mobile,
      platform,
      status,
      username,
    }
    const redisScope = this.configService.get('jwt.redisScope');
    const userInfoKey = `${redisScope}:userinfo:${userinfo.id}`;
    console.log(userInfoKey);
    return this.cacheManager.set(this.getPrefixKey(userInfoKey), JSON.stringify(userinfo), {
      ttl: 1000
    });
  }

  getPrefixKey(key: string): string {
    const prifixName = this.configService.get('redis.prefixName');
    return `${prifixName}${key}`;
  }

  async has(key: string): Promise<boolean> {
    return this.get(key);
  }

  /**
   * 获取缓存
   *
   * @param {string} key 缓存标识
   * @param {any} def 当缓存不存在的时候, 返回的默认值
   */
  async get(key: string, def: any = null): Promise<any> {
    try {
      const result = await this.cacheManager.get<string>(this.getPrefixKey(key));

      if (result) {
        return JSON.parse(result);
      } else {
        return def;
      }
    } catch (error) {
      await this.abortError('get 方法只能获取 string 类型缓存');
    }
  }

  /**
   * 设置字符串类型缓存
   *
   * @param {string} key 缓存标识
   * @param {any}    value 缓存的数据
   * @param {number} time 缓存过期时间
   * @param {string} unit 指定时间单位 （h/m/s/ms）默认为 s
   */
  async set(key: string, value: any, time = 0, unit: unitType = 's') {
    let t = Number(time);

    if (
      this.helperService.isEmptyByAllTypes(key) ||
      this.helperService.isEmpty(value) ||
      Number.isNaN(t)
    ) {
      throw new Error('key is empty');
    }

    // 为了能传入 object、array 这类的值，所以这里转换成 json
    const data = JSON.stringify(value);
    let un = unit;

    if (t) {
      // 转换为小写
      un = un.toLowerCase() as unitType;

      // 判断时间单位
      switch (un) {
        case 'h':
          t *= 3600;
          break;
        case 'm':
          t *= 60;
          break;
        case 's':
          break;
        case 'ms':
          break;
        default:
          return this.abortError('时间单位只能是：h/m/s/ms');
      }

      return this.cacheManager.set(this.getPrefixKey(key), data, {
        ttl: t,
      });
    }

    return this.cacheManager.set(this.getPrefixKey(key), data);
  }

  async del(key: string) {

  }

  async abortError(message: string, code = 422) {
    const error: any = new Error(`[cache]: ${message}`);
    error.status = code;
    error.name = 'CacheException';

    throw error;
  }
}

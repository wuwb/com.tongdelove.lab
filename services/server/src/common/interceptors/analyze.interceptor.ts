/**
 * 数据分析拦截器
 */
import isbot from 'isbot';
import { Observable } from 'rxjs';
import UAParser from 'ua-parser-js';
import { URL } from 'url';

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { RedisKeys } from '@/common/constants/redis.constant';
import { getNestExecutionContextRequest } from '@/common/transformers/get-req.transformer';
import { getIp } from '@/utils/ip.util';
import { Request } from 'express';
import { getRedisKey } from '@/utils/redis.util';

@Injectable()
export class AnalyzeInterceptor implements NestInterceptor {
    private parser: UAParser

    constructor(

    ) {
        this.init()
    }

    async init() {
        this.parser = new UAParser()
    }

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Promise<Observable<any>> {
        const call$ = next.handle()
        const request = context.switchToHttp().getRequest<Request>()
        if (!request) {
            return call$
        }
        const method = request.method.toUpperCase()
        if (method !== 'GET') {
            return call$
        }
        const ip = getIp(request)

        // if req from SSR server, like 127.0.0.1, skip
        if (['127.0.0.1', 'localhost', '::-1'].includes(ip)) {
            return call$
        }
        // if login
        if (request.user) {
            return call$
        }

        // if user agent is in bot list, skip
        if (isbot(request.headers['user-agent'])) {
            return call$
        }

        const url = request.url.replace(/^\/api(\/v\d)?/, '')

        if (url.startsWith('/proxy')) {
            return call$
        }

        process.nextTick(async () => {
            try {
                request.headers['user-agent'] &&
                    this.parser.setUA(request.headers['user-agent'])

                const ua = this.parser.getResult()

                // 存储请求日志，ip，ua，路径
                // await this.model.create({
                //     ip,
                //     ua,
                //     path: new URL(`http://a.com${url}`).pathname,
                // });
                // 查询配置项，是否需要记录请求时间
                // const apiCallTimeRecord = await this.options.findOne({
                //     name: 'apiCallTime',
                // });
                // 没有设置项的话，设置默认值
                // if (!apiCallTimeRecord) {
                //     await this.options.create({
                //         name: 'apiCallTime',
                //         value: 1,
                //     });
                // } else {
                //     // 有的话，更新加一
                //     await this.options.updateOne(
                //         { name: 'apiCallTime' },
                //         {
                //             $inc: {
                //                 value: 1,
                //             },
                //         },
                //     );
                // }
                // ip access in redis
                // const client = this.cacheService.getClient();

                // const count = await client.sadd(getRedisKey(RedisKeys.AccessIp), ip);
                // if (count) {
                // record uv to db
                // 更新 uv 信息
                // const uvRecord = await this.options.findOne({ name: 'uv' })
                // if (uvRecord) {
                //     await uvRecord.updateOne({
                //         $inc: {
                //             value: 1,
                //         },
                //     });
                // } else {
                //     await this.options.create({
                //         name: 'uv',
                //         value: 1,
                //     });
                // }
                // }
            } catch (err) {
                console.error(err);
            }
        });

        return call$;
    }
}

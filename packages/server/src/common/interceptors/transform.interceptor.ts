import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { instanceToPlain } from 'class-transformer';

export interface Response<T> {
    code?: number;
    data: T;
    message?: string;

    success?: boolean;
    status?: string;

    page?: number;
    total?: number;
}

/**
 * 包装 response 返回
 * @class TransformInterceptor
 * @classdesc 当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构 IHttpResultPaginate
 */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private readonly logger = new Logger(TransformInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
        console.log('Before...');
        const handler = context.getHandler();
        const ctx = context.switchToHttp();
        const request = ctx.getRequest<Request>();
        const response = ctx.getResponse();

        const gqlCtx = GqlExecutionContext.create(context);
        const graphqlRequest = gqlCtx.getContext().req;

        const req = context.getArgByIndex(1).req;
        // this.logger.debug('context: ');
        // this.logger.log(JSON.stringify(context));
        // this.logger.log('request: ', JSON.stringify(request));

        if (request) {
            this.logger.log('request transform.');
            this.logger.log(`Request original url: ${req.originalUrl}`);
            this.logger.log(`Method: ${req.method}`);
            this.logger.log(`IP: ${req.ip}`);
            this.logger.log(`User: ${JSON.stringify(req.user)}`);
            this.logger.log('----------------------------------------');

            return next.handle().pipe(
                map((data: any) => {
                    // this.logger.log(`Response data:\n ${JSON.stringify(data)}`);
                    if (request.query.current && request.query.pageSize) {
                        return {
                            code: response.statusCode,
                            data: data.data,
                            message: '请求成功',
                            success: true,

                            page: +request.query.current,
                            total: data.count,
                        };
                    } else {
                        return {
                            code: response.statusCode,
                            data,
                            message: '请求成功',
                            success: true,
                        };
                    }
                }),
            );
        } else if (graphqlRequest) {
            this.logger.log('graphqlRequest transform.');
            return next.handle().pipe(map(data => ({ data })));
        } else {
            this.logger.log('default transform.');
            return next.handle().pipe(map(data => ({ data })));
        }
    }
}

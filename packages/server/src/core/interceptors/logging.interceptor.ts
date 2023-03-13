import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        console.log('Before...');

        const gqlCtx = GqlExecutionContext.create(context);
        const graphqlRequest = gqlCtx.getContext().req;

        const request = context.switchToHttp().getRequest();

        if (request) {
            const method = request.method;
            const url = request.url;
            const now = Date.now();

            const body = request.body;
            const params = request.params;
            const query = request.query;
            const user = request.user;
            // 包含从路由处理程序返回的值, 因此我们可以使用 map() 运算符轻松地对其进行改变。
            return next
                .handle()
                .pipe(
                    // 调用该函数观察序列的正常执行或异常终止。
                    tap(() => {
                        this.logger.log(`${method} ${url} ${Date.now() - now}ms`, context.getClass().name);
                    }),
                    map((data) => {
                        const message = {
                            url,
                            method,
                            user,
                            body,
                            params,
                            query,
                            data
                        };
                        return data;
                    }),
                );
        } else if (graphqlRequest) {
            return next.handle().pipe(tap());
        } else {
            return next.handle().pipe();
        }

    }
}

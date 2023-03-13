/**
 * 日志拦截器
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Logs controllers incoming requests
 */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const gqlCtx = GqlExecutionContext.create(context);
    const graphqlRequest = gqlCtx.getContext().req;

    const request: Request = context.switchToHttp().getRequest();
    const ip = request.headers['X-Forwarded-For'] || request.ip;

    this.logger.log(
      `${request.method} ${request.url} ${ip}`,
    );

    if (request) {
      const method = request.method;
      const url = request.url;
      const now = Date.now();

      const body = request.body;
      const params = request.params;
      const query = request.query;
      const user = request.user;
      // 包含从路由处理程序返回的值, 因此我们可以使用 map() 运算符轻松地对其进行改变。
      return next.handle().pipe(
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
          this.logger.log(message, '中间件记录日志');
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

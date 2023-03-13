/**
 * 缓存拦截器
 */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Reflector } from '@nestjs/core';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  constructor() {
  }

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const isCached = true;
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }

}

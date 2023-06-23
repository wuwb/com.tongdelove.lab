import {
    ExecutionContext, HttpException, Injectable, NestInterceptor,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Response<T> {
    code?: number;
    data: T;
    message?: string;

    success?: boolean;
    status?: string;

    page?: number;
    total?: number;
}

@Injectable()
export class ErrorsInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
        return next.handle().pipe(catchError((error, caught) => {
            if (error instanceof HttpException) {
                return Promise.resolve({
                    code: error.getStatus(),
                    message: error.getResponse()
                });
            } else {
                return Promise.resolve({
                    code: 500,
                    message: '出现了意外错误：' + error.toString()
                });
            }
        }));
    }
}

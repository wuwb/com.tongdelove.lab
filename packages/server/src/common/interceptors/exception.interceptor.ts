import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    HttpStatus,
    CallHandler,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> {
        return next
            .handle()
            .pipe(
                catchError((err) =>
                    // 覆盖异常
                    throwError(() => new HttpException('Message', HttpStatus.BAD_GATEWAY)),
                ),
            );
    }
}

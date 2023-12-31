import { CallHandler, ExecutionContext, Injectable, InternalServerErrorException, NestInterceptor } from "@nestjs/common";
import * as Sentry from '@sentry/node';
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

const errorsToTrackInSentry = [InternalServerErrorException, TypeError];

const enableSentry = (err) => {
    let sendToSentry = errorsToTrackInSentry.some(
        (errorType) => err instanceof errorType,
    );
    if (sendToSentry) Sentry.captureException(err);
    return throwError(() => err);
};

@Injectable()
export class SentryInterceptor implements NestInterceptor {
    constructor(private env) {
        this.env = env;
    }

    intercept(
        context: ExecutionContext,
        next: CallHandler<any>,
    ): Observable<any> | Promise<Observable<any>> {
        if (this.env == 'prod') {
            return next.handle().pipe(catchError(enableSentry));
        }
        else {
            return next.handle().pipe(catchError((err) => throwError(err)));;
        }
    }
}

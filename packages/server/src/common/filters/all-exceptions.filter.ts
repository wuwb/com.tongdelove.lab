import { ExceptionFilter, Catch, ArgumentsHost, HttpServer, Inject, HttpStatus, Logger, HttpException, ForbiddenException } from '@nestjs/common';
import { BaseExceptionFilter, ModuleRef, Reflector } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../exceptions/api.exception';
import { ResOp } from '@/shared/classes/res.class';
import { REFLECTOR } from '../constants/meta.constant';

/**
 * 异常接管，统一异常返回数据
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(
        private readonly httpAdapter,
    ) {
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here
        const ctx = host.switchToHttp();

        // const response = ctx.getResponse();

        // response.header('Content-Type', 'application/json; charset=utf-8');
        // response.status(status).json(result);

        let message: string;
        if (exception instanceof HttpException) {
            const response = exception.getResponse();
            message = (response as any).message ?? response;
        } else {
            message = `${exception}`;
        }

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;
        const code =
            exception instanceof ApiException
                ? (exception as ApiException).getErrorCode()
                : httpStatus;
        const responseBody = ResOp.error('', httpStatus, {
            data: {
                timestamp: new Date().toISOString(),
                path: this.httpAdapter.getRequestUrl(ctx.getRequest()),
            }
        });

        this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}

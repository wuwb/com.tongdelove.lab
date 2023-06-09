import { ExceptionFilter, Catch, ArgumentsHost, HttpServer, Inject, HttpStatus, Logger, HttpException, ForbiddenException } from '@nestjs/common';
import { BaseExceptionFilter, ModuleRef } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiException } from '../exceptions/api.exception';
import { ResOp } from '../classes/res.class';

/**
 * 异常接管，统一异常返回数据
 */
@Catch()
export class AllExceptionsFilter<T> implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    constructor(
        private readonly httpAdapterHost: HttpAdapterHost,
        private readonly configService: ConfigService,
    ) {
    }

    catch(exception: unknown, host: ArgumentsHost) {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const { status, result } = this.errorResult(exception);
        response.header('Content-Type', 'application/json; charset=utf-8');
        response.status(status).json(result);

        const httpStatus =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const responseBody = {
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    /* 解析错误类型，获取状态码和返回值 */
    errorResult(exception: unknown) {
        const { httpAdapter } = this.httpAdapterHost;

        const status =
            exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

        const code =
            exception instanceof ApiException
                ? (exception as ApiException).getErrorCode()
                : status;

        let message: string;
        if (exception instanceof HttpException) {
            const response = exception.getResponse();
            message = (response as any).message ?? response;
        } else {
            message = `${exception}`;
        }
        return {
            status,
            result: ResOp.error(message, code, {
                timestamp: new Date().toISOString(),
            }),
        };
    }
}

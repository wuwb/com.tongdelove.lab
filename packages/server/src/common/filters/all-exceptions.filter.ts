import { ExceptionFilter, Catch, ArgumentsHost, HttpServer, Inject, HttpStatus, Logger, HttpException, ForbiddenException } from '@nestjs/common';
import { BaseExceptionFilter, ModuleRef } from '@nestjs/core';
import { HttpAdapterHost } from '@nestjs/core';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

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
}

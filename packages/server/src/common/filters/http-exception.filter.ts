import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    ForbiddenException,
    HttpException,
    HttpStatus,
    Logger
} from '@nestjs/common';
import { BaseExceptionFilter } from "@nestjs/core";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import type { Request, Response } from 'express';
import { ResOp } from '@/shared/classes/res.class';

export type ErrorCodesStatusMapping = {
    [key: string]: number;
};

/**
 * 为了处理每个发生的异常（无论异常类型如何），可以将括号留空（@Catch()）
 *
 * @export
 * @class HttpExceptionFilter
 * @implements {ExceptionFilter}
 */
@Catch(HttpException)
export class HttpExceptionFilter extends BaseExceptionFilter
    implements ExceptionFilter<HttpException> {

    private readonly logger = new Logger(HttpExceptionFilter.name);

    /**
     * default error codes mapping
     *
     * Error codes definition for Prisma Client (Query Engine)
     * @see https://www.prisma.io/docs/reference/api-reference/error-reference#prisma-client-query-engine
     */
    private errorCodesStatusMapping: ErrorCodesStatusMapping = {
        P2000: HttpStatus.BAD_REQUEST,
        P2002: HttpStatus.CONFLICT,
        P2025: HttpStatus.NOT_FOUND,
    };

    catch(exception: any, host: ArgumentsHost) {
        console.log('-----------------')
        this.logger.error(exception);

        let statusCode, code, message, result;

        if (host.getType() === "http") {
            const ctx = host.switchToHttp();
            const request = ctx.getRequest<Request>();
            const response = ctx.getResponse<Response>();

            this.logger.error(`${request.method} ${request.url}`, 'HttpExceptionFilter');

            let status = exception instanceof HttpException
                ? exception.getStatus()
                : HttpStatus.INTERNAL_SERVER_ERROR;

            if (exception instanceof HttpException) {
                message = exception.message
            } else if (exception instanceof PrismaClientKnownRequestError) {
                const statusCode = this.errorCodesStatusMapping[exception.code];
                if (exception.code === "P2002") {
                    // Handling Unique Key Constraint Violation Error
                    const fields = (exception.meta as { target: string[] }).target;
                    message = `Another record with the requested (${fields.join(
                        ", "
                    )}) already exists`;
                } else {
                    message =
                        `[${exception.code}]: ` +
                        this.exceptionShortMessage(exception.message);
                }

                if (!Object.keys(this.errorCodesStatusMapping).includes(exception.code)) {
                    return super.catch(exception, host);
                }

                result = {
                    message: message,
                    statusCode: statusCode,
                };
            } else if (exception instanceof ForbiddenException) {
                message = '未登录';
            } else {
                message = 'Internal server error';
            }

            try {
                const exceptionData = JSON.parse(exception.message);
                message = exceptionData.message;
                code = exceptionData.code;
            } catch (e) { }

            result = new ResOp(code, message, null);

            response.status(status)
                .type('application/json')
                // .json({
                //     code,
                //     message,
                //     data: null,
                //     success: false,
                //     timestamp: new Date().toISOString(), // toLocaleDateString
                //     path: request.url,
                // })
                .send(result);
        }

        return new HttpException(message, statusCode);
    }

    /**
     * @param exception
     * @returns short message for the exception
     */
    exceptionShortMessage(message: string): string {
        const shortMessage = message.substring(message.indexOf("→"));
        return shortMessage
            .substring(shortMessage.indexOf("\n"))
            .replace(/\n/g, "")
            .trim();
    }
}

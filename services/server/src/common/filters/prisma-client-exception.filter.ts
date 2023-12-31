import { ArgumentsHost, Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { PrismaClient, Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        Logger.log(JSON.stringify(exception));


        switch (exception.code) {
            case 'P2002':
                const status = HttpStatus.CONFLICT;
                console.log('-----message: ', exception.message);
                const message = exception.message.replace(/\n/g, '');

                response.status(status).json({
                    code: status,
                    message: message,
                });
                break;
            default:
                // default 500 error code
                super.catch(exception, host);
                break;
        }
    }
}

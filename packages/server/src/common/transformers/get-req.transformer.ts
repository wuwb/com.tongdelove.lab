import { Request } from 'express';
import { ExecutionContext } from '@nestjs/common';

export function getNestExecutionContextRequest(
    context: ExecutionContext,
): Request & Record<string, any> {
    return context.switchToHttp().getRequest<Request>()
}

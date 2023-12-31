import { HttpException, HttpStatus } from "@nestjs/common";

export class ForbiddenException extends HttpException {
    constructor(message: string = 'Forbidden', statusCode?: number) {
        super(message, HttpStatus.FORBIDDEN);
    }
}

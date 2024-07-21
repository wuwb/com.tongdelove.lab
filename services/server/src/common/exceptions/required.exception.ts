import { HttpException, HttpStatus } from '@nestjs/common'

export class RequireException extends HttpException {
  constructor(response?: string, status?: number) {
    super(response || 'Bad Request', status || HttpStatus.BAD_REQUEST)
  }
}

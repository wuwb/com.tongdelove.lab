import { HttpException, HttpStatus } from "@nestjs/common";
import { ErrorCodeMap } from '../constants/error.constant';

/**
 * Api业务异常均抛出该异常
 */
export class MyHttpException extends HttpException {
    /**
     * 业务类型错误代码，非Http code
     */
    private errorCode: number;

    constructor(errorCode: number) {
        super(ErrorCodeMap[errorCode], 200);
        this.errorCode = errorCode;
    }

    getErrorCode(): number {
        return this.errorCode;
    }
}

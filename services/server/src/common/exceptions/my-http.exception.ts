import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorCodeMap } from '../constants/error.constant'

/**
 * Api业务异常均抛出该异常
 */
export class MyHttpException extends HttpException {
  /**
   * 业务类型错误代码，非Http code
   *
   * 注意：Nest 12 的 HttpException 基类已存在 `errorCode` 字段（string），
   * 因此这里用 businessCode 命名，避免遮蔽基类属性导致类型冲突。
   */
  private readonly businessCode: number

  constructor(errorCode: number) {
    super(ErrorCodeMap[errorCode], 200)
    this.businessCode = errorCode
  }

  getErrorCode(): number {
    return this.businessCode
  }
}

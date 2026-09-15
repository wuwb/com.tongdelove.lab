import { HttpException, HttpStatus } from '@nestjs/common'
import { ErrorCodeMap } from '../constants/error.constant'

/**
 * Api业务异常均抛出该异常
 */
export class ApiException extends HttpException {
  /**
   * 业务类型错误代码，非 Http code
   *
   * 注意：Nest 12 的 HttpException 基类已存在 `errorCode` 字段（string），
   * 因此这里用 businessCode 命名，避免遮蔽基类属性导致类型冲突。
   */
  private readonly businessCode: number

  constructor(errorCode: number, comment?: string) {
    const message = ErrorCodeMap[errorCode]

    // 权限问题一律使用 401 错误码
    if (errorCode && errorCode == 401) {
      super(HttpException.createBody({ errorCode, message }), 200)
      this.businessCode = 401
    } else {
      // 其他异常一律使用 500 错误码
      super(HttpException.createBody({ errorCode, message }), errorCode ?? 200)
      this.businessCode = errorCode ?? 500
    }
  }

  getErrorCode(): number {
    return this.businessCode
  }
}

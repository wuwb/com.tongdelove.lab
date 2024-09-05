import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Request } from 'express'
import { GqlExecutionContext } from '@nestjs/graphql'
import { instanceToPlain } from 'class-transformer'
import { RESPONSE_PASSTHROUGH_METADATA } from '../constants/meta.constant'
import { isArrayLike, isObjectLike } from 'lodash'
import snakecaseKeys from 'snakecase-keys'

export interface Response<T> {
  code?: number
  data: T
  message?: string

  success?: boolean
  status?: string

  page?: number
  total?: number
}

/**
 * 包装 response 返回
 * 当控制器所需的 Promise service 成功响应时，将在此被转换为标准的数据结构 IHttpResultPaginate
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  private readonly logger = new Logger(TransformInterceptor.name)

  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<Response<T>> {
    const handler = context.getHandler()

    // 跳过 bypass 装饰的请求
    const bypass = this.reflector.get<boolean>(
      RESPONSE_PASSTHROUGH_METADATA,
      handler
    )
    if (bypass) {
      return next.handle().pipe(map((data) => ({ data })))
    }

    const ctx = context.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse()

    const gqlCtx = GqlExecutionContext.create(context)
    const graphqlRequest = gqlCtx.getContext().req

    const req = context.getArgByIndex(1).req

    if (request) {
      this.logger.log('http transform.')
      return next.handle().pipe(
        map((data: any) => {
          if (request.query.page && request.query.limit) {
            return {
              code: response.statusCode,
              data: data.data,
              message: '请求成功',
              success: true,
              page: +request.query.page,
              total: data.count,
            }
          } else {
            return {
              code: response.statusCode,
              data,
              message: '请求成功',
              success: true,
            }
          }
        })
      )
    } else if (graphqlRequest) {
      this.logger.log('graphqlRequest transform.')
      return next.handle().pipe(map((data) => ({ data })))
    } else {
      this.logger.log('default transform.')
      return next.handle().pipe(map((data) => ({ data })))
    }
  }

  private serialize(obj: any) {
    if (!isObjectLike(obj)) {
      return obj
    }

    if (isArrayLike(obj)) {
      obj = Array.from(obj).map((i) => {
        return this.serialize(i)
      })
    } else {
      // if is Object
      if (obj.toJSON || obj.toObject) {
        obj = obj.toJSON?.() ?? obj.toObject?.()
      }

      Reflect.deleteProperty(obj, '__v')

      const keys = Object.keys(obj)
      for (const key of keys) {
        const val = obj[key]
        // first
        if (!isObjectLike(val)) {
          continue
        }

        if (val.toJSON) {
          obj[key] = val.toJSON()
          // second
          if (!isObjectLike(obj[key])) {
            continue
          }
          Reflect.deleteProperty(obj[key], '__v')
        }
        obj[key] = this.serialize(obj[key])
      }
      obj = snakecaseKeys(obj)
    }
    return obj
  }
}

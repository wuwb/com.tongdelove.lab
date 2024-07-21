import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest()
    const gqlCtx = GqlExecutionContext.create(ctx)
    const gqlUser = gqlCtx.getContext().req.user

    if (data && request.user) {
      return request.user[data]
    } else {
      return gqlUser || request.user
    }
  }
)

export const CurrentUser = User

/**
 * 定义当前用户的数据类型
 */
export interface ICurrentUserType {
  id: string
  username?: string
  mobile?: string
  email?: string
  isSuper?: number
  platform?: number
  iat: number
  exp: number
}

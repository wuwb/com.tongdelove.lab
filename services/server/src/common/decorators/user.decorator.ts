import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql'
import { User as UserEntity } from '@prisma/client'

export enum UserEnum {
  'userId' = 'id',
  'userName' = 'username',
  'nickName' = 'nickname',
  'deptId' = 'deptId',
  'deptName' = 'deptName',
}

export function getGqlContextUser(executionContext: ExecutionContext) {
  const gqlExecutionContext = GqlExecutionContext.create(executionContext)
  return gqlExecutionContext.getContext().req.user
}

/**
 * Access the user data from the request object i.e `req.user`.
 */
function userFactory(data: string, ctx: ExecutionContext): UserEntity {
  const contextType = ctx.getType()
  if (contextType === 'http') {
    // do something that is only important in the context of regular HTTP requests (REST)
    const request = ctx.switchToHttp().getRequest()
    const { user } = request
    return data ? user?.[data] : user
  } else if (contextType === 'rpc') {
    // do something that is only important in the context of Microservice requests
    throw new Error('Rpc context is not implemented yet')
  } else if (contextType === 'ws') {
    // do something that is only important in the context of Websockets requests
    throw new Error('Websockets context is not implemented yet')
  } else if (ctx.getType<GqlContextType>() === 'graphql') {
    // do something that is only important in the context of GraphQL requests
    return getGqlContextUser(ctx)
  }
  throw new Error('Invalid context')
}

export const User = createParamDecorator<string, ExecutionContext, UserEntity>(
  (data: string, ctx: ExecutionContext) => {
    return userFactory(data, ctx)
  }
)

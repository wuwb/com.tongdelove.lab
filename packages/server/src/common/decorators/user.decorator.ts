import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { User } from "@prisma/client";

export function getGqlContextUser(executionContext: ExecutionContext) {
  const gqlExecutionContext = GqlExecutionContext.create(executionContext);
  return gqlExecutionContext.getContext().req.user;
}

/**
 * Access the user data from the request object i.e `req.user`.
 */
function userFactory(data: string, ctx: ExecutionContext): User {
  const contextType = ctx.getType();
  if (contextType === "http") {
    // do something that is only important in the context of regular HTTP requests (REST)
    const request = ctx.switchToHttp().getRequest();
    const { user } = request;
    return data ? user?.[data] : user;

  } else if (contextType === "rpc") {
    // do something that is only important in the context of Microservice requests
    throw new Error("Rpc context is not implemented yet");
  } else if (contextType === "ws") {
    // do something that is only important in the context of Websockets requests
    throw new Error("Websockets context is not implemented yet");
  } else if (ctx.getType<GqlContextType>() === "graphql") {
    // do something that is only important in the context of GraphQL requests
    return getGqlContextUser(ctx);
  }
  throw new Error("Invalid context");
}

export const UserDecorator = createParamDecorator<string, ExecutionContext, User>(
  (data: string, ctx: ExecutionContext) => {
    return userFactory(data, ctx);
  },
);

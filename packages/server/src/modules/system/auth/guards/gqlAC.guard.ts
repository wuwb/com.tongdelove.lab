import { ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

export class GqlACGuard<User extends any = any> {
  async getUser(context: ExecutionContext): Promise<User> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext<{ req: { user: User } }>().req;
    return request.user;
  }
}

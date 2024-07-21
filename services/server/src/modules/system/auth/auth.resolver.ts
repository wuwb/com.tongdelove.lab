import { User } from '@/common/decorators/user.decorator'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { AuthService } from './auth.service'
import { LoginArgs } from './dto/LoginArgs'
import { GqlACGuard } from './guards/gqlAC.guard'
import { GqlDefaultAuthGuard } from './guards/gqlDefaultAuth.guard'
import { UserInfo } from './interface/UserInfo'

@Resolver(UserInfo)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserInfo)
  async login(@Args() args: LoginArgs) {
    // return this.authService.login(args.data);
  }

  // 查询用户信息
  @Query(() => UserInfo)
  // @UseGuards(GqlDefaultAuthGuard, GqlACGuard)
  async userInfo(@User() userInfo: UserInfo): Promise<UserInfo> {
    return userInfo
  }
}

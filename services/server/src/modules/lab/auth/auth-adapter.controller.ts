import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabAuthAdapterService } from './auth-adapter.service'

/**
 * 供 apps/lab 的 NextAuth 使用的适配器接口。
 *
 * lab 不再直连数据库，user/account/session 的读写全部经由这里转发。
 * 这些接口属于服务间调用，由 lab 的服务端组件调用。
 */
@ApiTags('lab/auth')
@Controller('api/lab/auth')
export class LabAuthAdapterController {
  constructor(private readonly authAdapter: LabAuthAdapterService) {}

  // ----------------------------------------------------------------- user

  @Post('user')
  createUser(@Body() body: any) {
    return this.authAdapter.createUser({
      ...body,
      emailVerified: body.emailVerified ? new Date(body.emailVerified) : null,
    })
  }

  @Get('user/:id')
  getUser(@Param('id') id: string) {
    return this.authAdapter.getUser(id)
  }

  @Get('user/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.authAdapter.getUserByEmail(email)
  }

  @Get('user/account/:provider/:providerAccountId')
  getUserByAccount(
    @Param('provider') provider: string,
    @Param('providerAccountId') providerAccountId: string,
  ) {
    return this.authAdapter.getUserByAccount(providerAccountId, provider)
  }

  @Put('user')
  updateUser(@Body() body: any) {
    return this.authAdapter.updateUser({
      ...body,
      emailVerified: body.emailVerified ? new Date(body.emailVerified) : undefined,
    })
  }

  @Delete('user/:id')
  deleteUser(@Param('id') id: string) {
    return this.authAdapter.deleteUser(id)
  }

  // -------------------------------------------------------------- account

  @Post('account')
  createAccount(@Body() body: any) {
    return this.authAdapter.createAccount(body)
  }

  @Get('account/:id')
  getAccountById(@Param('id') id: string) {
    return this.authAdapter.getAccountById(id)
  }

  @Put('account')
  updateAccount(@Body() body: any) {
    return this.authAdapter.updateAccount(body)
  }

  @Delete('account/:provider/:providerAccountId')
  deleteAccount(
    @Param('provider') provider: string,
    @Param('providerAccountId') providerAccountId: string,
  ) {
    return this.authAdapter.deleteAccount(providerAccountId, provider)
  }

  // -------------------------------------------------------------- session

  @Post('session')
  createSession(@Body() body: any) {
    return this.authAdapter.createSession({
      ...body,
      expires: new Date(body.expires),
    })
  }

  @Get('session/:sessionToken')
  getSessionAndUser(@Param('sessionToken') sessionToken: string) {
    return this.authAdapter.getSessionAndUser(sessionToken)
  }

  @Put('session')
  updateSession(@Body() body: any) {
    return this.authAdapter.updateSession({
      ...body,
      expires: body.expires ? new Date(body.expires) : undefined,
    })
  }

  @Delete('session/:sessionToken')
  deleteSession(@Param('sessionToken') sessionToken: string) {
    return this.authAdapter.deleteSession(sessionToken)
  }
}

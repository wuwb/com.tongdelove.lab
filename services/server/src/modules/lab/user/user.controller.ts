import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { LabUserService } from './user.service'

@ApiTags('lab/user')
@Controller('api/lab/user')
export class LabUserController {
  constructor(private readonly userService: LabUserService) {}

  @Get('public-profile')
  getUserProfile(@Query('id') id: string) {
    return this.userService.getUserPublicById(id)
  }

  @Get('subscription')
  getSubscription(@Query('userId') userId: string) {
    return this.userService.getSubscriptionFields(userId ?? '')
  }

  @Get('basic')
  getUserBasic(@Query('userId') userId: string) {
    return this.userService.getUserBasic(userId ?? '')
  }

  @Get('is-admin')
  isAdmin(@Query('userId') userId: string) {
    return this.userService.isAdmin(userId ?? '')
  }
}

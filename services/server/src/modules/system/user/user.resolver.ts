import { Resolver } from '@nestjs/graphql'
import { User } from '@/core/database/drizzle/types'
import { UserService } from './user.service'

@Resolver()
export class UserResolver {
  constructor(protected readonly service: UserService) {}
}

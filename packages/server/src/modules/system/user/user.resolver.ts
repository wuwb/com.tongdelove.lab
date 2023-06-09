import { Resolver } from "@nestjs/graphql";
import { User } from '@prisma/client';
import { UserService } from "./user.service";

@Resolver()
export class UserResolver {
    constructor(
        protected readonly service: UserService,
    ) { }
}

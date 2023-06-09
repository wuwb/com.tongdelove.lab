import { User } from "@prisma/client";

export interface IUserService {
    findAll(): Promise<User[]>
}

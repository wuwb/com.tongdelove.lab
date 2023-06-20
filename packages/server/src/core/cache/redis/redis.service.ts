import { Injectable } from "@nestjs/common";
import { User } from '@prisma/client';

@Injectable()
export class RedisService {

    setUser(id: string) {
        return '';
    }

    getUser(id: string) {
        return {

        } as User;
    }

    getUserToken(id: string) {
        return '';
    }
}

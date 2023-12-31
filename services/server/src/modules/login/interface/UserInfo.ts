import { Field, ObjectType } from "@nestjs/graphql";
import { User } from '@prisma/client';

@ObjectType()
export class UserInfo implements Partial<User> {
    @Field(() => String)
    id!: string;

    @Field(() => String)
    login!: string; // 登录时候使用

    @Field(() => String)
    nicename: string; // 链接里使用

    @Field(() => String)
    displayName: string; // 显示在界面上

    @Field(() => [String])
    roles!: string[];

    @Field(() => String, { nullable: true })
    accessToken?: string;
}

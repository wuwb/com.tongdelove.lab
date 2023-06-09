import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class LoginInput {
    @Field({ nullable: false })
    login: string;

    @Field({ nullable: false })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

import { IsString } from 'class-validator';

export class LoginReqDto {
    /* uuid码 */
    @IsString()
    uuid: string;

    /* 验证码code */
    @IsString()
    code: string;

    /* 用户名 */
    @IsString()
    username: string;

    /* 密码 */
    @IsString()
    password: string;
}

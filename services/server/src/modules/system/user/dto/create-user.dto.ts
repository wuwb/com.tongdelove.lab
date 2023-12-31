import { IsString, IsNotEmpty, IsMobilePhone, IsInt, Min, MinLength, ArrayNotEmpty, ArrayMinSize, ArrayMaxSize, IsEmail, ValidateIf, isEmpty, IsOptional } from 'class-validator';
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Prisma } from "@prisma/client/extension";

export class CreateUserDto {

    @ApiProperty({
        description: '用户名'
    })
    @IsNotEmpty({
        message: 'name can not be empty'
    })
    @IsString({
        message: 'name must be string'
    })
    @MinLength(4) // 用户名最小为 4 位数，用于登录
    readonly login: string;

    @ApiProperty({
        description: '显示名称，显示在页面上的名称'
    })
    @IsString()
    displayName: string;

    @ApiProperty({
        required: false,
        description: '邮箱',
    })
    @IsNotEmpty({
        message: 'email can not be empty'
    })
    @IsEmail()
    @ValidateIf((o) => !isEmpty(o.email))
    readonly email: string;

    @ApiProperty({
        required: false,
        description: '手机号',
    })
    @IsString()
    @IsOptional()
    phone: string;

    @IsNotEmpty({
        message: 'password can not be empty'
    })
    readonly pass: string;

    @ApiProperty({
        description: '角色归属',
        type: [String],
    })
    @ArrayNotEmpty()
    @ArrayMinSize(1)
    @ArrayMaxSize(3)
    @IsNotEmpty({
        message: 'role can not be empty'
    })
    readonly roles: string[];

    @IsString()
    readonly activationKey?: string;


    @ApiProperty({
        description: '所属的部门编号'
    })
    departmentId: string;
}

import { MaxLength, IsOptional, ValidateIf, IsString, IsInt } from 'class-validator';


export class DeptBaseVO {

    @IsString()
    name: string;

    @IsString()
    parentId: string;

    @IsInt()
    sort: number;

    @IsString()
    leaderUserId: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;

    @IsInt()
    status: number;
}

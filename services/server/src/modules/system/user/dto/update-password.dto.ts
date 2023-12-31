import { IsEmail, IsString, IsOptional } from 'class-validator';

export class UpdatePasswordDto {
    id: string;

    @IsString()
    @IsOptional()
    password: string;
}

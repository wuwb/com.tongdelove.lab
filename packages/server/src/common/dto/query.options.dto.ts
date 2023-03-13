import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryOptionsDto {
    @ApiPropertyOptional({
        required: false,
        description: '一页显示多少条',
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly pageSize?: number;

    @ApiPropertyOptional({
        required: false,
        description: '当前页数',
        default: 1,
    })
    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(1)
    readonly pageNumber?: number;

    @ApiProperty({
        description: '时间戳',
        required: false,
    })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    readonly _t: number;
}

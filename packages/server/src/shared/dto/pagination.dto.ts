import { ApiHideProperty, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min, IsNumber, IsString } from 'class-validator';
import { QueryReqDto } from './query-req.dto';

export class PaginationDto extends QueryReqDto {
    @ApiPropertyOptional({
        required: false,
        description: '一页显示多少条',
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @IsNumber()
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
    @IsNumber()
    readonly pageNum?: number;

    /* 排序方式 */
    @IsOptional()
    @Type()
    @IsString()
    public isAsc?: string;

    /* mysql忽略条数 */
    @ApiHideProperty()
    public skip?: number;
    /* mysql返回条数 */
    @ApiHideProperty()
    public take?: number;

    @ApiProperty({
        description: '时间戳',
        required: false,
    })
    @Type(() => Number)
    @IsInt()
    @IsOptional()
    readonly _t?: number;
}

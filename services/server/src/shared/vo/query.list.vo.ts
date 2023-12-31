import { ApiProperty } from '@nestjs/swagger';

export class QueryListVo {
    @ApiProperty({ description: '总页数' })
    total: number;

    @ApiProperty({ description: '页码' })
    page: number;

    @ApiProperty({ description: '当前页' })
    limit: number;
}

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<T> {
    constructor(pageSize: number, pageNum: number, data: T[]) {
        this.pageSize = pageSize;
        this.pageNum = pageNum;
        this.data = data;
    }

    @ApiProperty({ description: '总页数' })
    total: number;

    @ApiHideProperty()
    @ApiProperty({ description: '列表数据', isArray: true })
    data: T[];

    @ApiProperty({ description: '页码' })
    pageSize: number;

    @ApiProperty({ description: '当前页' })
    pageNum: number;
}

import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<T> {
    constructor(page: number, limit: number, data: T[]) {
        this.page = page;
        this.limit = limit;
        this.data = data;
    }

    @ApiProperty({ description: '总页数' })
    total: number;

    @ApiHideProperty()
    @ApiProperty({ description: '列表数据', isArray: true })
    data: T[];

    @ApiProperty({ description: '页码' })
    page: number;

    @ApiProperty({ description: '当前页数量' })
    limit?: number;
}

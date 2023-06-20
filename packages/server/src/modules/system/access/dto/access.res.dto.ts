import { QueryResDto } from '@/shared/dto/query-res.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedDto } from '@/shared/dto/paginated.dto';

export class AccessResDto extends QueryResDto {
    @ApiProperty({ description: '模块名称' })
    moduleName: string;

    @ApiProperty({ description: '操作名称' })
    actionName: string;

    @ApiProperty({ description: '小图标' })
    icon?: string;

    @ApiProperty({ description: 'url地址' })
    url: string;

    @ApiProperty({ description: '针对操作的请求方式' })
    method?: string;

    @ApiProperty({ description: '父模块ID' })
    parentId: string;

    @ApiProperty({ description: '排序' })
    sort: number;

    @ApiProperty({ description: '描素' })
    description?: string;
}

export class AccessListResDtoDto extends PaginatedDto<AccessResDto>{
    constructor(pageSize: number, pageNum: number, data: AccessResDto[]) {
        super(pageSize, pageNum, data);
    }
}

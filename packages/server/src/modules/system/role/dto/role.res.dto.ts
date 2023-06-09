import { ApiProperty } from '@nestjs/swagger';
import { QueryResDto } from '@/common/dto/query-res.dto';
import { PaginatedDto } from '@/common/dto/paginated.dto';

export class RoleResDto extends QueryResDto {
    @ApiProperty({ description: '角色名称' })
    name?: string;

    @ApiProperty({ description: '角色描素' })
    description?: string;

    @ApiProperty({ description: '1表示默认角色,0表示非默认角色' })
    isDefault?: number;
}

export class RoleListResDto extends PaginatedDto<RoleResDto>{
    constructor(pageSize: number, pageNum: number, data: RoleResDto[]) {
        super(pageSize, pageNum, data);
    }
}

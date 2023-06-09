import { PaginationDto } from '@/common/dto/pagination.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AccessReqDto extends PaginationDto {
    @ApiPropertyOptional({ required: false, description: '父节点ID' })
    @IsOptional()
    parentId?: number;
}

import { QueryOptionsDto } from '@/utils/shared/dto/query.options.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AccessReqDto extends QueryOptionsDto {
  @ApiPropertyOptional({ required: false, description: '父节点ID' })
  @IsOptional()
  parentId?: number;
}

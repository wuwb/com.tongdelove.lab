import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import moment from 'moment';

export class QueryDto {

    /* 开始日期 */
    @IsOptional()
    @IsString()
    @ApiProperty({
        name: 'query[startTime]',
        // default: moment().format('YYYY-MM-DD'),
    })
    startTime?: string;

    /* 结束日期 */
    @IsOptional()
    @IsString()
    @ApiProperty({
        name: 'query[endTime]',
        // default: moment().format('YYYY-MM-DD'),
    })
    endTime?: string;
}

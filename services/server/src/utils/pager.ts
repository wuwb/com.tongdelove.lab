import { PaginatedDto } from '@/shared/dto/paginated.dto';
import { PaginationDto } from '@/shared/dto/pagination.dto';
import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    Type,
} from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

/**
 * 对分页查询参数进行转换的注解
 */
export const Pageable = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): PaginationDto => {
        const request = ctx.switchToHttp().getRequest();
        const page = parseInt(request.query.limit, 10) || 1;
        const limit = parseInt(request.query.limit, 10) || 10;
        return {
            page,
            limit,
        };
    },
);

/**
 * 分页响应装饰器
 * @param model
 * @returns
 */
export const ApiPagedResponse = <TModel extends Type<any>>(model: TModel) => {
    return applyDecorators(
        ApiOkResponse({
            //   type: Type<PagedDto,
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                    },
                    limit: { type: 'integer' },
                    page: { type: 'integer' },
                    total: { type: 'integer' },
                },
            },
        }),
    );
};

import { PaginatedDto } from '@/common/dto/paginated.dto';
import { PaginationDto } from '@/common/dto/pagination.dto';
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
        const pageNum = parseInt(request.query.pageNum, 10) || 1;
        const pageSize = parseInt(request.query.pageSize, 10) || 10;
        return {
            pageNum,
            pageSize,
        };
    },
);

/**
 * 生成分页数据
 * @param queryPromise
 * @param countAllPromise
 * @param page
 * @returns
 */
export async function pageWrapper<T>(
    queryPromise: () => Promise<T[]>,
    countAllPromise: () => Promise<number>,
    page: Required<PaginationDto>,
): Promise<PaginatedDto<T>> {
    return {
        data: await queryPromise(),
        pageSize: page.pageSize,
        pageNum: page.pageNum,
        total: await countAllPromise(),
    };
}

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
                    pageNum: { type: 'integer' },
                    pageSize: { type: 'integer' },
                    totalCount: { type: 'integer' },
                },
            },
        }),
    );
};

import * as _ from 'underscore';
import { isInt } from 'class-validator';
import { HttpException, HttpStatus } from '@nestjs/common';
import {
    applyDecorators,
    createParamDecorator,
    ExecutionContext,
    Type,
} from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

export class Pager {
    @ApiProperty()
    pageIndex: number;

    @ApiProperty()
    page: number;
}

export class PagedDto<T> {
    pageIndex: number;
    page: number;
    data?: T[];
    totalCount?: number;
}


/**
 * 对分页查询参数进行转换的注解
 */
export const Pageable = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): Pager => {
        const request = ctx.switchToHttp().getRequest();
        const pageIndex = parseInt(request.query.pageIndex, 10) || 1;
        const page = parseInt(request.query.page, 10) || 10;
        return {
            pageIndex,
            page,
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
    page: Pager,
): Promise<PagedDto<T>> {
    return {
        data: await queryPromise(),
        page: page.page,
        pageIndex: page.pageIndex,
        totalCount: await countAllPromise(),
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
                    pageIndex: { type: 'integer' },
                    page: { type: 'integer' },
                    totalCount: { type: 'integer' },
                },
            },
        }),
    );
};


export const getPager = (totalItems, currentPage: number, page: number = 10) => {
    if (page === undefined || page === 0) {
        page = 1;
    }
    if (currentPage === undefined || currentPage === 0) {
        currentPage = 1;
    }
    const totalPages = Math.ceil(totalItems / page);
    let startPage, endPage;
    if (totalPages <= 10) {
        startPage = 1;
        endPage = totalPages;
    }
    else {
        if (currentPage <= 6) {
            startPage = 1;
            endPage = 10;
        }
        else if (currentPage + 4 >= totalPages) {
            startPage = totalPages - 9;
            endPage = totalPages;
        }
        else {
            startPage = currentPage - 5;
            endPage = currentPage + 4;
        }
    }
    const startIndex = (currentPage - 1) * page;
    const endIndex = Math.min(startIndex + page - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);
    return {
        totalItems,
        currentPage,
        page,
        totalPages,
        startPage,
        endPage,
        startIndex,
        endIndex,
        pages
    };
}

/**
 * 校验分页数据
 */
export const checkPage = (limitber: number, page: number): void => {
    if (!isInt(Number(page)) || !isInt(Number(limitber))) {
        throw new HttpException(
            `传递的page:${page},limitber:${limitber}其中一个不是整数`,
            HttpStatus.OK,
        );
    }
}

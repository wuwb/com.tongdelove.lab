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
    pageSize: number;
}

export class PagedDto<T> {
    pageIndex: number;
    pageSize: number;
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
        const pageSize = parseInt(request.query.pageSize, 10) || 10;
        return {
            pageIndex,
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
    page: Pager,
): Promise<PagedDto<T>> {
    return {
        data: await queryPromise(),
        pageSize: page.pageSize,
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
                    pageSize: { type: 'integer' },
                    totalCount: { type: 'integer' },
                },
            },
        }),
    );
};


export const getPager = (totalItems, currentPage: number, pageSize: number = 10) => {
    if (pageSize === undefined || pageSize === 0) {
        pageSize = 1;
    }
    if (currentPage === undefined || currentPage === 0) {
        currentPage = 1;
    }
    const totalPages = Math.ceil(totalItems / pageSize);
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
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    const pages = _.range(startPage, endPage + 1);
    return {
        totalItems,
        currentPage,
        pageSize,
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
export const checkPage = (pageNumber: number, pageSize: number): void => {
    if (!isInt(Number(pageSize)) || !isInt(Number(pageNumber))) {
        throw new HttpException(
            `传递的pageSize:${pageSize},pageNumber:${pageNumber}其中一个不是整数`,
            HttpStatus.OK,
        );
    }
}

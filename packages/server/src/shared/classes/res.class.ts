export class ResOp {
    readonly code: number;
    readonly msg: string;
    [key: string]: any;

    constructor(code: number, message = 'success', data?: any) {
        this.code = code;
        this.msg = message;
        Object.assign(this, data);
    }

    static success(data?: any, msg = '操作成功', code = 200) {
        return new ResOp(code, msg, data);
    }

    static error(msg = '操作失败', code = 500, data?: any) {
        return new ResOp(code, msg, data);
    }
}

export class Pagination {
    total: number;
    page: number;
    size: number;
}

export class PageResult<T> {
    list?: Array<T>;
    pagination: Pagination;
}

import { SetMetadata, HttpStatus } from '@nestjs/common';
import { ResponseMessage } from '@/shared/interfaces/http.interface';
import * as META from '@/common/constants/meta.constant';
import * as TEXT from '@/common/constants/text.constant';
import lodash from 'lodash-es';

// 构造器参数
interface DecoratorBuilderOption {
    errCode?: HttpStatus
    successCode?: HttpStatus
    errMessage?: ResponseMessage
    successMessage?: ResponseMessage
    usePaginate?: boolean
}

// handle 参数
interface HandleOption {
    error?: HttpStatus
    success?: HttpStatus
    message: ResponseMessage
    usePaginate?: boolean
}

type HandleOptionConfig = ResponseMessage | HandleOption

// 构造请求装饰器
const buildHttpDecorator = (options: DecoratorBuilderOption): MethodDecorator => {
    const { errMessage, successMessage, errCode, successCode, usePaginate } = options
    return (_, __, descriptor: PropertyDescriptor) => {
        if (errCode) {
            SetMetadata(META.HTTP_ERROR_CODE, errCode)(descriptor.value)
        }
        if (successCode) {
            SetMetadata(META.HTTP_SUCCESS_CODE, successCode)(descriptor.value)
        }
        if (errMessage) {
            SetMetadata(META.HTTP_ERROR_MESSAGE, errMessage)(descriptor.value)
        }
        if (successMessage) {
            SetMetadata(META.HTTP_SUCCESS_MESSAGE, successMessage)(descriptor.value)
        }
        if (usePaginate) {
            SetMetadata(META.HTTP_RES_TRANSFORM_PAGINATE, true)(descriptor.value)
        }
        return descriptor
    }
}

/**
 * 异常响应装饰器
 * @exports success
 * @example @HTTPDecorators.success('error message', 500)
 */
export const error = (message: ResponseMessage, statusCode?: HttpStatus): MethodDecorator => {
    return buildHttpDecorator({ errMessage: message, errCode: statusCode })
}

/**
 * 成功响应装饰器
 * @exports success
 * @example @HTTPDecorators.success('success message', 200)
 */
export const success = (message: ResponseMessage, statusCode?: HttpStatus): MethodDecorator => {
    return buildHttpDecorator({
        successMessage: message,
        successCode: statusCode,
    })
}

/**
 * 统配构造器
 * @function handle
 * @description 两种用法
 * @example @HTTPDecorators.handle('获取某项数据')
 * @example @HTTPDecorators.handle({ message: '操作', error: error, success: 200, usePaginate: true })
 */
export function handle(args: HandleOptionConfig): MethodDecorator
export function handle(...args) {
    const option = args[0];
    const isOption = (value: HandleOptionConfig): value is HandleOption => lodash.isObject(value);
    const message: ResponseMessage = isOption(option) ? option.message : option;
    const errMessage: ResponseMessage = message + TEXT.HTTP_ERROR_SUFFIX;
    const successMessage: ResponseMessage = message + TEXT.HTTP_SUCCESS_SUFFIX;

    const errCode: HttpStatus | null = isOption(option) ? option.error! : null;
    const successCode: HttpStatus | null = isOption(option) ? option.success! : null;
    const usePaginate: boolean = isOption(option) ? option.usePaginate! : false;

    return buildHttpDecorator({
        errCode: errCode!,
        successCode: successCode!,
        errMessage,
        successMessage,
        usePaginate,
    });
}

export const bypass = (target, key, descriptor: PropertyDescriptor) => {
    SetMetadata(META.RESPONSE_PASSTHROUGH_METADATA, true)(descriptor.value);
}

/**
 * 分页装饰器
 * @exports paginate
 * @example @HTTPDecorators.paginate()
 */
export const paginate = (): MethodDecorator => {
    return buildHttpDecorator({
        usePaginate: true
    });
}

/**
 * 导出的不同模块
 * @exports HTTPDecorators
 * @description { error, success, handle, paginate }
 */
export const HTTPDecorators = {
    error,
    success,
    handle,
    bypass,
    paginate
};

import { MpError } from "../errors/mp.error";

/**
 * 错误捕获装饰器
 * @param params 错误捕获参数
 * @returns 包装好的错误格式或正常的方法调用
 */
export const MpErrorWrapper = (params) => (_target, _propertyKey, descriptor) => {
    // 保存原始方法
    const original = descriptor.value;
    // 获取函数类型
    const type = params?.type || "async"; // 默认方法为异步方法
    switch (type) {
        case "async":
            // 异步方法包装
            descriptor.value = async function () {
                try {
                    // 调用原始方法并返回结果
                    // eslint-disable-next-line prefer-rest-params
                    return await original.apply(this, arguments);
                } catch (error) {
                    // 如果捕获到 MpError 错误，则返回包装好的错误格式
                    if (error instanceof MpError) {
                        return { success: false, error: error.message };
                    }
                    // 否则抛出原始错误
                    throw error;
                }
            };
            break;
        case "sync":
            // 同步方法包装
            descriptor.value = function () {
                try {
                    // 调用原始方法并返回结果
                    // eslint-disable-next-line prefer-rest-params
                    return original.apply(this, arguments);
                } catch (error) {
                    // 如果捕获到 MpError 错误，则返回包装好的错误格式
                    if (error instanceof MpError) {
                        return { success: false, error: error.message };
                    }
                    // 否则抛出原始错误
                    throw error;
                }
            };
            break;
        default:
            // 抛出错误，函数类型无效
            throw new Error('Invalid Function Type');
    }
};

import { WechatPayError } from "../errors/pay.error";

type FunctionType = "async" | "sync";

/**
 * 错误捕获装饰器
 * @param params 错误捕获参数
 * @returns 包装好的错误格式或正常的方法调用
 */
export function WechatPayErrorWrapper(params?: { type?: FunctionType }): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const original = descriptor.value;
        const type = params?.type || "async"; // 默认方法为异步方法
        switch (type) {
            case "async":
                descriptor.value = async function (...args: any[]) {
                    try {
                        return await original.apply(this, args);
                    } catch (error) {
                        if (error.isAxiosError) {
                            const { response } = error;
                            const { data } = response;
                            return { success: false, error: data.message };
                        }
                        if (error instanceof WechatPayError) {
                            return { success: false, error: error.message };
                        }
                        throw error;
                    }
                };
                break;
            case "sync":
                descriptor.value = function (...args: any[]) {
                    try {
                        return original.apply(this, args);
                    } catch (error) {
                        if (error.isAxiosError) {
                            const { response } = error;
                            const { data } = response;
                            return { success: false, error: data.message };
                        }
                        if (error instanceof WechatPayError) {
                            return { success: false, error: error.message };
                        }
                        throw error;
                    }
                };
                break;
            default:
                throw new Error('Invalid Function Type');
        }
    };
}

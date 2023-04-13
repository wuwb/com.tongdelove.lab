/**
 * 检测当前值是否为Promise对象
 * @param promise 待检测的值
 */
export function isPromise(promise: any): promise is PromiseLike<any> {
    return !!promise && promise instanceof Promise;
}
/**
 * 检测当前函数是否为异步函数
 * @param callback 待检测函数
 */
export function isAsyncFn<R, A extends Array<any>>(
    callback: (...asgs: A) => Promise<R> | R,
): callback is (...asgs: A) => Promise<R> {
    const AsyncFunction = (async () => { }).constructor;
    return callback instanceof AsyncFunction === true;
}


/**
 * 检测当前路径是否为一个URL
 * @param path 路径(字符串)
 */
export const isUrl = (path: string): boolean => {
    if (!path.startsWith('http')) {
        return false;
    }
    try {
        const url = new URL(path);
        return !!url;
    } catch (error) {
        return false;
    }
};

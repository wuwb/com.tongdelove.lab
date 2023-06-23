
/**
 * get 请求参数处理
 * @param object query 请求参数
 * @param exclude 需要排除的字段
 * @returns
 */
export const objectToQueryString = (object: Record<string, any>, exclude: string[] = []): string => {
    let str = Object.keys(object)
        .filter(key => !exclude.includes(key))
        .map(key => {
            return encodeURIComponent(key) + '=' + encodeURIComponent(object[key]);
        })
        .join('&');
    if (str) str = '?' + str;
    return str || '';
}

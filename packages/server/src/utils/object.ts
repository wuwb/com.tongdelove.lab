


/**
 * 自身属性中是否具有指定的属性（也就是是否有指定的键）
 */
export const hasOwnProperty = (obj: object, property: string) => Object.prototype.hasOwnProperty.call(obj, property);


/**
 * 简单取交集
 *
 * @param {Array<string | number>} source 源数据
 * @param {Array<string | number>} comparison 对比的数据
 *
 * @returns {Array<string | number>}
 */
export const intersection = (source: (string | number)[], comparison: (string | number)[]) => {
    return comparison.filter(item => source.includes(item));
}

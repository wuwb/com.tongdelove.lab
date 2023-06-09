


export const isType = <T>(type: string) => (value: any): value is T => (
    value !== null && Object.prototype.toString.call(value) === `[object ${type}]`
);

export const isFn = isType<(...args: any[]) => any>('Function');

// eslint-disable-next-line @typescript-eslint/unbound-method
export const isArr = Array.isArray || isType<unknown[]>('Array');

export const isObj = isType<object>('Object');

export const isStr = isType<string>('String');

export const isNum = isType<number>('Number');

export const isEmpty = (value: any) => value === null || value === undefined

export const isEmptyByAllTypes = (value: any): boolean => {
    return isEmpty(value) ||
        value === '' ||
        Number.isNaN(value) ||
        value === 0 ||
        (
            isObj(value)
                ? !Object.keys(value).length
                : isArr(value)
                    ? !value.length
                    : false
        );
}

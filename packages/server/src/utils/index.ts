export * from './date';
export * from './data-type';
export * from './url';
export * from './map';
export * from './viewfilter';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isDev = process.env.NODE_ENV === 'development';

/**
 * 生成一个随机的值
 */
export const generateRandomValue = (
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
): string => {
    return '';
}


/**
 * 生成一个 uuid
 */
export function generateUUID(): string {
    return '';
}

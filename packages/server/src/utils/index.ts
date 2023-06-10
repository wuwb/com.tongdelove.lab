export * from './date';
export * from './data-type';
export * from './url';
export * from './map';
export * from './viewfilter';


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

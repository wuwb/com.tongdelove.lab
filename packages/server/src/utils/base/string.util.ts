import * as uuid from 'uuid'

export const generateStr = (): string => {
    return uuid.v4().replace(/\-/g, '')
}

/**
 * 生成一个 uuid
 */
export function generateUUID(): string {
    return uuid.v4();
}

/**
 * 生成一个随机的字符串
 */
export const generateRandomValue = (
    length: number,
    placeholder = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'
): string => {
    return '';
}

export const isBlank = (str: string) => {
    return typeof str === 'undefined' || str === '';
}

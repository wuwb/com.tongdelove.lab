const REG_SEP = /&/;
const REG_PLUS = /\+/g;

const hasOwnProperty = Object.prototype.hasOwnProperty;

function returnVal<T>(val: T): T {
    return val;
}

export type ParseValueType = string | null;
export type StringifyValueType = ParseValueType | number | undefined;

/**
 * Parse query string.
 * @param string
 * @param [shouldDecode=true]
 */
export function parse(string?: string, shouldDecode: boolean = true): Record<string, ParseValueType | ParseValueType[]> {
    const query: Record<string, ParseValueType | ParseValueType[]> = {};

    if (!string) {
        return query;
    }

    string = string.trim();

    if (string[0] === '?' || string[0] === '#') {
        string = string.slice(1);
    }

    const queryArray = string.split(REG_SEP);
    const decode = shouldDecode ? decodeURIComponent : returnVal;

    for (let item of queryArray) {
        item = item.replace(REG_PLUS, '%20');

        if (item.length === 0) {
            continue;
        }

        const eqIndex = item.indexOf('=');
        let key, value;

        if (eqIndex < 0) {
            key = item;
            value = null;
        } else {
            key = item.slice(0, eqIndex);
            value = item.slice(eqIndex + 1);
        }

        key = decode(key);
        if (value !== null) {
            value = decode(value);
        }

        const prev = query[key];

        if (typeof prev === 'undefined' || !hasOwnProperty.call(query, key)) {
            query[key] = value;
        } else if (Array.isArray(prev)) {
            prev.push(value);
        } else {
            query[key] = [prev, value];
        }
    }

    return query;
}

/**
 * Stringify a query object.
 * @param query
 * @param [shouldEncode=true]
 */
export function stringify(query?: Record<string, StringifyValueType | StringifyValueType[]>, shouldEncode: boolean = true) {
    if (!query) {
        return '';
    }

    const encode = shouldEncode ? encodeURIComponent : returnVal;

    function stringifyKV(key: string, value: StringifyValueType) {
        if (typeof value === 'undefined') {
            return '';
        }

        if (value === null) {
            return key;
        }

        if (typeof value === 'string') {
            value = encode(value);
        }

        return `${key}=${value}`;
    }

    return Object.keys(query).map((key) => {
        const value = query[key];
        key = encode(key);

        if (Array.isArray(value)) {
            return value
                .map((item) => stringifyKV(key, item))
                .filter(Boolean)
                .join('&');
        }

        return stringifyKV(key, value);
    }).filter(Boolean).join('&');
}

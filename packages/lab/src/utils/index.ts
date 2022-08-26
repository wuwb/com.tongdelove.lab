export * from './env';

export const getDNSPrefetchValue = (domain: string): string | null => {
    if (!domain) return null;
    if (domain.startsWith('http')) return domain.replace(/https?:/, '');
    if (domain.startsWith('//')) return domain;
    return `//${domain}`;
}

export const trim = (str) => {
    if (!str) {
        return '';
    }
    return str.replace(/^\s+|\s+$/g, '');
};

export const replaceIgnoreCase = (str, substr, replacement) => {
    if (!str) {
        return '';
    }
    return str.replace(substr, replacement);
};

export const ossResponseParse = (res, uploadImgURL) => {
    let xmlDOM = (new DOMParser()).parseFromString(res, 'text/xml');
    let PostResponseArr = xmlDOM.getElementsByTagName('PostResponse');
    if (PostResponseArr && PostResponseArr.length) {
        const PostResponse = PostResponseArr[0];
        const KeyArr = PostResponse.getElementsByTagName('Key');
        if (KeyArr && KeyArr[0]) {
            return {
                path: KeyArr[0].innerHTML,
                url: uploadImgURL + '/' + KeyArr[0].innerHTML
            };
        }
    }
    return {};
};

export const countToK = (count) => {
    if (!count) {
        return 0;
    }
    if (count < 1000) {
        return count;
    }
    let k = count / 100;
    k = (parseInt(k) + Math.ceil(k - parseInt(k))) / 10;
    return k;
};

export const readDuration = (wordCount) => {
    return parseInt((wordCount / 300 * 60), 10) + '分钟';
};

export const displayPrice = (price) => {
    return (price / 100).toFixed(2);
};


/**
 * 字符串隐藏中间部分
 */
export function elipID(id: string, size = 6) {
    if (id && id.length > size * 2) {
        return `${id.substr(0, size)}...${id.substr(id.length - size, id.length)}`
    }
    return id
}



export const chunkArr = <T>(arr: Array<T>, chunkSize: number) => {
    const chunked = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        chunked.push(arr.slice(i, i + chunkSize));
    }
    return chunked;
  };

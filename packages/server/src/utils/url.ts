import * as url from 'url';
import { Request } from 'express';
import { IncomingMessage } from 'http'
import { URL } from 'url'

export const getIp = (request: Request | IncomingMessage) => {
  const req = request as any

  let ip: string =
    request.headers['x-forwarded-for'] ||
    request.headers['X-Forwarded-For'] ||
    request.headers['X-Real-IP'] ||
    request.headers['x-real-ip'] ||
    req?.ip ||
    req?.raw?.connection?.remoteAddress ||
    req?.raw?.socket?.remoteAddress ||
    undefined
  if (ip && ip.split(',').length > 0) {
    ip = ip.split(',')[0] as string;
  }
  return ip
}

export const parseRelativeUrl = (path: string) => {
  if (!path || !path.startsWith('/')) {
    return new URL('http://a.com')
  }
  return new URL(`http://a.com${path}`)
}

/**
 * 根据key从一段url中获取query值
 * @param {string} urlPath url地址
 * @param {string} key 获取单独的一个key
 * @return {*}
 */
export const getUrlQuery = (urlPath: string, key?: string): string | object | undefined => {
  const query = url.parse(urlPath, true).query;
  if (key) {
    return query[key];
  } else {
    return query;
  }
};

export const getUrlQuery2 = (urlPath: string, key: string): string | null => {
  const theUrl = new url.URL(urlPath, 'https://www.');
  const params = new URLSearchParams(theUrl.search.substring(1));
  return params.get(key);
};

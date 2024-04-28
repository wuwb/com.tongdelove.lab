import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import * as fs from 'fs';
import { cloneDeep } from 'lodash-es';
import * as path from 'path';
import pathToRegexp from 'path-to-regexp';
import store from 'store';
// 常量先放在这里
// 包括页面链接，打点字段

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return;
  }
  return array.find((_) => _[key] === value);
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id: string = 'id',
  parentId: string = 'pid',
  children: string = 'children',
): any[] {
  const result = [];
  const hash = {};
  const data = cloneDeep(array);

  data.forEach((item, index: number) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach((item) => {
    const hashParent = hash[item[parentId]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

/**
 * In an array object, traverse all parent IDs based on the value of an object.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the value of the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryPathKeys(array, current, parentId, id = 'id') {
  const result = [current];
  const hashMap = new Map();
  array.forEach((item) => hashMap.set(item[id], item));

  const getPath = (current) => {
    const currentParentId = hashMap.get(current)[parentId];
    if (currentParentId) {
      result.push(currentParentId);
      getPath(currentParentId);
    }
  };

  getPath(current);
  return result;
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array, current, parentId, id = 'id') {
  const result = [current];
  const hashMap = new Map();
  array.forEach((item) => hashMap.set(item[id], item));

  const getPath = (current) => {
    const currentParentId = hashMap.get(current[id])[parentId];
    if (currentParentId) {
      result.push(hashMap.get(currentParentId));
      getPath(hashMap.get(currentParentId));
    }
  };

  getPath(current);
  return result;
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public';

  const isMatch = (regepx) => {
    return regepx instanceof RegExp ? regepx.test(pathname) : pathToRegexp(regepx).exec(pathname);
  };

  for (const item of layouts) {
    let include = false;
    let exclude = false;
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true;
          break;
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true;
          break;
        }
      }
    }

    if (include && !exclude) {
      result = item.name;
      break;
    }
  }

  return result;
}

export function getLocale() {
  return store.get('locale') || defaultLanguage;
}

export function setLocale(language: string) {
  if (getLocale() !== language) {
    dayjs.locale(language === 'zh' ? 'zh-cn' : language);
    store.set('locale', language);
    window.location.reload();
  }
}

export function getPackageJson() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../../package.json'), 'utf-8'));
}

export function isBrowser() {
  const isServer = typeof window === 'undefined';
  return !isServer;
}

/**
 * 频率控制函数， fn执行次数不超过 1 次/delay
 * @param fn{Function}     传入的函数
 * @param delay{Number}    时间间隔
 * @param options{Object}  如果想忽略开始边界上的调用则传入 {leading:false},
 *                         如果想忽略结束边界上的调用则传入 {trailing:false},
 * @returns {Function}     返回调用函数
 */
type throttleOptions = {
  leading?: boolean;
  trailing?: boolean;
};
export function throttle(fn, delay: number, options: throttleOptions = {}) {
  let wait = false;
  return function () {
    const args = arguments;
    if (!wait) {
      if (!(options.leading === false)) {
        fn.apply(throttle, args);
      }
      wait = true;
      setTimeout(() => {
        if (!(options.trailing === false)) {
          fn.apply(throttle, args);
        }
        wait = false;
      }, delay);
    }
  };
}

/**
 * debunce
 * @param fn{Function}     传入的函数
 * @param delay{Number}    时间间隔
 * @returns {Function}     返回调用函数
 */
export function debunce(fn, delay: number = 1000) {
  let timer;
  return function () {
    if (timer) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn.apply(debunce, arguments);
      }, delay);
    } else {
      timer = setTimeout(() => {
        fn.apply(debunce, arguments);
      }, delay);
    }
  };
}

export function trim(str: string) {
  return str.replace(/(^\s*)|(\s*$)/g, '');
}

import { parse } from 'querystring';

// eslint-disable-next-line
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => {
  const { href } = window.location;
  const qsIndex = href.indexOf('?');
  const sharpIndex = href.indexOf('#');

  if (qsIndex !== -1) {
    if (qsIndex > sharpIndex) {
      return parse(href.split('?')[1]);
    }

    return parse(href.slice(qsIndex + 1, sharpIndex));
  }

  return {};
};

/**
 * 树转数组
 * @param tree 树结构数组, 子级数组字段名，如children
 * TODO: 未完成功能
 */
export const treeTransArray = (tree: any[], parentId = ''): any[] => {
  return tree.reduce(
    (arr, { children = [], ...item }) =>
      arr.concat([{ ...item, parentId }], treeTransArray(children as any[], item.id)),
    [],
  );
};

/**
 * 数组转树
 * @param list 一纬数组
 * @param key 父级 ID 字段名称，如 parentId
 */
export const arrayTransTree = (list: any[], key: string) => {
  const tree = list.filter((parent: any) => {
    const branchArr = list.filter((child) => {
      return parent.id === child[key];
    });
    // eslint-disable-next-line no-param-reassign
    parent.children = [];
    if (branchArr.length > 0) {
      // eslint-disable-next-line no-param-reassign
      parent.children = branchArr;
    }
    return parent[key] === '' || parent[key] === '-1';
  });
  return tree;
};

const utils = {}

export default utils

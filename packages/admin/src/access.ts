/**
 * 权限配置
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * https://beta-pro.ant.design/docs/upgrade-v5-cn
 */
import { InitialState } from '@umijs/max';

export default function access(initialState: { currentUser?: API.CurrentUser } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    readArticle: initialState.name === 'haha',
    canAdmin: currentUser && currentUser.access === 'admin',
    canReadFoo: true,
    canUpdateFoo: () => true,
    canDeleteFoo: (data) => data?.status < 1, // 按业务需求自己任意定义鉴权函数
  };
}

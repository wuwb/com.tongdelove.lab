import { Settings as LayoutSettings, ProLayoutProps } from '@ant-design/pro-components';
import { RuntimeConfig } from '@umijs/max';
/**
 * @name
 */
export const defaultSettings: RuntimeConfig['layout'] & {
  pwa?: boolean;
  logo?: string;
} = (initData) => {
  return {
    // 设置标题的 title

    navTheme: 'light',
    // 拂晓蓝
    colorPrimary: '#1890ff', // 2f54eb
    layout: 'mix', // sidemenu, mix, side
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    pwa: false,

    name: '印红包装',
    // 修改右上角的 logo
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',

    iconfontUrl: '',
    token: {
      // 参见ts声明，demo 见文档，通过token 修改样式
      //https://procomponents.ant.design/components/layout#%E9%80%9A%E8%BF%87-token-%E4%BF%AE%E6%94%B9%E6%A0%B7%E5%BC%8F
    },

    // custom
    menu: {
      locale: true,
    },
    headerHeight: 48,
    splitMenus: false,
  }
};


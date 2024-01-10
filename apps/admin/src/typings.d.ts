declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';
declare module '*.pdf';

declare module 'antd/dist/default-theme';
declare module 'antd/dist/theme';
declare module 'dequal' {
  function dequal(foo: any, bar: any): boolean;
}

// preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
declare let ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: 'site' | undefined;

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

// google analytics interface
interface GAFieldsObject {
  eventCategory: string;
  eventAction: string;
  eventLabel?: string;
  eventValue?: number;
  nonInteraction?: boolean;
}
interface Window {
  ga: (
    command: 'send',
    hitType: 'event' | 'pageview',
    fieldsObject: GAFieldsObject | string,
  ) => void;
  reloadAuthorized: () => void;
}

declare let ga: Function;

/* eslint-disable @typescript-eslint/ban-types */
/**
 * 获取数组中元素的类型
 */
declare type ArrayItem<A> = A extends readonly (infer T)[] ? T : never;

/**
 * 过滤类型,去除U中T不包含的类型
 */
declare type Filter<T, U> = T extends U ? T : never;

/**
 * 反向过滤类型,去除U中T包含的类型
 */
declare type Diff<T, U> = T extends U ? never : T;

/**
 * 获取一个对象的值类型
 */
declare type ValueOf<T> = T[keyof T];

/**
 * React组件简写
 */
declare type FC<P = {}> = React.FunctionComponent<P>;

/**
 * 获取一个React组件的props类型
 */
declare type ReactProps<T> = T extends FC<infer C> ? C : never;

declare type RePartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[] | undefined
    ? RePartial<U>[]
    : T[P] extends object | undefined
    ? T[P] extends ((...args: any[]) => any) | ClassType<T[P]> | undefined
      ? T[P]
      : RePartial<T[P]>
    : T[P];
};

declare type ReRequired<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[] | undefined
    ? ReRequired<U>[]
    : T[P] extends object | undefined
    ? T[P] extends ((...args: any[]) => any) | ClassType<T[P]> | undefined
      ? T[P]
      : ReRequired<T[P]>
    : T[P];
};

declare type RecordAny = Record<string, any>;
declare type RecordNever = Record<never, never>;
declare type RecordAnyOrNever = RecordAny | RecordNever;
declare type RecordScalable<T extends RecordAny, U extends RecordAnyOrNever> = T &
  (U extends Record<string, never> ? RecordNever : U);

/**
 * 一个类的类型
 */
declare type ClassInstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : never;
declare type ClassType<T> = { new (...args: any[]): T };
declare type ObjectType<T> = ClassType<T> | ((...args: any[]) => any);

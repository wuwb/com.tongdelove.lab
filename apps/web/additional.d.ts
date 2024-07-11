import React from 'react'

// Declarations for modules without types
declare module 'next-themes'
declare module 'swell-js'
declare module 'koa-monitor';
declare module 'safestart';
declare module 'socket.io-redis';
declare module 'socketio-auth';
declare module 'enquire-js';

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
}

declare module 'react' {
  interface MetaHTMLAttributes<T> extends React.MetaHTMLAttributes<T> {
    itemprop?: string
  }
}

declare module NodeJS  {
  interface Global {
      handle: any
  }
}

declare global {
  declare module 'react' {
    interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
      jsx?: boolean;
      global?: boolean;
    }
  }
  interface Window {
    mixpanel: any;
  }
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
// global.d.ts
declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

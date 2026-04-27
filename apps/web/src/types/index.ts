import React from 'react'

// Declarations for modules without types
declare module 'next-themes'

// declare module 'react' {
//   interface MetaHTMLAttributes<T> extends React.MetaHTMLAttributes<T> {
//     itemprop?: string
//   }
// }

declare module NodeJS {
  interface Global {
    handle: any
  }
}

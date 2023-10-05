import React from 'react';
import { NextPage, GetStaticProps } from 'next';
import type { AppProps } from 'next/app';

export type WithChildren = {
  children?: ReactNode;
};

export type NextPageWithLayout<P = any, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

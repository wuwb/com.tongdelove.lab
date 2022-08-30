import React from 'react';
import { NextPage, GetStaticProps } from 'next';

export type WithChildren = {
  children?: ReactNode;
};

export type WithGetLayout = {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

export type MyNextPage<P = {}, IP = P> = NextPage & WithGetLayout;

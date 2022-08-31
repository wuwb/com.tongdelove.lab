import { FC } from 'react';
import { NextPage, GetStaticProps } from 'next';
import { MyNextPage } from '@/types/app';

import { AccentSidebarLayout } from '@/components/layouts';

const DashboardPage: FC = () => {
  return (
    <>
      <div>123</div>
    </>
  );
}

const DashboardWrapper: MyNextPage = () => {
  return (
    <>
      <DashboardPage />
    </>
  );
}

DashboardWrapper.getLayout = function getLayout(page: JSX.Element) {
  return <AccentSidebarLayout>{page}</AccentSidebarLayout>;
};

export default DashboardWrapper;

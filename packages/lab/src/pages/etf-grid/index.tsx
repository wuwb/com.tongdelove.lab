import * as React from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppContext, reducer, initialState } from '@/services/store';
import { Breadcrumb } from '@/components/ui';
import { Settings } from '@/content/ETFGrid/Settings';
import { Grids } from '@/content/ETFGrid/Grids';
import { DefaultLayout } from '@/components/layouts';
import type { NextPageWithLayout } from '@/types/app';

const App: NextPageWithLayout = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="box container mx-auto max-w-screen-lg px-4">
      <header>
        <h1 className="mb-8">{t<string>('etf.grid.title')}</h1>
        <Breadcrumb />
      </header>
      <main>
        <AppContext.Provider value={{ state, dispatch }}>
          <Settings />
          <Grids />
        </AppContext.Provider>
      </main>
    </div>
  );
};

App.getLayout = function getLayout(page: JSX.Element) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default App;

// export const getServerProps = async ({ locale = 'zh' }) => {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// };

import { Grids } from '@/content/ETFGrid/Grids';
import { Settings } from '@/content/ETFGrid/Settings';
import { AppContext, initialState, reducer } from '@/server/store';
import type { NextPageWithLayout } from '@/types/app';
// import { useTranslation } from 'next-i18next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import * as React from 'react';

const App: NextPageWithLayout = () => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const router = useRouter();
  // const { t } = useTranslation();

  return (
    <div className="box container mx-auto max-w-screen-lg px-4">
      <div id="header">
        <h1 className="mb-8">ETF</h1>
      </div>
      <main>
        <AppContext.Provider value={{ state, dispatch }}>
          <Settings />
          <Grids />
        </AppContext.Provider>
      </main>
    </div>
  );
};

export default App;

// export async function getStaticProps({ locale }) {
//   return {
//     props: {
//       ...(await serverSideTranslations(locale, ['common'])),
//     },
//   };
// }

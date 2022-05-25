import * as React from 'react';
import { useRouter } from 'next/router';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppContext, reducer, initialState } from '@/common/store';
import { Breadcrumb } from '@/components/ui';
import { Settings } from '@/content/ETFGrid/Settings';
import { Grids } from '@/content/ETFGrid/Grids';

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className="p-2 box max-w-screen-lg mx-auto">
      <header>
        <h1 className="mb-8">
          {t('etf-grid-title')}
        </h1>
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
}

export default App;

export async function getServerSideProps({ locale, defaultLocale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  }
}

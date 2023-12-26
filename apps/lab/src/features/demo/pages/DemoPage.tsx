import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { MainLayout } from '@/layouts/main';
import { DemoMuiBlock, Jumbotron, PoetryBlock } from '../blocks';
import { demoConfig } from '../demo.config';

export const DemoPage: FC = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces);

  return (
    <>
      <MainLayout>
        <ul className="p-10">
          <li>
          </li>
          <li>
          </li>
        </ul>
        <div className={'pt-8'} />
        <DemoMuiBlock />
        <div className={'pt-8'} />
        <PoetryBlock />
      </MainLayout>
    </>
  );
};

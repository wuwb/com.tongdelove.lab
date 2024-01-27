import { useTranslation } from 'next-i18next';
import type { FC } from 'react';
import { MainLayout } from '@/layouts/main';
import { Jumbotron } from '../blocks';
import { demoConfig } from '../demo.config';

export const DemoPage: FC = () => {
  const { t } = useTranslation(demoConfig.i18nNamespaces);

  return (
    <MainLayout>
      <Jumbotron />
    </MainLayout>
  );
};

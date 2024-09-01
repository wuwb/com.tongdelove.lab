import type { FC } from 'react'
import { MainLayout } from '@/layouts/main'
import { Jumbotron } from '../blocks'
import { useTranslation } from '@/i18n'

export const DemoPage: FC = () => {
  const { t } = useTranslation()

  return (
    <MainLayout>
      <Jumbotron />
    </MainLayout>
  )
}

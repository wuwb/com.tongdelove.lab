import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { adminConfig } from '@/components/admin/admin.config'
import { AdminLayout } from '@/components/Layout/components/AdminLayout'
import { useTranslation } from '@/i18n'

export const AdminMainPage: FC = () => {
  const { t } = useTranslation()
  return (
    <>
      <NextSeo title={t('admin:page.title')} nofollow={true} noindex={true} />
      <AdminLayout>
        <h1>This page is protected by Middleware</h1>
        <p>Only admin users can see this page.</p>
      </AdminLayout>
    </>
  )
}

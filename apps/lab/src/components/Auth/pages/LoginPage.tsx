import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { LoginForm } from '@/components/auth/components/LoginForm'
import { useTranslation } from '@/i18n'

export const LoginPage: FC = () => {
  const { t } = useTranslation()
  const redirectToPage = '/admin'

  return (
    <>
      <NextSeo title={t('auth:page.title')} />
      <div className="flex h-screen items-center justify-center">
        <LoginForm redirectToPage={redirectToPage} />
      </div>
    </>
  )
}

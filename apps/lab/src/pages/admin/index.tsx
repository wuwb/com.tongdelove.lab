import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { getServerTranslations } from '@/server/backend/i18n/getServerTranslations'
import { adminConfig } from '@/features/admin/admin.config'
import { AdminMainPage } from '@/features/admin/pages'

type Props = {
  /** Add props here */
}

export const getStaticProps: GetStaticProps<Props> = async context => {
  const { locale = 'en' } = context
  if (locale === undefined) {
    throw new Error('locale is missing')
  }
  const { i18nNamespaces } = adminConfig
  return {
    props: {
      ...(await getServerTranslations(locale, i18nNamespaces)),
    },
    // revalidate: 60,
  }
}

export default function AdminRoute(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  return <AdminMainPage />
}

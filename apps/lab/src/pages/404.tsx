import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { getServerTranslations } from '@/server/backend/i18n/getServerTranslations'
import { NotFoundPage } from '@/features/system/pages'
import { systemConfig } from '@/features/system/system.config'
import { Button } from '@mantine/core'
import Image from 'next/image'
import React from 'react'
import { useTranslation } from 'next-i18next'

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { locale = 'en' } = context

  const inlinedTranslation = await getServerTranslations(locale, systemConfig.i18nNamespaces)

  return {
    props: {
      locale: locale,
      ...inlinedTranslation,
    },
  }
}

export default function Custom404(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t }: { t: any } = useTranslation()

  return (
    <>
      <NotFoundPage />;
      <div className="flex h-full flex-1 flex-col">
        <div className="align-center flex w-full flex-1 justify-center p-6">
          <div>
            <div className="text-center">
              <Image alt="404" height={180} width={180} src="/images/status/404.svg" />
              <h2>{/* {t("The page you were looking for doesn't exist.")} */}</h2>
              <h4>{/* {t("It's on us, we moved the content to a different page. The search below should help!")} */}</h4>
            </div>
            <div className="bg-white">
              <div className="mt-3 p-4 text-center">
                <div>
                  <Button variant="contained" size="small">
                    {t('Search')}
                  </Button>
                </div>
                <Button>{/* {t('Go to homepage')} */}</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import Head from 'next/head'
import type { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import { systemConfig } from '@/components/system/system.config'

type Props = {
  title?: string
  children?: never
}

export const NotFoundPage: FC<Props> = (props) => {
  const { t } = useTranslation()

  const title = props.title ?? t('system:notFound.title')

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-white">
        <h1
          data-testid="not-found-title"
          className="text-5xl text-black md:text-4xl lg:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-5 text-center text-xl no-underline hover:underline">
          <Link href="/">{t('system:links.backToHome')}</Link>
        </p>
      </div>
    </>
  )
}

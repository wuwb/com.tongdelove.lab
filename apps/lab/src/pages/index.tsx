import { trpc } from '@/utils/trpc'
import { Container } from '@/components/common'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getServerTranslations } from '@/server/backend/i18n/getServerTranslations'
import { homeConfig } from '@/components/HomePage/home.config'
import { HomePage } from '@/components/HomePage/pages'
import { NextSeo } from 'next-seo'
import { Toaster } from '@/components/StickerPage/components/sonner'
import type { Metadata } from 'next'
import { useTranslation } from '@/i18n'

type IndexProps = {}

const Index = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  console.log('session: ', session)

  // const { data: hello, isLoading } = trpc.example.hello.useQuery({
  //   text: 'from tRPC',
  // })
  // const { data: secretMessage } = trpc.example.getSecretMessage.useQuery()

  // const { data: links = [] } = trpc.link.getLinks.useQuery()

  // console.log('links: ', links)

  return (
    <>
      <NextSeo
        title={t('AI Animal Sticker Generator - Printlake Lab')}
        description={t(`Discover the fun and creativity of our AI Sticker Generator! Transform your ideas into unique, custom stickers effortlessly. With our advanced AI technology, you can create personalized stickers for any occasion. Whether it's for personal use or to enhance your brand, our platform offers endless possibilities. Get started today and bring your concepts to life!`)}
      />
      <HomePage />
      <Toaster richColors />
    </>
  )
}

export default Index

export const getServerSideProps: GetServerSideProps<IndexProps> = async (
  context
) => {
  const { locale = 'en' } = context

  if (locale === undefined) {
    throw new Error('locale is missing')
  }

  const { i18nNamespaces } = homeConfig
  return {
    props: {
      ...(await getServerTranslations(locale, i18nNamespaces)),
    },
  }
}

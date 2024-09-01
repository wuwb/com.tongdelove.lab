import { trpc } from '@/utils/trpc'
import { Container } from '@/components/common'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import Head from 'next/head'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { HomePage } from '@/components/HomePage/pages'
import { NextSeo } from 'next-seo'
import { Toaster } from '@/components/StickerPage/components/sonner'
import type { Metadata } from 'next'
import { useTranslation } from '@/i18n'
import { StickerExplorePage } from '@/components/StickerExplorePage/index'
import { HeaderMegaMenu } from '@/components/Layout/components/BaseLayout/Header'
import { PageContainer } from '@/components/Layout/PageContainer'

type StickerExploreProps = {}

const StickerExplore = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  console.log('session: ', session)

  return (
    <>
      <NextSeo
        title={t('AI Animal Sticker Generator - Printlake Lab')}
        description={t(
          `Discover the fun and creativity of our AI Sticker Generator! Transform your ideas into unique, custom stickers effortlessly. With our advanced AI technology, you can create personalized stickers for any occasion. Whether it's for personal use or to enhance your brand, our platform offers endless possibilities. Get started today and bring your concepts to life!`
        )}
      />
      <PageContainer>
        <HeaderMegaMenu />
        <StickerExplorePage />
      </PageContainer>
      <Toaster richColors />
    </>
  )
}

export default StickerExplore

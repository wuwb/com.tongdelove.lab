import { useSession } from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { HomePage } from '@/components/HomePage/pages'
import { NextSeo } from 'next-seo'
import { Toaster } from '@/components/StickerPage/components/sonner'
import { useTranslation } from '@/i18n'

type IndexProps = {}

const Index = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
    <>
      <NextSeo
        title={t('AI Animal Sticker Generator - Printlake Lab')}
        description={t(
          `Discover the fun and creativity of our AI Sticker Generator! Transform your ideas into unique, custom stickers effortlessly. With our advanced AI technology, you can create personalized stickers for any occasion. Whether it's for personal use or to enhance your brand, our platform offers endless possibilities. Get started today and bring your concepts to life!`
        )}
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

  return {
    props: {},
  }
}

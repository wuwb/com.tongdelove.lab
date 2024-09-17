import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { Toaster } from '@/components/StickerPage/components/sonner'
import { useTranslation } from '@/i18n'
import { MyStickersPage } from '@/components/MyStickersPage/index'
import { HeaderMegaMenu } from '@/components/Layout/components/BaseLayout/Header'
import { PageContainer } from '@/components/Layout/PageContainer'
import { buildSharedServerSideProps } from '@/server/common/factory'

const MyStickers = () => {
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
      <PageContainer>
        <HeaderMegaMenu />
        <MyStickersPage />
      </PageContainer>
      <Toaster richColors />
    </>
  )
}

export default MyStickers

export const getServerSideProps = buildSharedServerSideProps(async () => {
  return {
    props: {},
  }
})

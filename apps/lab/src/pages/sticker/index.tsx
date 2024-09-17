import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { StickerPage } from '@/components/StickerPage/index'
import { NextSeo } from 'next-seo'
import { Toaster } from '@/components/StickerPage/components/sonner'
import { useTranslation } from '@/i18n'
import { buildSharedServerSideProps } from '@/server/common/factory'

type StickerProps = {}

const Sticker = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t('AI Animal Sticker Generator - Printlake Lab')}
        description={t(
          `Discover the fun and creativity of our AI Sticker Generator! Transform your ideas into unique, custom stickers effortlessly. With our advanced AI technology, you can create personalized stickers for any occasion. Whether it's for personal use or to enhance your brand, our platform offers endless possibilities. Get started today and bring your concepts to life!`
        )}
      />
      <StickerPage />
      <Toaster richColors />
    </>
  )
}

export default Sticker

export const getServerSideProps = buildSharedServerSideProps<StickerProps>(
  async () => {
    try {
      return {
        props: {},
      }
    } catch (error) {
      console.error('Error fetching carousels:', error)
      return {
        props: {},
      }
    }
  }
)

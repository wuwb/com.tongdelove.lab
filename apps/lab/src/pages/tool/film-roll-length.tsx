import { useTranslation } from '@/i18n'
import { NextSeo } from 'next-seo'
import { FilmRollLengthPage } from '@/components/Tool/FilmRollLengthPage'
import { buildSharedServerSideProps } from '@/server/common/factory'

const FilmRollLength = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t('AI Animal Sticker Generator - Printlake Lab')}
        description={t(
          `Discover the fun and creativity of our AI Sticker Generator! Transform your ideas into unique, custom stickers effortlessly. With our advanced AI technology, you can create personalized stickers for any occasion. Whether it's for personal use or to enhance your brand, our platform offers endless possibilities. Get started today and bring your concepts to life!`
        )}
      />
      <FilmRollLengthPage />
    </>
  )
}

export default FilmRollLength

export const getServerSideProps = buildSharedServerSideProps(async () => {
  try {
    return {
      props: {},
    }
  } catch (error) {
    return {
      props: {},
    }
  }
})

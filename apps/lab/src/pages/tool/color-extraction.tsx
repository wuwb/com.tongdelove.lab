import React from 'react'
import { ColorExtractionPage } from '@/components/Tool/ColorExtractionPage'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'

const ColorExtraction = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t('AI Animal Sticker Generator - Printlake Lab')}
        description={t(
          `Discover the fun and creativity of our AI Sticker Generator! Transform your ideas into unique, custom stickers effortlessly. With our advanced AI technology, you can create personalized stickers for any occasion. Whether it's for personal use or to enhance your brand, our platform offers endless possibilities. Get started today and bring your concepts to life!`
        )}
      />
      <ColorExtractionPage />
    </>
  )
}

export default ColorExtraction

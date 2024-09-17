import React from 'react'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'

const Custom500 = () => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t(
          'Multi-Tool Online Toolkit - Solve Everyday Tasks Quickly and Efficiently - Printlake Lab'
        )}
        description={t(
          "Welcome to our online multi-tool hub, offering a range of free utilities from encoding and decoding, image editing to unit conversions. Whether you're a student, developer, or professional, our tools are designed to enhance your productivity. Experience user-friendly design combined with powerful functionality – try it out now!"
        )}
      />
      <h1>500 - Server-side error occurred</h1>
    </>
  )
}

export default Custom500

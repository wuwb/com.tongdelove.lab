'use client'

import { useSession } from 'next-auth/react'
import { MapPage } from './MapPage'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'

type MapProps = {}

const Map = () => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
    <>
      <NextSeo title={t('行万里路 - Printlake Lab')} description="" />
      <MapPage />
    </>
  )
}

export default Map


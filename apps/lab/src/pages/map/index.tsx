import { useSession } from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { MapPage } from '@/components/MapPage/index'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'

type MapProps = {}

const Map = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
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

export const getServerSideProps: GetServerSideProps<MapProps> = async (
  context
) => {
  return {
    props: {},
  }
}

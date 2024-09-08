import { useSession } from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LogoGenPage } from '@/components/LogoGenPage/index'
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
      <NextSeo title={t('LOGO 生成器 - Printlake Lab')} description="" />
      {/* https://github.com/airyland/logo.surf */}
      <LogoGenPage />
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

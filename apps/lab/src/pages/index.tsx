import { useSession } from 'next-auth/react'
import { InferGetServerSidePropsType } from 'next'
import { HomePage } from '@/components/HomePage/index'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'
import { buildSharedServerSideProps } from '@/server/common/factory'

type IndexPageProps = {}

const IndexPage = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
    <>
      <NextSeo
        title={t(
          'Multi-Tool Online Toolkit - Solve Everyday Tasks Quickly and Efficiently - Printlake Lab'
        )}
        description={t(
          "Welcome to our online multi-tool hub, offering a range of free utilities from encoding and decoding, image editing to unit conversions. Whether you're a student, developer, or professional, our tools are designed to enhance your productivity. Experience user-friendly design combined with powerful functionality - try it out now!"
        )}
      />
      <HomePage />
    </>
  )
}

export default IndexPage

export const getServerSideProps = buildSharedServerSideProps<IndexProps>(
  async () => {
    return {
      props: {},
    }
  }
)

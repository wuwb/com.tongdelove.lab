import { Container } from '@/components/common'
import { useTranslation } from '@/i18n'
import { ToolPage } from '@/components/Tool/ToolPage/index'
import { NextSeo } from 'next-seo'
import { buildSharedServerSideProps } from '@/server/common/factory'

const Tool = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <NextSeo
        title={t(
          'Essential Tools Collection | Boost Your Productivity - Printlake Lab'
        )}
        description={t(
          'Discover a comprehensive collection of essential tools designed to enhance your productivity and streamline your tasks. At ToolHub.com, find everything from project management tools to creative resources, all in one place. Elevate your work experience with our curated selection today!'
        )}
      />
      <Container>
        <ToolPage />
      </Container>
    </>
  )
}

export default Tool

export const getServerSideProps = buildSharedServerSideProps(async () => {
  return {
    props: {},
  }
})

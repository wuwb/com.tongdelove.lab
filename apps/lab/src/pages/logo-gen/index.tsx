import { useSession } from 'next-auth/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { LogoGenPage } from '@/components/LogoGenPage/index'
import { NextSeo } from 'next-seo'
import { useTranslation } from '@/i18n'
import { buildSharedServerSideProps } from '@/server/common/factory'

const Map = (
  _props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const { t } = useTranslation()
  const { data: session } = useSession()

  return (
    <>
      <NextSeo
        title={t('LOGO & Favicon 生成器 - Printlake Lab')}
        description={t(
          '使用我们的LOGO Favicon生成器工具，快速创建并优化您的网站图标。无论是个人博客还是商业项目，都能找到适合的设计方案。通过简单的步骤，您可以将任何图片转换为兼容多种设备的favicon，提升品牌识别度和网站专业形象。'
        )}
      />
      {/* https://github.com/airyland/logo.surf */}
      <LogoGenPage />
    </>
  )
}

export default Map

export const getServerSideProps = buildSharedServerSideProps<{}>(async () => {
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
})

import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { CtaBlock, FeaturesBlock, HeroBlock } from '../blocks'
import { trpc } from '@/utils/trpc'
import { useTranslation } from '@/i18n'

export const HomePage: FC = () => {
  const { t } = useTranslation()
  const { data } = trpc.link.getLinks.useQuery()

  return (
    <>
      <NextSeo
        title="home:page.title"
        description="See https://github.com/belgattitude/nextjs-monorepo-example"
      />
      {/* <Banner /> */}
      {data?.map((item, index) => {
        return <div key={item}>{item.id}</div>
      })}
      {/* <HeroBlock /> */}
      {/* <FeaturesBlock /> */}
      {/* <CtaBlock /> */}
      <div>
        <div>{t('todo')}</div>
        <div>
          Retro Card Generator
        </div>
      </div>
    </>
  )
}

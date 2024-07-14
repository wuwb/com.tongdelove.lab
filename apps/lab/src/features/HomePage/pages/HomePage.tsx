import { NextSeo } from 'next-seo'
import type { FC } from 'react'
import { CtaBlock, FeaturesBlock, HeroBlock } from '../blocks'
import { trpc } from '@/utils/trpc'

export const HomePage: FC = () => {
  const { data } = trpc.link.getLinks.useQuery()

  return (
    <>
      <NextSeo
        title="home:page.title"
        description="See https://github.com/belgattitude/nextjs-monorepo-example"
      />
      {/* <Banner /> */}
      {
        data?.map((item) => {
          return (
            <div key={item}>{item.id}</div>
          )
        })
      }
      {/* <HeroBlock /> */}
      {/* <FeaturesBlock /> */}
      {/* <CtaBlock /> */}
    </>
  )
}

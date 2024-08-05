import { CtaBlock, HeroBlock } from '../blocks'
import { trpc } from '@/utils/trpc'
import { useTranslation } from '@/i18n'
import { Faq } from '@/components/Faq/Faq'

export const HomePage = () => {
  const { t } = useTranslation()
  const { data } = trpc.link.getLinks.useQuery()

  return (
    <>
      {/* <Banner /> */}
      {data?.map((item, index) => {
        return <div key={index}>{item.id}</div>
      })}
      {/* <HeroBlock /> */}
      {/* <FeaturesBlock /> */}
      {/* <CtaBlock /> */}
      <Faq />
    </>
  )
}

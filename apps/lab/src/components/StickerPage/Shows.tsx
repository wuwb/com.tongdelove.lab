import { trpc } from '@/utils/trpc'
import Image from 'next/image'
import { useTranslation } from '@/i18n'
import Link from 'next/link'
import { Button } from '@mantine/core'

export const Shows = () => {
  const { t } = useTranslation()

  const { data = [] } = trpc.sticker.listHomePage.useQuery({
    page: 1,
    take: 15,
  })

  return (
    <div>
      <h3 className="my-2.5 text-center text-5xl font-bold">shows</h3>
      <div className="mx-auto max-w-screen-xl">
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data.map((item) => (
            <Link href={`/sticker/${item.id}`} key={item.id}>
              <Image
                width="300"
                height="300"
                src={item.url}
                alt={item.object}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-2.5 text-center">
        <Link href="/sticker/explore">
          <Button>{t('查看更多')}</Button>
        </Link>
      </div>
    </div>
  )
}

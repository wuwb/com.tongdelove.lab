import { usePaginationInfiniteQuery } from '@/hooks/usePaginationInfiniteQuery'
import { useTranslation } from '@/i18n'
import { trpc } from '@/utils/trpc'
import { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import Image from 'next/image'

export const StickerExplorePage = () => {
  const { t } = useTranslation()
  const [page, setPage] = useState(1)
  const [take, setTake] = useState(20)

  const { fullData, hasMore, current } = usePaginationInfiniteQuery(
    trpc.sticker.listHomePage.useQuery({
      page,
      take,
    })
  )

  const handleLoadMore = () => {
    setPage((p) => p + 1)
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <InfiniteScroll
        scrollThreshold={0.7}
        dataLength={fullData.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<p className="text-center">{t('Loading...')}</p>}
        scrollableTarget="scrollableContainer"
      >
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {fullData.map((item, index) => (
            <div key={item.id + index} className="">
              <Image
                className="transition-all duration-300 ease-in-out"
                width="300"
                height="300"
                src={item.url}
                alt={item.object}
                sizes="(max-width: 1440px) 20vw, 50vw"
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  )
}

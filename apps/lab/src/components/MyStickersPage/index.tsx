import { usePaginationInfiniteQuery } from '@/hooks/usePaginationInfiniteQuery'
import { useTranslation } from '@/i18n'
import { trpc } from '@/utils/trpc'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Button, Image } from '@mantine/core'
import { useIsAdmin } from '@/hooks/user/useIsAdmin'
import { notifications } from '@mantine/notifications'

export const MyStickersPage = () => {
  const { t } = useTranslation()

  const [page, setPage] = useState(1)
  const [take, setTake] = useState(20)
  const [data, setData] = useState<any[]>([])

  const isAdmin = useIsAdmin()

  const { fullData, hasMore, current } = usePaginationInfiniteQuery(
    trpc.sticker.listMyStickers.useQuery({
      page,
      take,
    }),
    {
      fetchCount: take,
    }
  )

  useEffect(() => {
    setData(fullData)
  }, [fullData])

  const hideStickMutation = trpc.sticker.hide.useMutation()

  const handleLoadMore = () => {
    setPage((p) => p + 1)
  }

  const handleHideSticker = async (sticker) => {
    try {
      const result = await hideStickMutation.mutateAsync({
        id: sticker.id,
      })
      if (!result) {
        throw new Error('hide failed.')
      }

      setData(data.filter((item) => item.id !== result.id))

      notifications.show({
        color: 'green',
        title: '成功',
        message: '隐藏成功 🌟',
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="mx-auto max-w-screen-xl">
      <InfiniteScroll
        scrollThreshold={0.7}
        dataLength={data.length}
        next={handleLoadMore}
        hasMore={hasMore}
        loader={<p className="text-center">{t('Loading...')}</p>}
        scrollableTarget="scrollableContainer"
      >
        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {data.map((item, index) => (
            <div key={item.id + index} className="relative">
              { }
              {isAdmin &&
                (item.live ? (
                  <Button
                    size="xs"
                    className="!absolute right-0.5 top-0.5"
                    onClick={() => handleHideSticker(item)}
                  >
                    {t('隐藏')}
                  </Button>
                ) : (
                  <Button size="xs" className="!absolute left-0.5 top-0.5">
                    {t('已隐藏')}
                  </Button>
                ))}
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

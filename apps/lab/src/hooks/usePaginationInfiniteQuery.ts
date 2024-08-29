import { UseQueryResult } from '@tanstack/react-query'
import { useWatch } from '@tongdelove/hooks'
import { DependencyList, useRef, useState } from 'react'
import { uniq } from 'es-toolkit'

interface UsePaginationInfiniteQuery {
  /**
   * Fetch count in every request, same with `take` / `limit`, use for calc if has more data
   */
  fetchCount?: number
  /**
   * Refresh key list, is one of this has been change, its will clean prev data
   */
  refreshKeys?: DependencyList

  shouldPreventRefresh?: () => boolean
}

/**
 * Infinite Query but base on pagination
 */
export function usePaginationInfiniteQuery<TList extends any[]>(
  hookRes: any,
  options: UsePaginationInfiniteQuery = {}
) {
  const { fetchCount, refreshKeys = [], shouldPreventRefresh } = options
  const current = hookRes
  const currentData = current.data
  const [fullData, setFullData] = useState<TList>([] as unknown as TList)
  const [hasMore, setHasMore] = useState(true)
  const prevDataRef = useRef<TList>([] as unknown as TList)

  useWatch(refreshKeys, () => {
    if (shouldPreventRefresh?.()) {
      return
    }
    prevDataRef.current = [] as unknown as TList
    setFullData([] as unknown as TList)
  })

  useWatch([currentData], () => {
    if (typeof currentData === 'undefined' && current.isLoading) {
      // switch to loading state. ignore
      return
    }

    if (!Array.isArray(currentData)) {
      // Stop if not a array
      setHasMore(false)
      return
    }

    if (currentData.length === 0) {
      setHasMore(false)
    } else {
      if (typeof fetchCount === 'number' && currentData.length < fetchCount) {
        setHasMore(false)
      } else {
        setHasMore(true)
      }
      const newData = uniq([...prevDataRef.current, ...currentData]) as TList
      setFullData(newData)
      prevDataRef.current = newData
    }
  })

  return { fullData, hasMore, current }
}

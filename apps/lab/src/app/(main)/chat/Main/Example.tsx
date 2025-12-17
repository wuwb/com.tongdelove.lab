'use client'

import { MdOutlineTipsAndUpdates } from 'react-icons/md'
import examples from '@/data/examples.json'
import { Button } from '@tongdelove/ui/components/button'
import { useMemo, useState } from 'react'

export const Example = () => {
  const [showFull, setShowFull] = useState(false)

  const list = useMemo(() => {
    if (showFull) {
      return examples
    } else {
      return examples.slice(0, 15)
    }
  }, [showFull])

  return (
    <>
      <div className="mb-4 mt-20 text-4xl">
        <MdOutlineTipsAndUpdates />
      </div>
      <ul className="flex flex-wrap justify-center gap-3.5">
        {list.map((item) => {
          return (
            <li key={item.act}>
              <Button>{item.act}</Button>
            </li>
          )
        })}
      </ul>
      {!showFull && (
        <>
          <p className="p-2">...</p>
          <div className="flex w-full items-center space-x-2">
            <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
            <Button
              variant="text"
              onClick={() => {
                setShowFull(true)
              }}
            >
              显示全部
            </Button>
            <hr className="flex-1 border-t border-dotted border-gray-200 dark:border-gray-600" />
          </div>
        </>
      )}
    </>
  )
}

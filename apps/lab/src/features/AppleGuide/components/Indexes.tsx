import { cn } from '@/utils'
import { useMemo, useState } from 'react'
import { assets, holder } from '../assertMap'

export const Indexes = ({
  data,
  selectedCategory,
  target,
  setTarget,
  setEnableScrollIntoView,
}: {
  data?: any
  selectedCategory: number
  target: number
  setTarget: (index: number) => void
  setEnableScrollIntoView: (enable: boolean) => void
}) => {
  const [startTop, setStartTop] = useState(0)
  const [itemHeight, setItemHeight] = useState(0)
  const products = useMemo(() => data[selectedCategory]?.products.map(p => p.name) || [], [data, selectedCategory])

  const handleTouchMove = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
    const pageY = event.touches[0].pageY
    const index = Math.floor((pageY - startTop) / itemHeight)
    if (index >= 0 && index <= products.length - 1 && target !== index) {
      setTarget(index)
      // vibrateShort({ type: 'medium' })
    }
  }

  if (!data) return null
  return (
    <div className="fixed right-0 top-0 box-border flex h-screen flex-col justify-center pb-28 pr-2">
      {data.map(
        (category, index) =>
          selectedCategory === index && (
            <div
              key={category.name}
              className="duration-500 ease-in-out animate-in fade-in zoom-in-95 slide-in-from-right fill-mode-forwards"
              id="indexes"
              onTouchStart={() => setEnableScrollIntoView(true)}
              onTouchEnd={() => setEnableScrollIntoView(false)}
              onTouchCancel={() => setEnableScrollIntoView(false)}
              onTouchMove={handleTouchMove}
            >
              {category.products.map((product, _index) => {
                const distance = Math.abs(target - _index)
                return (
                  <div
                    key={product.name}
                    className={cn('grid h-16 w-12 origin-right place-content-center transition-all duration-300 ease-in-out', {
                      'scale-150': distance === 0,
                      'scale-125': distance === 1,
                      'scale-110': distance === 2,
                      'my-2': distance === 0,
                      'my-1': distance === 1,
                    })}
                  >
                    {/* <Image mode="aspectFit" src={assets[product.name] || holder} className="pointer-events-none h-12 w-12" /> */}
                  </div>
                )
              })}
            </div>
          )
      )}
    </div>
  )
}

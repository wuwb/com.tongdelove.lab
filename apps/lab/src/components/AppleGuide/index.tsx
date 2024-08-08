import { useState } from 'react'
import { Indexes } from './components/Indexes'
import { Category } from './components/Category'
import { trpc } from '@/utils/trpc'

export const AppleGuide = () => {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [target, setTarget] = useState<number>(0)

  const [enableScrollIntoView, setEnableScrollIntoView] = useState(false)

  const { data = [] } = trpc.appleGuide.getAll.useQuery()

  const appleGuidedata = data.map((item, index) => JSON.parse(item.data))

  return (
    <div>
      <div className="flex flex-col divide-y divide-neutral-100 pb-24 pr-24">
        {appleGuidedata && (
          <div className="pb-12">
            {appleGuidedata?.map(
              (category, index) =>
                selectedCategory === index && (
                  <Category key={category.name} data={category} />
                )
            )}
          </div>
        )}
      </div>
      <Indexes
        data={appleGuidedata}
        selectedCategory={selectedCategory}
        target={target}
        setTarget={setTarget}
        setEnableScrollIntoView={setEnableScrollIntoView}
      />
    </div>
  )
}

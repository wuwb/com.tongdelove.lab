import React from 'react'
import Link from 'next/link'
import Image from 'next/legacy/image'
import SidebarBlock from '@/components/common/SidebarBlock'

export const Today = () => {
  const data = [
    {
      title: '今日推荐',
      link: '/1',
      image: '/images/placeholder/24x24',
    },
    {
      title: '今日推荐2',
      link: '/2',
      image: '/images/placeholder/24x24',
    },
  ]
  return (
    <SidebarBlock className="mb-4" title="今日热议主题">
      {data.map((item, index) => {
        return (
          <div key={index} className="divide-y divide-slate-800">
            <Link href={item.link}>
              <Image src={item.image} alt={item.title} width={24} height={24} />
              <div>{item.title}</div>
            </Link>
          </div>
        )
      })}
    </SidebarBlock>
  )
}

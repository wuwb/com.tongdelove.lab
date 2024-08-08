import React from 'react'
import { trpc } from '@/utils/trpc'

export const LinksPage = () => {
  const { data } = trpc.link.getLinks.useQuery()

  return (
    <div>
      {data?.map((item, index) => {
        return (
          <div key={item.id}>
            <a href={item.url}>
              <div>{item.title}</div>
              <div>{item.description}</div>
            </a>
          </div>
        )
      })}
    </div>
  )
}

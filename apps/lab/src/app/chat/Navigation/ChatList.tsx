'use client'

import { Chat } from '@/types/chat'
import { useMemo, useState } from 'react'
import { groupByDate } from '@/utils/helpers/chat'
import { ChatItem } from './ChatItem'

export const ChatList = () => {
  const [chatList, setChatList] = useState<Chat[]>([
    {
      id: '1',
      title: 'React入门实战教程',
      updateAt: Date.now(),
    },
    {
      id: '2',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '3',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '4',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '5',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '6',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '7',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '8',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '9',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '10',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '11',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '12',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '13',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '14',
      title: '如何使用Next.js创建React项目',
      updateAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    },
    {
      id: '15',
      title: '知行小课',
      updateAt: Date.now() + 2,
    },
  ])

  const [selectedChat, setSelectedChat] = useState<Chat>()

  const groupList = useMemo(() => {
    return groupByDate(chatList)
  }, [chatList])

  return (
    <div className="mb-[48px] mt-2 flex flex-1 flex-col overflow-y-auto">
      {groupList.map(([date, list]) => {
        return (
          <div key={date}>
            <div className="sticky top-0 z-10 bg-gray-900 p-3 text-sm text-gray-500">
              {date}
            </div>
            <ul>
              {list.map((item) => {
                const selected = selectedChat?.id === item.id
                return (
                  <ChatItem
                    key={item.id}
                    item={item}
                    selected={selected}
                    onSelected={(chat) => {
                      setSelectedChat(chat)
                    }}
                  />
                )
              })}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

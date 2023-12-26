'use client'

import { useAppContext } from "@/contexts/AppContext"
import MenuBar from "./Menubar"
import cn from 'clsx'
import Toolbar from "./Toolbar"
import ChatList from "./ChatList"

export default function Navigation() {
  const {
    state: { displayNavigation }
  } = useAppContext()
  return (
    <div className={cn('flex flex-col dark relative h-full w-[260px] bg-gray-900 text-gray-300 p-2',
      {
        'hidden': !displayNavigation
      }
    )}>
      <MenuBar />
      <ChatList />
      <Toolbar />
    </div>
  )
}

import { useAppContext } from '@/contexts/AppContext'
import MenuBar from './Menubar'
import cn from 'clsx'
import Toolbar from './Toolbar'
import ChatList from './ChatList'

export default function Navigation() {
  const {
    state: { displayNavigation },
  } = useAppContext()
  return (
    <div
      className={cn('dark relative flex h-full w-[260px] flex-col bg-gray-900 p-2 text-gray-300', {
        hidden: !displayNavigation,
      })}
    >
      <MenuBar />
      <ChatList />
      <Toolbar />
    </div>
  )
}

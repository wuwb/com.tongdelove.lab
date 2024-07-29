import { useAppContext } from '@/contexts/AppContext'
import { MenuBar } from './Menubar'
import clsx from 'clsx'
import { Toolbar } from './Toolbar'
import { ChatList } from './ChatList'

export const Navigation = () => {
  const {
    state: { displayNavigation },
  } = useAppContext()
  return (
    <div
      className={clsx(
        'dark relative flex h-full w-[260px] flex-col bg-gray-900 p-2 text-gray-300',
        {
          hidden: !displayNavigation,
        }
      )}
    >
      <MenuBar />
      <ChatList />
      <Toolbar />
    </div>
  )
}

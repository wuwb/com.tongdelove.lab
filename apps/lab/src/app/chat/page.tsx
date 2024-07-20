import { Navigation } from './Navigation'
import Main from './Main'
import { useAppContext } from '@/contexts/AppContext'
import { Navbar } from './Navbar/Navbar'
import clsx from 'clsx'

export const Chat = () => {
  const {
    state: { displayNavigation, themeMode },
    dispatch,
  } = useAppContext()

  return (
    <div className={clsx('flex h-full', themeMode)}>
      <Navbar />
      <Main />
    </div>
  )
}

'use client'

import Navigation from './Navigation'
import Main from './Main'
import { useAppContext } from '@/contexts/AppContext'
import { Navbar } from './Navbar/Navbar'
import clsx from 'clsx'

export default function Chat() {
  const {
    state: { displayNavigation, themeMode },
    dispatch,
  } = useAppContext()

  console.log('Chat page rendererd')

  return (
    <div className={clsx('flex h-full', themeMode)}>
      <Navbar />
      <Main />
    </div>
  )
}

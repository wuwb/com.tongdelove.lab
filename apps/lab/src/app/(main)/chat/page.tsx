'use client'

import { useAppContext } from '@/contexts/AppContext'
import { Main } from './Main'
import { Navbar } from './Navbar/Navbar'
import clsx from 'clsx'
// import { Navigation } from './Navigation'

export default function Chat() {
  const {
    state: {
      displayNavigation,
      themeMode
    },
    dispatch,
  } = useAppContext()

  return (
    <div className={clsx('flex h-full', themeMode)}>
      <Navbar />
      <Main />
    </div>
  )
}

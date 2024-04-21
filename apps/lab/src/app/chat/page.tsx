'use client'

import Navigation from '@/content/chat/Navigation'
import Main from '@/content/chat/Main'
import { useAppContext } from '@/contexts/AppContext'
import cn from 'clsx'

export default function Chat() {
  const {
    state: { displayNavigation, themeMode },
    dispatch,
  } = useAppContext()

  console.log('Chat page rendererd')

  return (
    <div className={cn('flex h-full', themeMode)}>
      <Navigation />
      <Main />
    </div>
  )
}

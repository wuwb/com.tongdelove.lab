import Generator from '@/components/StickerPage/generator'
import { Shows } from '@/components/StickerPage/Shows'
import { FollowUsOnX } from '@/components/FollowUsOnX'
import { Toaster } from '@/components/StickerPage/components/sonner'
import { StickerFAQ } from './StickerFAQ'
import '@mantine/notifications/styles.css'

export const StickerPage = () => {
  return (
    <div className="pb-20">
      <Generator />
      <Shows />
      <StickerFAQ />
      <FollowUsOnX />
      <Toaster richColors />
    </div>
  )
}

StickerPage.displayName = 'StickerPage'

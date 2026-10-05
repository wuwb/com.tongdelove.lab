import { Toaster } from './components/sonner'
import { Generator } from './generator'
import { Shows } from './Shows'
import { StickerFAQ } from './StickerFAQ'
import { FollowUsOnX } from '@/components/FollowUsOnX'

export default function Sticker() {
  return (
    <>
      <div className="w-full pb-20">
        <Generator />
        <Shows />
        <StickerFAQ />
        <FollowUsOnX />
      </div>
      <Toaster richColors />
    </>
  )
}
